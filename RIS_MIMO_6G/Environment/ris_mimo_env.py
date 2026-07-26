"""
OpenAI Gymnasium Compliant Environment: RIS_MIMO_ISAC_Env
Physics-Informed Deep Reinforcement Learning for 6G RIS-MIMO ISAC Systems
"""

import os
import sys
import gymnasium as gym
from gymnasium import spaces
import numpy as np

# Ensure project root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from RIS_MIMO_6G.Channel.channel_3gpp import Channel3GPPTR38901
from RIS_MIMO_6G.MIMO.mimo_array import MIMOArray28GHz

class RISMIMOISACEnv(gym.Env):
    metadata = {'render_modes': ['human']}

    def __init__(self, N_tx=4, N_rx=4, N_ris=64, max_steps=100):
        super(RISMIMOISACEnv, self).__init__()
        self.N_tx = N_tx
        self.N_rx = N_rx
        self.N_ris = N_ris  # 8x8 or 16x16 RIS panel elements
        self.max_steps = max_steps
        self.current_step = 0
        
        self.channel_sim = Channel3GPPTR38901(N_tx=N_tx, N_rx=N_rx, N_ris=N_ris)
        self.mimo_sim = MIMOArray28GHz(N_tx=N_tx, N_rx=N_rx)
        
        # Action Space: Continuous phase shifts theta_n in [-1, 1] mapped to [0, 2*pi] + 1 Tx beam angle [-1, 1]
        self.action_space = spaces.Box(low=-1.0, high=1.0, shape=(self.N_ris + 1,), dtype=np.float32)
        
        # Observation Space:
        # User position (3), Channel norms (3), Previous SINR (1), Target Angle Error (1), Step Ratio (1)
        obs_dim = 3 + 3 + 1 + 1 + 1
        self.observation_space = spaces.Box(low=-np.inf, high=np.inf, shape=(obs_dim,), dtype=np.float32)
        
        self.pos_ue = np.copy(self.channel_sim.pos_rx_init)
        self.velocity_ue = np.array([12.0, 3.0, 0.0]) # 12 m/s UE mobility trajectory
        self.prev_sinr_dB = 0.0

    def reset(self, seed=None, options=None):
        super().reset(seed=seed)
        self.current_step = 0
        # Reset UE position with small random jitter
        jitter = np.random.uniform(-5.0, 5.0, size=3)
        jitter[2] = 0.0 # Maintain ground level height
        self.pos_ue = np.copy(self.channel_sim.pos_rx_init) + jitter
        self.prev_sinr_dB = 0.0
        
        obs = self._get_observation()
        info = {}
        return obs, info

    def _get_observation(self):
        ch_realization = self.channel_sim.get_channel_realization(self.pos_ue, self.velocity_ue, t=self.current_step * 0.1)
        norm_Hd = np.linalg.norm(ch_realization['H_direct'])
        norm_G = np.linalg.norm(ch_realization['G_tx_ris'])
        norm_Hr = np.linalg.norm(ch_realization['H_ris_rx'])
        
        target_error = ch_realization['theta_target'] - 0.0 # Absolute angle deviation
        step_ratio = self.current_step / self.max_steps
        
        obs = np.array([
            self.pos_ue[0] / 100.0, self.pos_ue[1] / 100.0, self.pos_ue[2] / 10.0,
            norm_Hd, norm_G, norm_Hr,
            self.prev_sinr_dB / 40.0,
            target_error,
            step_ratio
        ], dtype=np.float32)
        return obs

    def step(self, action):
        self.current_step += 1
        
        # 1. Parse Actions
        ris_phases = (action[:self.N_ris] + 1.0) * np.pi # Map [-1, 1] to [0, 2*pi]
        tx_beam_angle = action[-1] * (np.pi / 3.0)       # Map [-1, 1] to [-60 deg, +60 deg]
        
        # 2. Advance UE Mobility Trajectory
        dt = 0.1 # 100 ms time step
        self.pos_ue += self.velocity_ue * dt
        
        # 3. Get Channel Realization
        ch_data = self.channel_sim.get_channel_realization(self.pos_ue, self.velocity_ue, t=self.current_step * dt)
        H_d = ch_data['H_direct']
        G = ch_data['G_tx_ris']
        H_r = ch_data['H_ris_rx']
        H_radar = ch_data['H_radar']
        
        # 4. Form Effective Cascaded Channel H_eff
        Phi_matrix = np.diag(np.exp(1j * ris_phases))
        H_cascaded = H_r @ Phi_matrix @ G
        H_eff = H_d + H_cascaded
        
        # 5. Tx Beamforming Vector w
        w_tx = self.channel_sim.steering_vector(self.N_tx, tx_beam_angle, 0.0)
        
        # 6. Signal and Noise Calculations
        signal_power = np.abs(np.vdot(H_eff.flatten(), np.repeat(w_tx, self.N_rx)))**2
        noise_power = 1e-11 # -80 dBm noise floor
        sinr_linear = signal_power / (noise_power + 1e-12)
        sinr_dB = 10 * np.log10(np.maximum(sinr_linear, 1e-6))
        self.prev_sinr_dB = sinr_dB
        
        # 7. ISAC Radar Target Sensing Power
        radar_sensing_power = np.real(np.trace(Phi_matrix.conj().T @ H_radar @ Phi_matrix))
        
        # 8. Physics-Informed Multi-Objective Reward Function
        w_comm = 1.0
        w_radar = 0.05
        w_ecc_penalty = 2.0
        
        ecc = self.mimo_sim.compute_ecc_s_parameters(0, 1)
        ber_approx = 0.5 * np.exp(-0.5 * sinr_linear)
        
        reward = (w_comm * np.log2(1 + sinr_linear)
                  + w_radar * radar_sensing_power
                  - w_ecc_penalty * ecc
                  - 10.0 * ber_approx)
        
        terminated = self.current_step >= self.max_steps
        truncated = False
        
        obs = self._get_observation()
        info = {
            "SINR_dB": sinr_dB,
            "Radar_Power": radar_sensing_power,
            "ECC": ecc,
            "BER": ber_approx,
            "Capacity_bits": np.log2(1 + sinr_linear)
        }
        
        return obs, reward, terminated, truncated, info

if __name__ == "__main__":
    env = RISMIMOISACEnv()
    obs, _ = env.reset()
    print("=== Gymnasium RIS_MIMO_ISAC_Env Reset Sanity Check ===")
    print(f"Observation Shape: {obs.shape} | Initial Observation: {obs}")
    
    random_action = env.action_space.sample()
    obs, reward, term, trunc, info = env.step(random_action)
    print(f"Step Output -> Reward: {reward:.4f} | SINR: {info['SINR_dB']:.2f} dB | BER: {info['BER']:.4e}")

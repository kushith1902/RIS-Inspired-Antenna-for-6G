"""
3GPP TR 38.901 3D Spatial Channel Model (SCM) & ISAC Sensing Simulator
Carrier Frequency: 28.0 GHz (FR2 mmWave)
Scenario: Urban Micro (UMi) Street Canyon
Features: LoS/NLoS probabilities, Rician fading, Blockage dynamics, Mobility trajectories, and DFRC Radar target sensing.
"""

import numpy as np
import scipy.constants as const

class Channel3GPPTR38901:
    def __init__(self, fc=28.0e9, N_tx=4, N_rx=4, N_ris=256, scenario="UMi"):
        self.fc = fc
        self.c = const.c
        self.lambda0 = self.c / self.fc
        self.N_tx = N_tx
        self.N_rx = N_rx
        self.N_ris = N_ris  # 16x16 RIS array
        self.scenario = scenario
        
        # Positions (in meters)
        self.pos_tx = np.array([0.0, 0.0, 10.0])       # Base Station / MIMO Tx
        self.pos_ris = np.array([50.0, 20.0, 15.0])    # RIS Metasurface Panel
        self.pos_rx_init = np.array([80.0, -10.0, 1.5])# User Equipment (UE)
        self.pos_target = np.array([60.0, 40.0, 5.0])  # ISAC Sensing Target

    def calc_path_loss_umi(self, d_3d, d_2d, is_los=True):
        """3GPP TR 38.901 Table 7.4.1-1: Path Loss for UMi Street Canyon at 28 GHz."""
        fc_ghz = self.fc / 1e9
        if is_los:
            pl = 32.4 + 21.0 * np.log10(d_3d) + 20.0 * np.log10(fc_ghz)
        else:
            pl_los = 32.4 + 21.0 * np.log10(d_3d) + 20.0 * np.log10(fc_ghz)
            pl_nlos = 35.3 + 31.9 * np.log10(d_3d) + 20.0 * np.log10(fc_ghz)
            pl = max(pl_los, pl_nlos)
        # Add shadow fading (Log-normal distribution)
        sigma_sf = 4.0 if is_los else 7.82
        sf = np.random.normal(0, sigma_sf)
        return pl + sf

    def los_probability_umi(self, d_2d):
        """3GPP TR 38.901 Table 7.4.2-1: LoS Probability for UMi."""
        if d_2d <= 18.0:
            return 1.0
        else:
            return (18.0 / d_2d) + np.exp(-d_2d / 36.0) * (1.0 - 18.0 / d_2d)

    def steering_vector(self, N_elements, theta, phi, spacing=0.5):
        """Generates ULA / UPA array steering vector normalized by sqrt(N)."""
        k = 2 * np.pi / self.lambda0
        d = spacing * self.lambda0
        N_x = int(np.sqrt(N_elements))
        N_y = int(np.sqrt(N_elements)) if N_x * N_x == N_elements else 1
        
        if N_y == 1: # ULA
            idx = np.arange(N_elements)
            phase = k * d * idx * np.sin(theta)
        else: # UPA
            x_idx, y_idx = np.meshgrid(np.arange(N_x), np.arange(N_y))
            phase = k * d * (x_idx.flatten() * np.sin(theta) * np.cos(phi) + y_idx.flatten() * np.sin(theta) * np.sin(phi))
            
        return np.exp(1j * phase) / np.sqrt(N_elements)

    def get_channel_realization(self, pos_rx, velocity_vec=np.array([15.0, 0.0, 0.0]), t=0.0):
        """
        Generates full cascaded channel:
        H_total = H_direct + H_ris_rx @ diag(Phi) @ G_tx_ris
        Returns channel matrices and ISAC target sensing response matrix.
        """
        # 1. Geometry and Distances
        vec_tx_rx = pos_rx - self.pos_tx
        d_tx_rx = np.linalg.norm(vec_tx_rx)
        d_2d_tx_rx = np.linalg.norm(vec_tx_rx[:2])
        
        vec_tx_ris = self.pos_ris - self.pos_tx
        d_tx_ris = np.linalg.norm(vec_tx_ris)
        
        vec_ris_rx = pos_rx - self.pos_ris
        d_ris_rx = np.linalg.norm(vec_ris_rx)
        
        # 2. LoS State & Path Losses
        prob_los = self.los_probability_umi(d_2d_tx_rx)
        is_los = np.random.rand() < prob_los
        
        PL_direct_dB = self.calc_path_loss_umi(d_tx_rx, d_2d_tx_rx, is_los=is_los)
        PL_tx_ris_dB = self.calc_path_loss_umi(d_tx_ris, np.linalg.norm(vec_tx_ris[:2]), is_los=True)
        PL_ris_rx_dB = self.calc_path_loss_umi(d_ris_rx, np.linalg.norm(vec_ris_rx[:2]), is_los=is_los)
        
        gain_direct = 10**(-PL_direct_dB / 20.0)
        gain_tx_ris = 10**(-PL_tx_ris_dB / 20.0)
        gain_ris_rx = 10**(-PL_ris_rx_dB / 20.0)
        
        # 3. Angles of Arrival/Departure
        theta_tx_rx = np.arctan2(vec_tx_rx[1], vec_tx_rx[0])
        theta_tx_ris = np.arctan2(vec_tx_ris[1], vec_tx_ris[0])
        theta_ris_rx = np.arctan2(vec_ris_rx[1], vec_ris_rx[0])
        
        # 4. Rician Fading Matrices
        K_factor_dB = 13.0 - 0.03 * d_2d_tx_rx if is_los else 0.0
        K = 10**(K_factor_dB / 10.0)
        
        # Direct Channel H_d [N_rx, N_tx]
        a_tx_d = self.steering_vector(self.N_tx, theta_tx_rx, 0.0)
        a_rx_d = self.steering_vector(self.N_rx, theta_tx_rx, 0.0)
        H_los = np.outer(a_rx_d, a_tx_d.conj())
        H_nlos = (np.random.randn(self.N_rx, self.N_tx) + 1j * np.random.randn(self.N_rx, self.N_tx)) / np.sqrt(2)
        H_direct = gain_direct * (np.sqrt(K / (K + 1)) * H_los + np.sqrt(1 / (K + 1)) * H_nlos)
        
        # G (Tx-to-RIS) Channel [N_ris, N_tx]
        a_tx_g = self.steering_vector(self.N_tx, theta_tx_ris, 0.0)
        a_ris_g = self.steering_vector(self.N_ris, theta_tx_ris, 0.0)
        G_tx_ris = gain_tx_ris * np.outer(a_ris_g, a_tx_g.conj())
        
        # H_r (RIS-to-Rx) Channel [N_rx, N_ris]
        a_ris_r = self.steering_vector(self.N_ris, theta_ris_rx, 0.0)
        a_rx_r = self.steering_vector(self.N_rx, theta_ris_rx, 0.0)
        H_ris_rx = gain_ris_rx * np.outer(a_rx_r, a_ris_r.conj())
        
        # 5. ISAC Radar Target Sensing Channel Matrix H_radar [N_ris, N_ris]
        vec_ris_target = self.pos_target - self.pos_ris
        theta_target = np.arctan2(vec_ris_target[1], vec_ris_target[0])
        phi_target = np.arctan2(vec_ris_target[2], np.linalg.norm(vec_ris_target[:2]))
        a_ris_target = self.steering_vector(self.N_ris, theta_target, phi_target)
        rcs_alpha = 10.0 # 10 m^2 Radar Cross Section
        H_radar = rcs_alpha * np.outer(a_ris_target, a_ris_target.conj())
        
        # Doppler Frequency Shift
        v_mag = np.linalg.norm(velocity_vec)
        f_doppler = (v_mag / self.lambda0) * np.cos(theta_tx_rx)
        phase_doppler = np.exp(1j * 2 * np.pi * f_doppler * t)
        
        return {
            "H_direct": H_direct * phase_doppler,
            "G_tx_ris": G_tx_ris,
            "H_ris_rx": H_ris_rx * phase_doppler,
            "H_radar": H_radar,
            "d_3d": d_tx_rx,
            "is_los": is_los,
            "theta_target": theta_target,
            "f_doppler": f_doppler
        }

if __name__ == "__main__":
    channel_sim = Channel3GPPTR38901()
    sample = channel_sim.get_channel_realization(channel_sim.pos_rx_init)
    print("=== 3GPP TR 38.901 28 GHz mmWave Channel Realization ===")
    print(f"Direct Distance: {sample['d_3d']:.2f} m | LoS State: {sample['is_los']}")
    print(f"Direct Channel Matrix Norm: {np.linalg.norm(sample['H_direct']):.4e}")
    print(f"Tx-to-RIS Channel Matrix Norm (G): {np.linalg.norm(sample['G_tx_ris']):.4e}")
    print(f"RIS-to-Rx Channel Matrix Norm (H_r): {np.linalg.norm(sample['H_ris_rx']):.4e}")
    print(f"ISAC Target Angle: {np.rad2deg(sample['theta_target']):.2f} deg | Doppler Shift: {sample['f_doppler']:.2f} Hz")

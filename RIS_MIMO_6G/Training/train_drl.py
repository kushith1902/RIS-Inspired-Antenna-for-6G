"""
End-to-End DRL Training Pipeline for RIS-MIMO ISAC Network
Supported Algorithms: PPO, SAC, TD3, DDPG
Incorporates Stable-Baselines3 and PyTorch Physics-Informed Feature Extractor
"""

import os
import argparse
import numpy as np
import torch
from stable_baselines3 import PPO, SAC, TD3, DDPG
from stable_baselines3.common.callbacks import BaseCallback
from RIS_MIMO_6G.Environment.ris_mimo_env import RISMIMOISACEnv
from RIS_MIMO_6G.RL.physics_informed_policy import PhysicsInformedFeatureExtractor

class RewardLoggingCallback(BaseCallback):
    def __init__(self, verbose=0):
        super(RewardLoggingCallback, self).__init__(verbose)
        self.episode_rewards = []
        self.sinr_history = []

    def _on_step(self) -> bool:
        infos = self.locals.get('infos')
        if infos and len(infos) > 0:
            if 'SINR_dB' in infos[0]:
                self.sinr_history.append(infos[0]['SINR_dB'])
        return True

def train_agent(algo_name="PPO", total_timesteps=20000, save_dir="Models"):
    os.makedirs(save_dir, exist_ok=True)
    env = RISMIMOISACEnv(N_tx=4, N_rx=4, N_ris=64, max_steps=100)
    
    policy_kwargs = dict(
        features_extractor_class=PhysicsInformedFeatureExtractor,
        features_extractor_kwargs=dict(features_dim=256),
    )
    
    print(f"\n==========================================")
    print(f"   Training Physics-Informed {algo_name} Agent   ")
    print(f"==========================================")
    
    if algo_name.upper() == "PPO":
        model = PPO("MlpPolicy", env, policy_kwargs=policy_kwargs, 
                    learning_rate=3e-4, n_steps=2048, batch_size=64, verbose=1)
    elif algo_name.upper() == "SAC":
        model = SAC("MlpPolicy", env, policy_kwargs=policy_kwargs, 
                    learning_rate=3e-4, buffer_size=10000, batch_size=64, verbose=1)
    elif algo_name.upper() == "TD3":
        model = TD3("MlpPolicy", env, policy_kwargs=policy_kwargs, 
                    learning_rate=3e-4, buffer_size=10000, batch_size=64, verbose=1)
    elif algo_name.upper() == "DDPG":
        model = DDPG("MlpPolicy", env, policy_kwargs=policy_kwargs, 
                     learning_rate=3e-4, buffer_size=10000, batch_size=64, verbose=1)
    else:
        raise ValueError(f"Unsupported algorithm: {algo_name}")

    callback = RewardLoggingCallback()
    model.learn(total_timesteps=total_timesteps, callback=callback)
    
    model_path = os.path.join(save_dir, f"pi_drl_{algo_name.lower()}_model.zip")
    model.save(model_path)
    print(f"[Training] Model successfully saved to: {model_path}")
    
    # Save training reward & SINR logs
    log_path = os.path.join(save_dir, f"training_log_{algo_name.lower()}.npy")
    np.save(log_path, np.array(callback.sinr_history))
    print(f"[Training] SINR history saved to: {log_path}")
    return model, model_path

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train PI-DRL Agents for 6G RIS-MIMO ISAC")
    parser.add_argument("--algo", type=str, default="PPO", choices=["PPO", "SAC", "TD3", "DDPG"], help="DRL Algorithm")
    parser.add_argument("--timesteps", type=int, default=10000, help="Total Training Timesteps")
    args = parser.parse_args()
    
    train_agent(algo_name=args.algo, total_timesteps=args.timesteps)

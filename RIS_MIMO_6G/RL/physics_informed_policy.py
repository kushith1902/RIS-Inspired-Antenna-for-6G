"""
PyTorch Physics-Informed Neural Network (PINN) Policy Backbone for SB3 & Custom DRL
Embeds Electromagnetic Array Factor Constraints into Policy Architecture
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
from stable_baselines3.common.torch_layers import BaseFeaturesExtractor

class PhysicsInformedFeatureExtractor(BaseFeaturesExtractor):
    """
    Custom Feature Extractor combining dense feature representation with 
    Electromagnetic Array Factor (AF) physics embeddings.
    """
    def __init__(self, observation_space, features_dim=256):
        super(PhysicsInformedFeatureExtractor, self).__init__(observation_space, features_dim)
        obs_dim = observation_space.shape[0]
        
        # Dense feature extractor layers
        self.fc1 = nn.Linear(obs_dim, 128)
        self.fc2 = nn.Linear(128, 128)
        self.fc_out = nn.Linear(128 + 16, features_dim) # 128 dense + 16 physics features
        
        self.relu = nn.ReLU()
        self.layer_norm = nn.LayerNorm(128)

    def compute_array_factor_features(self, obs):
        """
        Calculates analytical array factor magnitude features based on estimated 
        AoA/AoD angles in observation vector.
        """
        batch_size = obs.shape[0]
        # Extract target error and channel norms from obs
        target_err = obs[:, 7:8]
        norm_Hd = obs[:, 3:4]
        norm_G = obs[:, 4:5]
        norm_Hr = obs[:, 5:6]
        
        # Generate 16 synthetic angular spatial samples theta in [-pi/2, pi/2]
        theta_samples = torch.linspace(-1.5708, 1.5708, 16, device=obs.device).unsqueeze(0).repeat(batch_size, 1)
        # Array factor expression AF(theta) = sin(N * pi * sin(theta)) / (N * sin(pi * sin(theta)))
        af_features = torch.abs(torch.sinc(2.0 * torch.sin(theta_samples + target_err)))
        return af_features

    def forward(self, observations):
        x = self.relu(self.fc1(observations))
        x = self.relu(self.layer_norm(self.fc2(x)))
        
        # Compute physics-informed Array Factor embedding
        af_embed = self.compute_array_factor_features(observations)
        
        # Concatenate dense features with physics embedding
        combined = torch.cat([x, af_embed], dim=1)
        features = self.relu(self.fc_out(combined))
        return features

class PINNActorCriticNetwork(nn.Module):
    """
    Standalone Physics-Informed Actor-Critic Network for custom PyTorch DRL implementations.
    """
    def __init__(self, state_dim, action_dim):
        super(PINNActorCriticNetwork, self).__init__()
        self.actor = nn.Sequential(
            nn.Linear(state_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 256),
            nn.ReLU(),
            nn.Linear(256, action_dim),
            nn.Tanh() # Action output bounded in [-1, 1]
        )
        
        self.critic = nn.Sequential(
            nn.Linear(state_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 256),
            nn.ReLU(),
            nn.Linear(256, 1)
        )

    def forward(self, state):
        action = self.actor(state)
        value = self.critic(state)
        return action, value

    def physics_loss_penalty(self, actions, state):
        """
        Calculates Maxwell Array Factor penalty term:
        Enforces phase continuity across adjacent RIS unit cells to prevent spatial dispersion.
        """
        ris_actions = actions[:, :-1] # Exclude Tx beam angle
        # Phase gradient across adjacent elements
        diffs = torch.abs(ris_actions[:, 1:] - ris_actions[:, :-1])
        smoothness_penalty = torch.mean(torch.square(diffs))
        return 0.05 * smoothness_penalty

if __name__ == "__main__":
    import numpy as np
    from gymnasium.spaces import Box
    
    obs_space = Box(low=-np.inf, high=np.inf, shape=(9,), dtype=np.float32)
    extractor = PhysicsInformedFeatureExtractor(obs_space)
    dummy_obs = torch.randn(4, 9)
    out_features = extractor(dummy_obs)
    print("=== PyTorch Physics-Informed Feature Extractor Check ===")
    print(f"Input Obs Shape: {dummy_obs.shape} | Output Features Shape: {out_features.shape}")
    
    pinn = PINNActorCriticNetwork(state_dim=9, action_dim=65)
    action, val = pinn(dummy_obs)
    penalty = pinn.physics_loss_penalty(action, dummy_obs)
    print(f"Actor Output Shape: {action.shape} | Critic Value Shape: {val.shape}")
    print(f"Physics Loss Smoothness Penalty: {penalty.item():.6f}")

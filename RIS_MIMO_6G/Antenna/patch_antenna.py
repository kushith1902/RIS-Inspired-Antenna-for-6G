"""
Physics-Informed 28 GHz Microstrip Patch Antenna Analytical Model
Substrate: Rogers RT/duroid 5880 (eps_r = 2.2, tan_delta = 0.0009, h = 0.508 mm)
Operating Frequency: 28.0 GHz (FR2 mmWave)
"""

import numpy as np
import scipy.constants as const

class PatchAntenna28GHz:
    def __init__(self, f0=28.0e9, eps_r=2.2, h=0.508e-3, tan_d=0.0009, t_co=0.035e-3):
        self.f0 = f0
        self.c = const.c
        self.lambda0 = self.c / self.f0
        self.eps_r = eps_r
        self.h = h
        self.tan_d = tan_d
        self.t_co = t_co
        
        # Calculate Dimensions
        self.W = self._calc_width()
        self.eps_eff = self._calc_eps_eff()
        self.dL = self._calc_length_extension()
        self.L_eff = self.c / (2 * self.f0 * np.sqrt(self.eps_eff))
        self.L = self.L_eff - 2 * self.dL
        
        # Ground plane dimensions
        self.Wg = self.W + 6 * self.h
        self.Lg = self.L + 6 * self.h
        
        # Inset Feed Position for 50 Ohm matching
        self.R_edge = self._calc_edge_impedance()
        self.R_in = 50.0
        self.y0 = (self.L / np.pi) * np.arccos(np.sqrt(self.R_in / self.R_edge))
        self.feed_width = self._calc_microstrip_width(50.0)

    def _calc_width(self):
        return (self.c / (2 * self.f0)) * np.sqrt(2 / (self.eps_r + 1))

    def _calc_eps_eff(self):
        return (self.eps_r + 1) / 2 + ((self.eps_r - 1) / 2) * (1 + 12 * (self.h / self.W)) ** (-0.5)

    def _calc_length_extension(self):
        w_h = self.W / self.h
        num = (self.eps_eff + 0.3) * (w_h + 0.264)
        den = (self.eps_eff - 0.258) * (w_h + 0.8)
        return 0.412 * self.h * (num / den)

    def _calc_edge_impedance(self):
        # Conductance G1 for radiating slot
        k0 = 2 * np.pi / self.lambda0
        X = k0 * self.W
        # Approximate slot conductance
        G1 = (1 / 120.0) * (X**2 / np.pi**2) if X < 1 else (1 / 120.0) * (X / np.pi - 1 / (3 * np.pi**3))
        # Edge resistance for fundamental mode
        return 1.0 / (2 * G1)

    def _calc_microstrip_width(self, Z0):
        A = (Z0 / 60.0) * np.sqrt((self.eps_r + 1) / 2) + ((self.eps_r - 1) / (self.eps_r + 1)) * (0.23 + 0.11 / self.eps_r)
        return (8 * self.h * np.exp(A)) / (np.exp(2 * A) - 2)

    def compute_s11_vswr(self, f_array):
        """Computes Return Loss (S11 in dB) and VSWR across frequency array."""
        k0 = 2 * np.pi * f_array / self.c
        # Quality factor Q
        Q_rad = (np.pi * self.c * np.sqrt(self.eps_eff)) / (4 * f_array * self.h)
        Q_d = 1 / self.tan_d
        # Conduction loss Q_c
        sigma_cu = 5.8e7
        skin_depth = 1 / np.sqrt(np.pi * f_array * const.mu_0 * sigma_cu)
        Q_c = self.h / skin_depth
        Q_total = 1 / (1/Q_rad + 1/Q_d + 1/Q_c)
        
        delta_f = (f_array - self.f0) / self.f0
        Z_in = self.R_in / (1 + 2j * Q_total * delta_f)
        
        Gamma = (Z_in - 50.0) / (Z_in + 50.0)
        S11_dB = 20 * np.log10(np.abs(Gamma))
        VSWR = (1 + np.abs(Gamma)) / (1 - np.abs(Gamma) + 1e-12)
        return S11_dB, VSWR

    def farfield_pattern(self, theta, phi):
        """Computes normalized E-plane and H-plane 3D radiation intensity."""
        k0 = 2 * np.pi / self.lambda0
        # E-plane (phi = 0) & H-plane (phi = pi/2)
        X = (k0 * self.h / 2) * np.sin(theta)
        Y = (k0 * self.W / 2) * np.sin(theta) * np.sin(phi)
        Z = (k0 * self.L / 2) * np.sin(theta) * np.cos(phi)
        
        factor_X = np.sinc(X / np.pi) if np.abs(X) > 1e-6 else 1.0
        factor_Z = np.cos(Z)
        
        E_theta = np.cos(phi) * factor_Z * factor_X
        E_phi = -np.sin(phi) * np.cos(theta) * factor_Z * factor_X
        
        E_total = np.sqrt(np.abs(E_theta)**2 + np.abs(E_phi)**2)
        # Directivity gain estimate
        D0_dBi = 10 * np.log10(4 * np.pi * (self.W * self.L) / (self.lambda0**2))
        return E_total, D0_dBi

    def get_summary(self):
        return {
            "Frequency (GHz)": self.f0 / 1e9,
            "Substrate": "Rogers RT/duroid 5880",
            "Dielectric Constant (eps_r)": self.eps_r,
            "Height (mm)": self.h * 1e3,
            "Patch Width W (mm)": self.W * 1e3,
            "Patch Length L (mm)": self.L * 1e3,
            "Ground Width Wg (mm)": self.Wg * 1e3,
            "Ground Length Lg (mm)": self.Lg * 1e3,
            "Inset Position y0 (mm)": self.y0 * 1e3,
            "Feed Line Width (mm)": self.feed_width * 1e3,
            "Effective Er": self.eps_eff
        }

if __name__ == "__main__":
    patch = PatchAntenna28GHz()
    summary = patch.get_summary()
    print("=== 28 GHz Patch Antenna Electromagnetic Parameters ===")
    for k, v in summary.items():
        print(f"{k}: {v:.4f}" if isinstance(v, float) else f"{k}: {v}")
    
    freqs = np.linspace(26.0e9, 30.0e9, 401)
    s11, vswr = patch.compute_s11_vswr(freqs)
    min_s11_idx = np.argmin(s11)
    print(f"\nMinimum S11: {s11[min_s11_idx]:.2f} dB at {freqs[min_s11_idx]/1e9:.3f} GHz")
    bandwidth = freqs[s11 < -10]
    print(f"Bandwidth (S11 < -10 dB): {(bandwidth[-1] - bandwidth[0])/1e9:.3f} GHz")

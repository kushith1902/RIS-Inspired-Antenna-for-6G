"""
Physics-Based Reconfigurable Intelligent Surface (RIS) Unit Cell & Array Model
Frequency: 28.0 GHz
Diode Control: PIN Diode (Discrete Phase) / Varactor Diode (Continuous Phase)
"""

import numpy as np
import scipy.constants as const

class RISUnitCell28GHz:
    def __init__(self, f0=28.0e9, unit_size=5.35e-3, Z0=377.0):
        self.f0 = f0
        self.omega0 = 2 * np.pi * f0
        self.dx = unit_size  # ~ lambda/2 at 28 GHz
        self.dy = unit_size
        self.Z0 = Z0
        
        # Equivalent Circuit Parameters for 28 GHz Metasurface Patch
        self.L_p = 0.85e-9    # Patch inductance (0.85 nH)
        self.C_p = 0.038e-12   # Structural capacitance (38 fF)
        self.R_sub = 0.45      # Substrate loss resistance (Ohms)
        
        # Diode Models (Skyworks SMP1340 PIN Diode / MACOM Varactor)
        self.R_ON = 0.8       # ON state resistance (Ohms)
        self.L_d = 0.15e-9     # Parasitic diode inductance (0.15 nH)
        self.R_OFF = 5.0e3    # OFF state resistance (5 kOhm)
        self.C_OFF = 0.04e-12  # OFF state capacitance (40 fF)
        
        # Varactor Continuous Range (0.05 pF to 0.85 pF)
        self.Cv_min = 0.05e-12
        self.Cv_max = 0.85e-12

    def compute_impedance_varactor(self, Cv, f):
        """Computes unit cell input impedance Z_in(f, Cv) with varactor diode."""
        omega = 2 * np.pi * f
        Z_patch = 1j * omega * self.L_p + 1.0 / (1j * omega * self.C_p)
        Z_varactor = self.R_sub + 1j * omega * self.L_d + 1.0 / (1j * omega * Cv)
        # Parallel combination of structural patch and varactor branch
        Z_in = (Z_patch * Z_varactor) / (Z_patch + Z_varactor + 1e-12)
        return Z_in

    def compute_impedance_pin(self, state, f):
        """State: 1 (ON), 0 (OFF). Computes Z_in for discrete phase shift."""
        omega = 2 * np.pi * f
        Z_patch = 1j * omega * self.L_p + 1.0 / (1j * omega * self.C_p)
        if state == 1:
            Z_diode = self.R_ON + 1j * omega * self.L_d
        else:
            Z_diode = (self.R_OFF / (1 + 1j * omega * self.R_OFF * self.C_OFF)) + 1j * omega * self.L_d
        Z_in = (Z_patch * Z_diode) / (Z_patch + Z_diode + 1e-12)
        return Z_in

    def get_reflection_coefficient(self, Z_in):
        """Computes Gamma = (Z_in - Z0) / (Z_in + Z0)."""
        Gamma = (Z_in - self.Z0) / (Z_in + self.Z0)
        amplitude = np.abs(Gamma)
        phase_rad = np.angle(Gamma)
        phase_deg = np.rad2deg(phase_rad) % 360.0
        return Gamma, amplitude, phase_deg

    def get_varactor_phase_response(self, num_points=256, f=28.0e9):
        """Sweeps varactor capacitance to yield continuous phase vs voltage tuning curve."""
        Cv_sweep = np.linspace(self.Cv_min, self.Cv_max, num_points)
        phases = []
        amps = []
        for cv in Cv_sweep:
            Z_in = self.compute_impedance_varactor(cv, f)
            _, amp, ph = self.get_reflection_coefficient(Z_in)
            phases.append(ph)
            amps.append(amp)
        return Cv_sweep, np.array(phases), np.array(amps)

class RISArray28GHz:
    def __init__(self, Nx=16, Ny=16, dx=5.35e-3, dy=5.35e-3, f0=28.0e9):
        self.Nx = Nx
        self.Ny = Ny
        self.N_total = Nx * Ny
        self.dx = dx
        self.dy = dy
        self.f0 = f0
        self.k0 = 2 * np.pi * f0 / const.c
        self.unit_cell = RISUnitCell28GHz(f0=f0, unit_size=dx)

    def array_factor(self, theta_in, phi_in, theta_out, phi_out, phase_matrix):
        """
        Computes the RIS reflection array factor for incoming plane wave (theta_in, phi_in)
        and reflected wave direction (theta_out, phi_out) given Phase Matrix [Nx, Ny] in radians.
        """
        u_in = np.sin(theta_in) * np.cos(phi_in)
        v_in = np.sin(theta_in) * np.sin(phi_in)
        u_out = np.sin(theta_out) * np.cos(phi_out)
        v_out = np.sin(theta_out) * np.sin(phi_out)
        
        AF = 0.0 + 0.0j
        for m in range(self.Nx):
            for n in range(self.Ny):
                x_mn = m * self.dx
                y_mn = n * self.dy
                spatial_phase = self.k0 * ((u_in + u_out) * x_mn + (v_in + v_out) * y_mn)
                cell_phase = phase_matrix[m, n]
                AF += np.exp(1j * (spatial_phase + cell_phase))
        return AF / self.N_total

    def generate_steering_phase(self, theta_steer, phi_steer, theta_incident=0.0, phi_incident=0.0):
        """Generates required phase matrix for steering beam to (theta_steer, phi_steer)."""
        u_inc = np.sin(theta_incident) * np.cos(phi_incident)
        v_inc = np.sin(theta_incident) * np.sin(phi_incident)
        u_str = np.sin(theta_steer) * np.cos(phi_steer)
        v_str = np.sin(theta_steer) * np.sin(phi_steer)
        
        phase_matrix = np.zeros((self.Nx, self.Ny))
        for m in range(self.Nx):
            for n in range(self.Ny):
                x_mn = m * self.dx
                y_mn = n * self.dy
                phase_needed = -self.k0 * ((u_inc + u_str) * x_mn + (v_inc + v_str) * y_mn)
                phase_matrix[m, n] = np.mod(phase_needed, 2 * np.pi)
        return phase_matrix

if __name__ == "__main__":
    ris_cell = RISUnitCell28GHz()
    Cv_sweep, phases, amps = ris_cell.get_varactor_phase_response()
    print("=== RIS Unit Cell Phase Sweep Summary ===")
    print(f"Capacitance Range: {Cv_sweep[0]*1e12:.2f} pF -> {Cv_sweep[-1]*1e12:.2f} pF")
    print(f"Phase Control Span: {phases.max() - phases.min():.1f} degrees")
    print(f"Average Reflection Amplitude: {np.mean(amps):.4f} ({20*np.log10(np.mean(amps)):.2f} dB)")
    
    ris_array = RISArray28GHz(Nx=16, Ny=16)
    theta_target = np.deg2rad(30.0)
    phi_target = np.deg2rad(40.0)
    phase_mat = ris_array.generate_steering_phase(theta_target, phi_target)
    af_peak = ris_array.array_factor(0.0, 0.0, theta_target, phi_target, phase_mat)
    print(f"\n16x16 RIS Array Beam Steering to 30 deg theta, 40 deg phi:")
    print(f"Normalized Array Factor Magnitude: {np.abs(af_peak):.4f} ({20*np.log10(np.abs(af_peak)):.2f} dB)")

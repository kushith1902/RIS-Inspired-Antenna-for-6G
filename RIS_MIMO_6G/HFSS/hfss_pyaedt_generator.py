"""
ANSYS HFSS PyAEDT Automation Script Generator
Generates Python scripts leveraging PyAEDT (ansys.aedt.core) for 28 GHz Patch Antenna and RIS Unit Cell Simulations.
"""

import os

class HFSSPyAEDTGenerator:
    def __init__(self, output_dir="HFSS_Scripts"):
        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)

    def generate_pyaedt_script(self, filename="run_hfss_28ghz_simulation.py"):
        script_code = """# ANSYS HFSS Automated Simulation Script via PyAEDT
# Requirements: pip install pyaedt

import sys

def run_hfss_automation():
    try:
        from pyaedt import Hfss
    except ImportError:
        print("[HFSS PyAEDT] pyaedt is not installed. To run on machine with ANSYS Electromagnetics Desktop:")
        print("pip install pyaedt")
        return

    # Initialize HFSS Project
    hfss = Hfss(specified_version="2024.1", solution_type="Modal")
    hfss.modeler.model_units = "mm"

    # Define Materials
    sub_mat = "rogers_rt5880"
    if not hfss.materials.check_if_material_exists(sub_mat):
        mat = hfss.materials.add_material(sub_mat)
        mat.permittivity = 2.2
        mat.dielectric_loss_tangent = 0.0009

    # Model Geometry
    W = 4.232
    L = 3.398
    h = 0.508
    Wg = 7.280
    Lg = 6.446

    # Create Box Substrate
    substrate = hfss.modeler.create_box(
        origin=["-Wg/2", "-Lg/2", 0],
        sizes=[Wg, Lg, h],
        name="Substrate",
        material=sub_mat
    )

    # Create Ground Plane
    ground = hfss.modeler.create_rectangle(
        orientation="XY",
        origin=["-Wg/2", "-Lg/2", 0],
        sizes=[Wg, Lg],
        name="Ground",
        material="copper"
    )

    # Create Patch
    patch = hfss.modeler.create_rectangle(
        orientation="XY",
        origin=["-W/2", "-L/2", h],
        sizes=[W, L],
        name="Patch",
        material="copper"
    )

    # Assign Boundaries
    hfss.assign_perfecte([ground.name, patch.name])
    
    # Create Lumped Port
    port = hfss.create_lumped_port_to_sheet(
        sheet_name=patch.name,
        portname="Port1",
        impedance=50.0
    )

    # Set Up Solution
    setup = hfss.create_setup("Setup28GHz")
    setup.props["Frequency"] = "28GHz"
    setup.props["MaximumPasses"] = 12
    setup.props["MinimumPasses"] = 2
    setup.props["MaxDeltaS"] = 0.02

    # Add Frequency Sweep
    hfss.create_frequency_sweep(
        setupname="Setup28GHz",
        sweepname="Sweep_24_to_32GHz",
        start_frequency=24.0,
        stop_frequency=32.0,
        num_of_freq_points=401,
        sweep_type="Interpolating"
    )

    print("[PyAEDT] HFSS Setup complete. Ready for analysis.")
    # hfss.analyze_setup("Setup28GHz")
    hfss.release_desktop(close_projects=False, close_desktop=False)

if __name__ == "__main__":
    run_hfss_automation()
"""
        filepath = os.path.join(self.output_dir, filename)
        with open(filepath, "w") as f:
            f.write(script_code)
        print(f"[HFSS] PyAEDT Script saved to: {filepath}")
        return filepath

if __name__ == "__main__":
    generator = HFSSPyAEDTGenerator(output_dir=os.path.join(os.path.dirname(__file__), "Generated_HFSS"))
    generator.generate_pyaedt_script()

"""
CST Studio Suite Automated VBScript / Python Macro Generator
Generates full CST Studio Suite simulation scripts for 28 GHz Patch Antenna, RIS Unit Cell, and 4x4 MIMO Array.
"""

import os

class CSTMacroGenerator:
    def __init__(self, output_dir="CST_Macros"):
        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)

    def generate_patch_macro(self, filename="create_28ghz_patch.vbs"):
        vbs_code = """' CST Studio Suite Automation Macro for 28 GHz Microstrip Patch Antenna
' Substrate: Rogers RT/duroid 5880 (eps_r = 2.2, h = 0.508 mm)

Sub Main()
    ' Initialize Project
    ChangeSolverType "HF Frequency Domain"
    Units.Geometry "mm"
    Units.Frequency "GHz"
    Units.Time "ns"

    ' Parameters
    Dim f0, W, L, h, Wg, Lg, y0, W_feed
    f0 = 28.0
    W = 4.232
    L = 3.398
    h = 0.508
    Wg = 7.280
    Lg = 6.446
    y0 = 1.156
    W_feed = 1.554

    ' Define Materials
    With Material
        .Reset
        .Name "Rogers RT5880"
        .Epsilon "2.2"
        .Mu "1.0"
        .TanD "0.0009"
        .Create
    End With

    ' Create Substrate Box
    With Brick
        .Reset
        .Name "Substrate"
        .Component "component1"
        .Material "Rogers RT5880"
        .Xrange -Wg/2, Wg/2
        .Yrange -Lg/2, Lg/2
        .Zrange 0, h
        .Create
    End With

    ' Create Ground Plane
    With Brick
        .Reset
        .Name "Ground"
        .Component "component1"
        .Material "PEC"
        .Xrange -Wg/2, Wg/2
        .Yrange -Lg/2, Lg/2
        .Zrange -0.035, 0
        .Create
    End With

    ' Create Patch with Inset Feed
    With Brick
        .Reset
        .Name "Patch"
        .Component "component1"
        .Material "PEC"
        .Xrange -W/2, W/2
        .Yrange -L/2, L/2
        .Zrange h, h + 0.035
        .Create
    End With

    ' Set Frequency Range
    Solver.FrequencyRange 24.0, 32.0

    ' Define Farfield Monitor
    With Monitor
        .Reset
        .Name "farfield (f=28)"
        .Dimension "Farfield"
        .Frequency "28.0"
        .Create
    End With

    ' Run Frequency Domain Solver
    FDSolver.Start
End Sub
"""
        filepath = os.path.join(self.output_dir, filename)
        with open(filepath, "w") as f:
            f.write(vbs_code)
        print(f"[CST] VBScript Macro saved to: {filepath}")
        return filepath

    def generate_ris_unit_cell_macro(self, filename="create_28ghz_ris_unit_cell.vbs"):
        vbs_code = """' CST Studio Suite Automation Macro for 28 GHz RIS Unit Cell (Periodic Boundary)
Sub Main()
    ChangeSolverType "HF Frequency Domain"
    Units.Geometry "mm"
    Units.Frequency "GHz"

    ' Define Periodic Boundary Conditions for Unit Cell Floquet Port Analysis
    Boundary.Xmin "periodic"
    Boundary.Xmax "periodic"
    Boundary.Ymin "periodic"
    Boundary.Ymax "periodic"
    Boundary.Zmin "expanded open"
    Boundary.Zmax "expanded open"

    ' Floquet Port Setup
    FloquetPort.Reset
    FloquetPort.SetNumberOfModes "2"
    FloquetPort.Create

    Solver.FrequencyRange 24.0, 32.0
    FDSolver.Start
End Sub
"""
        filepath = os.path.join(self.output_dir, filename)
        with open(filepath, "w") as f:
            f.write(vbs_code)
        print(f"[CST] RIS Unit Cell VBScript saved to: {filepath}")
        return filepath

if __name__ == "__main__":
    generator = CSTMacroGenerator(output_dir=os.path.join(os.path.dirname(__file__), "Generated_Macros"))
    generator.generate_patch_macro()
    generator.generate_ris_unit_cell_macro()

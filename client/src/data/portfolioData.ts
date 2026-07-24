import { Project, SkillCategory, ResearchPaper, ExperienceItem, Certification, Achievement, ServiceItem, CommitItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "S. Kushith",
  title: "Electronics & Communication Engineer",
  designations: [
    "Electronics & Communication Engineer",
    "RF & Antenna Design Enthusiast",
    "MATLAB Simulation Researcher",
    "IoT & Hardware Explorer",
    "Optical & Wireless Comm Learner"
  ],
  bio: "Final-year Electronics and Communication Engineering student (CGPA 9.05/10) at Vellore Institute of Technology specializing in Embedded Systems, RF/Antenna Design, and Optical & Wireless Communication. Hands-on experience building and simulating IoT, VLC, and WDM communication systems using Python, MATLAB, and Embedded C.",
  cgpa: "9.05 / 10.0",
  university: "Vellore Institute of Technology (VIT Vellore)",
  location: "Vellore / Andhra Pradesh, India",
  email: "kushiths1@gmail.com",
  github: "https://github.com/kushith",
  linkedin: "https://linkedin.com/in/s-kushith",
  resumeUrl: "/S_Kushith_Resume.pdf",
  availableForHire: true
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Hardware & Design EDA Tools",
    iconName: "Cpu",
    description: "IC Layout, Antenna Design, High-Frequency Electromagnetic Simulation & Optical Modeling",
    skills: [
      { name: "Cadence Virtuoso", level: 65, experience: "6 mos", icon: "Radio", categoryColor: "#38BDF8" },
      { name: "Cadence RF Design", level: 62, experience: "6 mos", icon: "Activity", categoryColor: "#38BDF8" },
      { name: "OptiSystem", level: 70, experience: "6 mos", icon: "Sun", categoryColor: "#38BDF8" },
      { name: "Ansys HFSS", level: 60, experience: "6 mos", icon: "Wifi", categoryColor: "#38BDF8" },
      { name: "NI Multisim", level: 72, experience: "6 mos", icon: "Zap", categoryColor: "#38BDF8" },
      { name: "NetSim", level: 58, experience: "6 mos", icon: "Network", categoryColor: "#38BDF8" }
    ]
  },
  {
    title: "Embedded & Programming",
    iconName: "CircuitBoard",
    description: "Microcontroller Firmware, Keil uVision IDE, C/C++, Core Java & Scientific Computation",
    skills: [
      { name: "Arduino IDE", level: 74, experience: "6 mos", icon: "Cpu", categoryColor: "#22C55E" },
      { name: "Keil uVision", level: 64, experience: "6 mos", icon: "Terminal", categoryColor: "#22C55E" },
      { name: "Embedded C", level: 68, experience: "6 mos", icon: "Code", categoryColor: "#22C55E" },
      { name: "Core Java", level: 62, experience: "6 mos", icon: "Coffee", categoryColor: "#22C55E" },
      { name: "MATLAB", level: 72, experience: "6 mos", icon: "Binary", categoryColor: "#22C55E" },
      { name: "Python", level: 70, experience: "6 mos", icon: "FileCode", categoryColor: "#22C55E" }
    ]
  },
  {
    title: "Other Tools & AI Productivity",
    iconName: "Wrench",
    description: "Design & Research Productivity Tools",
    skills: [
      { name: "ChatGPT & Claude", level: 74, experience: "6 mos", icon: "Sparkles", categoryColor: "#EC4899" },
      { name: "NotebookLM & Perplexity", level: 70, experience: "6 mos", icon: "BookOpen", categoryColor: "#EC4899" },
      { name: "Canva", level: 68, experience: "6 mos", icon: "Layout", categoryColor: "#EC4899" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "lora-disaster-prediction",
    title: "IoT-Based Disaster Prediction System using LoRa",
    subtitle: "Real-time Environmental Telemetry Mesh & Flask Dashboard",
    category: "IoT & ML",
    description: "Developed a disaster prediction system using LoRa wireless communication and multiple environmental sensors. Used Python, Machine Learning, and MongoDB to process sensor data and generate real-time alerts. Created a Flask-based web dashboard to monitor live sensor readings and prediction results.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    tags: ["LoRa", "Python", "Machine Learning", "MongoDB", "Flask", "Sensors"],
    githubUrl: "https://github.com/kushith",
    liveDemoUrl: "https://github.com/kushith",
    problemStatement: "Remote areas frequently experience cellular network outages during severe events, requiring reliable long-range low-power telemetry for early warning monitoring.",
    workflow: [
      "Interfaced multi-parameter environmental sensors with LoRa wireless modules.",
      "Transmitted sensor telemetry over LoRa radio frequency band.",
      "Processed telemetry pipeline in Python using Machine Learning models for prediction.",
      "Logged historical metrics into MongoDB database.",
      "Visualized real-time alerts and telemetry on a Flask web dashboard."
    ],
    features: [
      "Long-range LoRa wireless communication operating without cellular infrastructure.",
      "Python Machine Learning model predicting early flood and disaster hazards.",
      "Flask-based web dashboard displaying live sensor readings.",
      "MongoDB database integration for continuous sensor logging."
    ],
    techStack: [
      { category: "Hardware & Wireless", items: ["LoRa Wireless Modules", "Environmental Sensors"] },
      { category: "Software & Web", items: ["Python", "Flask Dashboard", "MongoDB"] },
      { category: "Machine Learning", items: ["Python ML Models"] }
    ],
    metrics: [
      { label: "Wireless", value: "LoRa" },
      { label: "Backend", value: "Flask" },
      { label: "Database", value: "MongoDB" },
      { label: "Language", value: "Python" }
    ],
    codeSnippet: {
      language: "python",
      filename: "flask_lora_app.py",
      code: `# Flask Web Dashboard & Sensor Telemetry Pipeline
from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)
db_client = MongoClient("mongodb://localhost:27017/")
db = db_client["lora_disaster_db"]

@app.route("/api/sensor_data", methods=["POST"])
def receive_sensor_data():
    data = request.json
    db.sensor_readings.insert_one(data)
    return jsonify({"status": "received", "data": data})`
    },
    futureImprovements: [
      "Adding low-power battery optimization for extended outdoor sensor deployments.",
      "Expanding sensor array to include atmospheric pressure and wind metrics."
    ]
  },
  {
    id: "cloud-multi-disease-prediction",
    title: "Cloud-Based Multi-Disease Prediction System",
    subtitle: "FastAPI Machine Learning Platform Deployed on Render Cloud",
    category: "Cloud & AI",
    description: "Developed an ML-based disease prediction platform using FastAPI and an interactive web interface. Deployed the project on Render Cloud for real-time disease analysis and prediction. Integrated multiple disease prediction models to provide quick and user-friendly medical insights.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    tags: ["FastAPI", "Python", "Machine Learning", "Render Cloud", "Interactive Web"],
    githubUrl: "https://github.com/kushith",
    liveDemoUrl: "https://render.com",
    problemStatement: "Providing fast, accessible disease prediction tools for clinical analysis through cloud microservices.",
    workflow: [
      "Preprocessed healthcare parameters for multi-disease ML models.",
      "Built APIs using Python FastAPI for fast model execution.",
      "Deployed project on Render Cloud for real-time accessibility.",
      "Created an interactive web interface for patient data entry."
    ],
    features: [
      "Multi-disease prediction models providing medical insights.",
      "Deployed on Render Cloud for global access.",
      "Interactive web interface for intuitive user interaction.",
      "FastAPI microservice architecture."
    ],
    techStack: [
      { category: "Backend", items: ["FastAPI", "Python"] },
      { category: "Machine Learning", items: ["Scikit-Learn", "Python ML"] },
      { category: "Cloud", items: ["Render Cloud Deployment"] }
    ],
    metrics: [
      { label: "API Framework", value: "FastAPI" },
      { label: "Cloud Host", value: "Render Cloud" },
      { label: "Interface", value: "Interactive Web" },
      { label: "Language", value: "Python" }
    ],
    codeSnippet: {
      language: "python",
      filename: "fastapi_prediction.py",
      code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Multi-Disease Prediction API")

class HealthMetrics(BaseModel):
    glucose: float
    blood_pressure: float
    age: int

@app.post("/predict")
def predict(metrics: HealthMetrics):
    # ML model prediction logic
    return {"prediction": "Low Risk", "confidence": "94%"}`
    },
    futureImprovements: [
      "Adding user history tracking for patient progress monitoring.",
      "Expanding disease models to include liver and kidney diagnostic analytics."
    ]
  },
  {
    id: "4-channel-wdm-optical-comm",
    title: "Performance Analysis of 4-Channel WDM System using Optical Amplification Techniques",
    subtitle: "OptiSystem Simulation comparing Optical Gain, TW-SOA, and Raman Amplifiers",
    category: "Optical Comm",
    description: "Designed and simulated a 4-channel WDM optical communication system using OptiSystem to analyse BER and Q-factor performance. Compared Optical Gain Amplifier, TW-SOA with loop control, and Raman Amplifier techniques over different Fiber lengths and power levels. Observed that Raman Amplifier with loop control provided the best signal quality and lowest BER for long-distance optical communication.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80",
    tags: ["OptiSystem", "WDM", "Fiber Optics", "Raman Amplifier", "TW-SOA", "BER Analysis"],
    githubUrl: "https://github.com/kushith",
    paperUrl: "#research-paper-wdm",
    problemStatement: "Long-distance optical fiber transmission undergoes signal attenuation and dispersion requiring optimal optical amplifier technique selection.",
    workflow: [
      "Designed a 4-channel WDM optical communication system in OptiSystem.",
      "Simulated optical transmission over variable fiber lengths and power levels.",
      "Compared Optical Gain Amplifier, TW-SOA with loop control, and Raman Amplifier.",
      "Analyzed Bit Error Rate (BER) and Q-factor performance curves.",
      "Observed Raman Amplifier with loop control provided lowest BER for long distances."
    ],
    features: [
      "OptiSystem simulation of 4-channel WDM system.",
      "Comparative analysis of 3 optical amplification techniques.",
      "Demonstrated Raman Amplifier with loop control gives lowest BER.",
      "BER and Q-factor evaluation across fiber lengths and power levels."
    ],
    techStack: [
      { category: "Simulation Tool", items: ["OptiSystem"] },
      { category: "Amplification", items: ["Optical Gain Amp", "TW-SOA with Loop Control", "Raman Amplifier with Loop Control"] },
      { category: "Analysis", items: ["BER Performance", "Q-Factor Measurement"] }
    ],
    metrics: [
      { label: "Optimal Amp", value: "Raman (Loop Ctrl)" },
      { label: "Performance", value: "Lowest BER" },
      { label: "Channels", value: "4-Channel WDM" },
      { label: "Tool", value: "OptiSystem" }
    ],
    codeSnippet: {
      language: "matlab",
      filename: "ber_optisystem_plot.m",
      code: `% OptiSystem WDM Simulation Results Plotting
fiber_length = [20, 40, 60, 80, 100];
ber_gain_amp = [1e-11, 1e-9, 1e-7, 1e-5, 1e-4];
ber_raman_loop = [1e-15, 1e-13, 1e-12, 1e-10, 1e-9]; % Lowest BER

figure;
semilogy(fiber_length, ber_gain_amp, '-r^'); hold on;
semilogy(fiber_length, ber_raman_loop, '-go');
legend('Optical Gain Amp', 'Raman Amp with Loop Control');
title('BER vs Fiber Length in 4-Channel WDM');`
    },
    futureImprovements: [
      "Simulating 8-channel WDM configurations over extended fiber spans.",
      "Investigating hybrid amplifier combinations for high-bit-rate optical networks."
    ]
  },
  {
    id: "rsma-visible-light-comm",
    title: "Energy-Efficient and Secure RSMA-Based Visible Light Communication System",
    subtitle: "MATLAB Simulation of Rate-Splitting Multiple Access for Multi-User VLC",
    category: "Wireless Comm",
    description: "Developed and simulated an RSMA-based Visible Light Communication (VLC) system in MATLAB for secure and energy-efficient multi-user communication. Implemented interference management and power allocation techniques to improve BER, throughput, energy efficiency, and secrecy rate. Analysed system performance under different channel and user conditions, showing better reliability and reduced interference compared to conventional methods.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000&q=80",
    tags: ["MATLAB", "VLC", "RSMA", "Wireless Comm", "Power Allocation", "Secrecy Rate"],
    githubUrl: "https://github.com/kushith",
    paperUrl: "#research-paper-rsma",
    problemStatement: "Indoor optical wireless communication suffers from co-channel interference and security vulnerabilities in multi-user environments.",
    workflow: [
      "Simulated an RSMA-based Visible Light Communication (VLC) system in MATLAB.",
      "Implemented interference management and power allocation techniques.",
      "Analyzed BER, throughput, energy efficiency, and secrecy rate.",
      "Evaluated system performance under different channel and user conditions.",
      "Demonstrated better reliability and reduced interference compared to conventional methods."
    ],
    features: [
      "MATLAB simulation of multi-user RSMA Visible Light Communication system.",
      "Interference management and power allocation for multi-user access.",
      "Evaluated BER, throughput, energy efficiency, and secrecy rate.",
      "Higher reliability and lower interference over conventional methods."
    ],
    techStack: [
      { category: "Simulation Tool", items: ["MATLAB"] },
      { category: "Communication Concepts", items: ["RSMA", "VLC", "Power Allocation", "Interference Management"] }
    ],
    metrics: [
      { label: "Access Scheme", value: "RSMA VLC" },
      { label: "Primary Advantage", value: "Reduced Interference" },
      { label: "Key Metrics", value: "BER & Secrecy Rate" },
      { label: "Tool", value: "MATLAB" }
    ],
    codeSnippet: {
      language: "matlab",
      filename: "rsma_vlc_power_allocation.m",
      code: `% MATLAB RSMA VLC Power Allocation Simulation
function [sum_rate, ber] = simulate_rsma_vlc(channel_gains, P_max)
    % Power allocation between common and private streams
    P_common = 0.6 * P_max;
    P_private = 0.4 * P_max;
    
    % Inter-user interference calculation
    interference = sum(channel_gains) * 0.1;
    snr = (channel_gains * P_common) / (interference + 1e-3);
    
    sum_rate = log2(1 + snr);
    ber = 0.5 * erfc(sqrt(snr) / sqrt(2));
end`
    },
    futureImprovements: [
      "Hardware experimental validation using LED arrays and optical photodetectors.",
      "Analyzing adaptive modulation schemes for dynamic indoor lighting environments."
    ]
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "wdm-optical-paper",
    title: "Performance Analysis of 4-Channel WDM System using Optical Amplification Techniques",
    authors: ["S. Kushith"],
    conferenceOrJournal: "Optical Communication Systems Research",
    year: "Research Work",
    status: "In Preparation",
    researchArea: "Optical Fiber Communications",
    abstract: "Designed and simulated a 4-channel WDM optical communication system using OptiSystem to analyse BER and Q-factor performance. Compared Optical Gain Amplifier, TW-SOA with loop control, and Raman Amplifier techniques over different Fiber lengths and power levels. Observed that Raman Amplifier with loop control provided the best signal quality and lowest BER for long-distance optical communication.",
    citation: "S. Kushith, 'Performance Analysis of 4-Channel WDM System using Optical Amplification Techniques,' Research Work (Unpublished).",
    pdfUrl: "#",
    keyFindings: [
      "Raman Amplifier with loop control provided the lowest BER and best signal quality.",
      "Compared Optical Gain Amplifier, TW-SOA with loop control, and Raman Amplifier.",
      "Evaluated system across variable fiber lengths and optical power levels."
    ]
  },
  {
    id: "rsma-vlc-paper",
    title: "Energy-Efficient and Secure RSMA-Based Visible Light Communication System",
    authors: ["S. Kushith"],
    conferenceOrJournal: "Wireless Communication & VLC Research",
    year: "Research Work",
    status: "In Preparation",
    researchArea: "Visible Light Communication (VLC) & RSMA",
    abstract: "Developed and simulated an RSMA-based Visible Light Communication (VLC) system in MATLAB for secure and energy-efficient multi-user communication. Implemented interference management and power allocation techniques to improve BER, throughput, energy efficiency, and secrecy rate. Analysed system performance under different channel and user conditions, showing better reliability and reduced interference compared to conventional methods.",
    citation: "S. Kushith, 'Energy-Efficient and Secure RSMA-Based Visible Light Communication System,' Research Work (Unpublished).",
    pdfUrl: "#",
    keyFindings: [
      "RSMA rate-splitting effectively reduces multi-user interference in optical channels.",
      "Improved BER, throughput, energy efficiency, and secrecy rate.",
      "Demonstrated better reliability compared to conventional multi-user methods."
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Intern",
    company: "RKM PowerGen Ltd",
    location: "Uchpinda, Chhattisgarh, India",
    period: "Industrial Internship",
    type: "Internship",
    description: [
      "Assisted in control and instrumentation work, including monitoring systems, calibration, and troubleshooting of industrial equipment.",
      "Supported electrical operations by working with equipment and control panels to maintain safe and reliable performance."
    ],
    technologies: ["Control & Instrumentation", "Monitoring Systems", "Equipment Calibration", "Control Panels", "Electrical Operations"],
    certificateUrl: "#"
  },
  {
    id: "exp-2",
    role: "Event Coordinator at Gravitas 2025",
    company: "Vellore Institute of Technology (VIT Vellore)",
    location: "Vellore, India",
    period: "2025",
    type: "Full-time",
    description: [
      "Acted as the primary liaison between participants and event organizers at Gravitas 2025, VIT Vellore's annual technical fest.",
      "Managed registrations, addressed participant queries, and ensured smooth coordination of event activities.",
      "Collaborated across teams to maintain effective communication and ensure successful event execution."
    ],
    technologies: ["Event Management", "Technical Fest Coordination", "Participant Liaison", "Team Collaboration"],
    certificateUrl: "#"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-1",
    title: "30-Day Internship on Embedded System Design",
    issuer: "Pantech Solutions",
    date: "Completed",
    credentialId: "PANTECH-EMBEDDED-30D",
    skills: ["Embedded Systems", "Microcontroller Applications", "Embedded C", "Hardware Interfacing"],
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80",
    verifyUrl: "https://pantechsolutions.net"
  },
  {
    id: "cert-2",
    title: "VLSI Certification Program",
    issuer: "1Stop.ai",
    date: "Completed",
    credentialId: "1STOP-VLSI-CERT",
    skills: ["VLSI Design Fundamentals", "Semiconductor Concepts", "Digital Electronics", "IC Design"],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    verifyUrl: "https://1stop.ai"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "Academic Excellence",
    category: "Academic",
    value: "9.05 / 10",
    label: "CGPA (VIT Vellore)",
    description: "Completed 6th semester at Vellore Institute of Technology with a strong CGPA of 9.05 / 10.0.",
    iconName: "Award"
  },
  {
    id: "ach-2",
    title: "Intermediate (MPC)",
    category: "Academic",
    value: "97.7%",
    label: "Narayana Group of Schools and Colleges",
    description: "Secured 97.7% in Intermediate (MPC) with strong fundamentals in Mathematics and Science.",
    iconName: "Award"
  },
  {
    id: "ach-3",
    title: "SSC 10th Class",
    category: "Academic",
    value: "100%",
    label: "Narayana Group of Schools",
    description: "Achieved 100% academic performance in 10th class with a strong educational foundation.",
    iconName: "Award"
  },
  {
    id: "ach-4",
    title: "Gravitas 2025 Coordinator",
    category: "Leadership",
    value: "Event Liaison",
    label: "VIT Vellore Technical Fest",
    description: "Led coordination for Gravitas 2025 technical fest managing participant queries and event execution.",
    iconName: "Users"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Embedded System Development",
    icon: "Cpu",
    description: "Embedded system prototyping using Arduino IDE, Keil uVision, and Embedded C.",
    deliverables: ["Embedded C Firmware", "Circuit Wiring Diagram", "Microcontroller Code"],
    techUsed: ["Embedded C", "Arduino IDE", "Keil uVision"]
  },
  {
    id: "srv-2",
    title: "MATLAB Simulation & Signal Modeling",
    icon: "Binary",
    description: "Mathematical modeling of VLC RSMA systems, power allocation, and interference management.",
    deliverables: ["MATLAB Simulation Scripts", "Performance Plots"],
    techUsed: ["MATLAB", "RSMA", "VLC"]
  },
  {
    id: "srv-3",
    title: "RF & Optical Communication Analysis",
    icon: "Wifi",
    description: "4-channel WDM optical simulation in OptiSystem, Raman Amplifier BER analysis, and Cadence EDA modeling.",
    deliverables: ["OptiSystem Simulation Files", "BER & Q-Factor Curves"],
    techUsed: ["OptiSystem", "Cadence Virtuoso", "Cadence RF", "HFSS"]
  },
  {
    id: "srv-4",
    title: "IoT Telemetry & Web Dashboard",
    icon: "Globe",
    description: "LoRa sensor disaster telemetry system with Python ML models, MongoDB, and Flask dashboard.",
    deliverables: ["LoRa Telemetry Pipeline", "Flask Dashboard", "MongoDB Integration"],
    techUsed: ["Python", "Flask", "MongoDB", "LoRa"]
  }
];

export const RECENT_COMMITS: CommitItem[] = [
  {
    id: "c1",
    repo: "lora-disaster-prediction",
    message: "feat: updated Python sensor processing script and Flask web dashboard",
    time: "3 hours ago",
    branch: "main",
    hash: "a9012f4"
  },
  {
    id: "c2",
    repo: "rsma-visible-light-comm",
    message: "refactor: updated MATLAB power allocation script for RSMA VLC simulation",
    time: "1 day ago",
    branch: "matlab-vlc",
    hash: "b8231c5"
  },
  {
    id: "c3",
    repo: "cloud-multi-disease-prediction",
    message: "deploy: updated FastAPI prediction route and Render cloud configuration",
    time: "2 days ago",
    branch: "main",
    hash: "c7342d6"
  },
  {
    id: "c4",
    repo: "4-channel-wdm-optical-comm",
    message: "sim: completed OptiSystem Raman amplifier BER & Q-factor simulation plots",
    time: "3 days ago",
    branch: "optisystem-v1",
    hash: "d6453e7"
  }
];

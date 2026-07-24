export const downloadResumePDF = () => {
  const resumeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>S_Kushith_Resume.pdf</title>
  <style>
    @page { size: letter; margin: 15mm; }
    body {
      font-family: 'Arial', 'Helvetica', sans-serif;
      color: #000000;
      background: #ffffff;
      margin: 0;
      padding: 20px;
      line-height: 1.35;
      font-size: 10.5pt;
    }
    .header {
      text-align: center;
      margin-bottom: 12px;
    }
    .header h1 {
      margin: 0 0 4px 0;
      font-size: 20pt;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
    .header .contact-info {
      font-size: 9.5pt;
      color: #000000;
    }
    .header a {
      color: #000000;
      text-decoration: underline;
    }
    .section-title {
      font-size: 11pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 14px;
      margin-bottom: 3px;
      border-bottom: 1.5px solid #000000;
      padding-bottom: 2px;
      letter-spacing: 0.5px;
    }
    .summary-text {
      margin-top: 4px;
      margin-bottom: 10px;
      text-align: justify;
    }
    .item-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-top: 6px;
      margin-bottom: 2px;
    }
    .item-title {
      font-weight: bold;
      font-size: 10.5pt;
    }
    .item-subtitle {
      font-style: italic;
      font-size: 10pt;
    }
    .item-date {
      font-size: 10pt;
      font-weight: normal;
      text-align: right;
    }
    ul {
      margin: 3px 0 8px 18px;
      padding: 0;
    }
    li {
      margin-bottom: 3px;
    }
    .skills-group {
      margin-bottom: 4px;
    }
    .skills-group strong {
      font-weight: bold;
    }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>

  <div class="header">
    <h1>S. Kushith</h1>
    <div class="contact-info">
      ✉ <a href="mailto:kushiths1@gmail.com">kushiths1@gmail.com</a> &nbsp;|&nbsp; 
      🔗 <a href="https://linkedin.com/in/s-kushith">linkedin.com/in/s-kushith</a> &nbsp;|&nbsp; 
      💻 <a href="https://github.com/kushith">github.com/kushith</a>
    </div>
  </div>

  <div class="section-title">SUMMARY</div>
  <div class="summary-text">
    Final-year Electronics and Communication Engineering student (CGPA 9.05/10) specializing in Embedded Systems, RF/Antenna Design, and Optical & Wireless Communication. Hands-on experience building and simulating IoT, VLC, and WDM communication systems using Python, MATLAB, and Embedded C. Seeking an Embedded Systems / RF Engineering role to apply strong analytical and problem-solving skills to real-world hardware-software integration.
  </div>

  <div class="section-title">EDUCATION</div>
  <div class="item-row">
    <div>
      <span class="item-title">Vellore Institute of Technology</span>
    </div>
    <div class="item-date">Vellore, India</div>
  </div>
  <div class="item-row">
    <div>
      <span class="item-subtitle">Bachelor of Technology in Electronics and Communication Engineering</span>
    </div>
    <div class="item-date">Aug 2023 – Jul 2027 (Expected)</div>
  </div>
  <ul>
    <li>Completed 6th Semester with CGPA of <strong>9.05/10</strong></li>
  </ul>

  <div class="item-row">
    <div>
      <span class="item-title">Narayana Group of Schools and Colleges</span>
    </div>
    <div class="item-date">Andhra Pradesh, India</div>
  </div>
  <div class="item-row">
    <div>
      <span class="item-subtitle">Intermediate (MPC)</span>
    </div>
  </div>
  <ul>
    <li>Secured <strong>97.7%</strong> with strong fundamentals in Mathematics and Science.</li>
  </ul>

  <div class="item-row">
    <div>
      <span class="item-subtitle">SSC (10th Class)</span>
    </div>
  </div>
  <ul>
    <li>Achieved <strong>100%</strong> academic performance with a strong educational foundation.</li>
  </ul>

  <div class="section-title">TECHNICAL SKILLS</div>
  <div class="skills-group">
    <strong>Hardware & Design:</strong> Cadence Virtuoso, Cadence RF Design, OptiSystem, HFSS, Multisim, NetSim
  </div>
  <div class="skills-group">
    <strong>Embedded & Programming:</strong> Arduino IDE, Keil uVision, Core Java, Embedded C, MATLAB
  </div>
  <div class="skills-group">
    <strong>Other Tools:</strong> Canva, AI productivity tools like ChatGPT, NotebookLM, Claude, Perplexity
  </div>

  <div class="section-title">PROJECTS</div>
  
  <div class="item-title">IoT-Based Disaster Prediction System using LoRa</div>
  <ul>
    <li>Developed a disaster prediction system using LoRa wireless communication and multiple environmental sensors.</li>
    <li>Used Python, Machine Learning, and MongoDB to process sensor data and generate real-time alerts.</li>
    <li>Created a Flask-based web dashboard to monitor live sensor readings and prediction results.</li>
  </ul>

  <div class="item-title">Cloud-Based Multi-Disease Prediction System <span style="font-weight:normal; font-size:9.5pt;">[<a href="https://github.com/kushith">Live Link</a>]</span></div>
  <ul>
    <li>Developed an ML-based disease prediction platform using FastAPI and an interactive web interface.</li>
    <li>Deployed the project on Render Cloud for real-time disease analysis and prediction.</li>
    <li>Integrated multiple disease prediction models to provide quick and user-friendly medical insights.</li>
  </ul>

  <div class="item-title">Performance Analysis of 4-Channel WDM System using Optical Amplification Techniques <span style="font-weight:normal; font-size:9.5pt;">[<a href="#paper">Paper</a>]</span></div>
  <ul>
    <li>Designed and simulated a 4-channel WDM optical communication system using OptiSystem to analyse BER and Q-factor performance.</li>
    <li>Compared Optical Gain Amplifier, TW-SOA with loop control, and Raman Amplifier techniques over different Fiber lengths and power levels.</li>
    <li>Observed that Raman Amplifier with loop control provided the best signal quality and lowest BER for long-distance optical communication.</li>
  </ul>

  <div class="item-title">Energy-Efficient and Secure RSMA-Based Visible Light Communication System <span style="font-weight:normal; font-size:9.5pt;">[<a href="#paper">Paper</a>]</span></div>
  <ul>
    <li>Developed and simulated an RSMA-based Visible Light Communication (VLC) system in MATLAB for secure and energy-efficient multi-user communication.</li>
    <li>Implemented interference management and power allocation techniques to improve BER, throughput, energy efficiency, and secrecy rate.</li>
    <li>Analysed system performance under different channel and user conditions, showing better reliability and reduced interference compared to conventional methods.</li>
  </ul>

  <div class="section-title">EXPERIENCE</div>
  <div class="item-row">
    <div>
      <span class="item-title">Intern</span> &nbsp; <span class="item-subtitle">RKM PowerGen Ltd</span>
    </div>
    <div class="item-date">Uchpinda, Chhattisgarh, India</div>
  </div>
  <ul>
    <li>Assisted in control and instrumentation work, including monitoring systems, calibration, and troubleshooting of industrial equipment.</li>
    <li>Supported electrical operations by working with equipment and control panels to maintain safe and reliable performance.</li>
  </ul>

  <div class="item-row">
    <div>
      <span class="item-title">Event Coordinator at Gravitas 2025</span>
    </div>
    <div class="item-date">VIT Vellore</div>
  </div>
  <div class="item-row">
    <div>
      <span class="item-subtitle">Vellore Institute of Technology</span>
    </div>
    <div class="item-date">2025</div>
  </div>
  <ul>
    <li>Acted as the primary liaison between participants and event organizers at Gravitas 2025, VIT Vellore's annual technical fest.</li>
    <li>Managed registrations, addressed participant queries, and ensured smooth coordination of event activities.</li>
    <li>Collaborated across teams to maintain effective communication and ensure successful event execution.</li>
  </ul>

  <div class="section-title">CERTIFICATIONS</div>
  <ul>
    <li>Completed a 30-day Internship on Embedded System Design at <strong>Pantech Solutions</strong>, gaining hands-on knowledge in embedded systems and microcontroller-based applications. [<a href="https://pantechsolutions.net">Certificate</a>]</li>
    <li>Successfully completed a VLSI certification program from <strong>1Stop.ai</strong>, covering fundamentals of VLSI design and semiconductor concepts. [<a href="https://1stop.ai">Certificate</a>]</li>
  </ul>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    }
  </script>

</body>
</html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(resumeHtml);
    printWindow.document.close();
  }
};

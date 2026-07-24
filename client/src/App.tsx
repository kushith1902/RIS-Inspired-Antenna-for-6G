import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { ParticleBackground } from './components/layout/ParticleBackground';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ResearchSection } from './components/research/ResearchSection';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { CertificationsSection } from './components/certifications/CertificationsSection';
import { ServicesSection } from './components/services/ServicesSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { InteractiveTerminal } from './components/terminal/InteractiveTerminal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';

export const App: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="relative bg-[#070B14] text-[#F8FAFC] min-h-screen selection:bg-cyan-400 selection:text-black">
      
      {/* Background Physics Particle & Blueprint Canvas */}
      <ParticleBackground />

      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="relative z-10 space-y-8">
        <HeroSection onOpenTerminal={() => setTerminalOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ResearchSection />
        <ExperienceTimeline />
        <CertificationsSection />
        <ServicesSection />
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Modals */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      <AdminDashboardModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

    </div>
  );
};

export default App;

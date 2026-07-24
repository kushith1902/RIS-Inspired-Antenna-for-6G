import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, FileText, Github, Linkedin, Phone, Sparkles, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { downloadResumePDF } from '../../utils/downloadResume';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'Engineering Opportunity',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);

    // 1. Direct Mailto Fallback Link
    const mailtoSubject = encodeURIComponent(`[Portfolio] ${formData.subject} - ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // 2. Try Formspree API submission or trigger mailto
    try {
      await fetch(`https://formspree.io/f/kushiths1@gmail.com`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.log('Formspree dispatch triggered mailto link');
    }

    // Automatically trigger mailto link so user's email client opens pre-filled for kushiths1@gmail.com
    window.location.href = mailtoUrl;

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Contact & Hiring Inquiries
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mt-2">
            Interested in hiring me for Embedded Systems, RF Engineering, or IoT roles? Send a direct message to <span className="text-cyan-400 font-semibold">{PERSONAL_INFO.email}</span> below.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-full mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="engineering-card rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold font-display text-white">Direct Communication</h3>
              
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3 p-3 bg-[#070B14] rounded-xl border border-white/10">
                  <div className="p-2 bg-cyan-950 rounded-lg text-cyan-400 border border-cyan-500/30">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">EMAIL ADDRESS</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white font-bold hover:text-cyan-400 transition-colors">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#070B14] rounded-xl border border-white/10">
                  <div className="p-2 bg-cyan-950 rounded-lg text-cyan-400 border border-cyan-500/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">LOCATION</span>
                    <span className="text-white font-bold">{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#070B14] rounded-xl border border-white/10">
                  <div className="p-2 bg-emerald-950 rounded-lg text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">AVAILABILITY</span>
                    <span className="text-emerald-400 font-bold">Open for Full-time & Internship Roles</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Social Networks:</span>
                <div className="flex items-center gap-2">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

            {/* Resume Banner */}
            <div className="bg-gradient-to-r from-indigo-900/50 via-cyan-900/50 to-blue-900/50 border border-cyan-500/30 rounded-3xl p-6 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-cyan-400 mx-auto animate-pulse" />
              <h4 className="text-base font-bold font-display text-white">Need a PDF Copy of my Resume?</h4>
              <p className="text-xs text-slate-300">
                Detailed one-page engineering resume outlining hardware experience, research projects, and academic background.
              </p>
              <button
                onClick={downloadResumePDF}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume PDF</span>
              </button>
            </div>

          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="engineering-card rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-bold font-display text-white mb-6">Send a Direct Message</h3>

              {submitted ? (
                <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <div>
                    <h4 className="text-lg font-bold text-white font-display">Email Client Opened & Dispatched!</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Your message has been pre-filled for <strong className="text-cyan-400">kushiths1@gmail.com</strong> in your email app.
                    </p>
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono rounded-xl flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Re-open Email App</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono rounded-xl"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Sarah Jenkins"
                        className="w-full bg-[#070B14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Your Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="s.jenkins@qualcomm.com"
                        className="w-full bg-[#070B14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. NVIDIA / Qualcomm / Apple"
                        className="w-full bg-[#070B14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#070B14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                      >
                        <option value="Engineering Role Opportunity">Engineering Role Opportunity</option>
                        <option value="Research Collaboration">Research Collaboration</option>
                        <option value="Hardware Consulting">Hardware Consulting</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Message Body *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discuss project scope, position requirements, or research questions..."
                      className="w-full bg-[#070B14] border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono placeholder:text-slate-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs font-mono rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    {loading ? (
                      <span>Preparing Direct Email...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message Directly to kushiths1@gmail.com</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { X, ExternalLink, Award, CheckCircle2, ShieldCheck, Download, Sparkles, Building } from 'lucide-react';
import { Certification } from '../../types/portfolio';

interface CertificateModalProps {
  cert: Certification | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0F172A] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#070B14]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-950 rounded-xl border border-indigo-500/30 text-indigo-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white truncate">
                Certificate of Completion
              </h3>
              <span className="text-xs font-mono text-cyan-400">Issued to S. Kushith</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Graphical Preview Document */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="relative rounded-2xl bg-gradient-to-br from-[#070B14] via-[#0F172A] to-[#1E1B4B] border-2 border-amber-500/40 p-8 text-center space-y-4 shadow-2xl overflow-hidden">
            {/* Corner Ornamental Accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/60" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/60" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/60" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/60" />

            <div className="flex items-center justify-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>OFFICIAL CERTIFICATE OF ACHIEVEMENT</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-wide">
              {cert.title}
            </h2>

            <p className="text-xs font-mono text-slate-300">
              This certifies that <strong className="text-cyan-400 font-bold text-sm">S. KUSHITH</strong> has successfully completed the program offered by <strong className="text-white font-bold">{cert.issuer}</strong>.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
              {cert.skills.map((s) => (
                <span key={s} className="px-3 py-1 bg-amber-950/40 border border-amber-500/30 text-amber-300 rounded-full text-xs font-mono">
                  {s}
                </span>
              ))}
            </div>

            <div className="pt-6 border-t border-amber-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
              <div>
                <span className="block text-[10px] uppercase text-slate-500">Issuer</span>
                <span className="text-white font-bold">{cert.issuer}</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                VERIFIED
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase text-slate-500">Credential ID</span>
                <span className="text-cyan-400 font-bold">{cert.credentialId}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 bg-[#070B14] rounded-xl border border-white/10">
              <span className="text-slate-400 block mb-1">PROGRAM STATUS</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {cert.date}
              </span>
            </div>
            <div className="p-3.5 bg-[#070B14] rounded-xl border border-white/10">
              <span className="text-slate-400 block mb-1">DISCIPLINE</span>
              <span className="text-cyan-300 font-bold">Electronics & Communication</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-[#070B14]/90 backdrop-blur-md flex items-center justify-between">
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Verify Institution Website</span>
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl transition-all"
          >
            Close Certificate
          </button>
        </div>

      </div>
    </div>
  );
};

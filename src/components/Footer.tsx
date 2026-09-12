import React from 'react';
import { Flame, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#071A33] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6B2C] to-[#ff8c42] flex items-center justify-center text-white shadow-lg shadow-[#FF6B2C]/30">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <div>
                <span className="font-heading font-black text-xl tracking-tight text-white">
                  BENGALURU <span className="text-[#FF6B2C]">MARATHON</span>
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-[#FFC857]">
                  2026 EDITION • 12TH YEAR
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              "RUN THE CITY. OWN YOUR STORY." India's most celebrated urban endurance festival connecting 40,000 runners under the royal gulmohar tree canopies of Bengaluru.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[11px]">
                AIMS Certified Course
              </span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[11px]">
                AFI Recognized
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#FFC857]">
              The Races
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => onNavigate('races')} className="hover:text-white transition-colors">
                  Full Marathon (42.2K)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('races')} className="hover:text-white transition-colors">
                  Half Marathon (21.1K)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('races')} className="hover:text-white transition-colors">
                  10K Run & 5K Hope Run
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('route')} className="hover:text-white transition-colors">
                  Interactive Course Map
                </button>
              </li>
            </ul>
          </div>

          {/* Athlete Services */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#1479FF]">
              Athlete Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => onNavigate('tracking')} className="hover:text-white transition-colors">
                  Live Runner Tracking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  Runner Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bib')} className="hover:text-white transition-colors">
                  Digital Race Bib
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('training')} className="hover:text-white transition-colors">
                  Training Platform
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('leaderboard')} className="hover:text-white transition-colors">
                  Race Leaderboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('results')} className="hover:text-white transition-colors">
                  Timing & Certificates
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Admin */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#12B76A]">
              Connect & Admin
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-white transition-colors">
                  Running Community Feed
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors">
                  Race Control Center (Admin)
                </button>
              </li>
              <li>
                <span className="text-slate-500">Contact: support@bengalurumarathon.in</span>
              </li>
              <li>
                <span className="text-slate-500">Helpline: +91 80 4912 2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Bengaluru Marathon. All rights reserved. Run The City.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

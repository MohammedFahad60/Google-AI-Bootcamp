import React from 'react';
import { Sparkles, Handshake, ExternalLink } from 'lucide-react';
import { SPONSORS_DATA } from '../data/mockData';

export const SponsorsSection: React.FC = () => {
  return (
    <section id="sponsors-section" className="py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1479FF]/10 text-[#1479FF] text-xs font-bold uppercase tracking-wider mb-3">
            <Handshake className="w-3.5 h-3.5" />
            Partners & Ecosystem
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#071A33] tracking-tight uppercase">
            POWERED BY INDUSTRY LEADERS
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Proudly supported by India's top sporting, technological, healthcare, and infrastructure institutions.
          </p>
        </div>

        {/* Title Partner Spotlight */}
        <div className="mt-12 max-w-xl mx-auto text-center p-8 rounded-3xl bg-gradient-to-b from-[#F5F7FA] to-white border border-slate-200 shadow-sm">
          <span className="text-[11px] font-black uppercase text-[#FF6B2C] tracking-widest">
            TITLE SPONSOR
          </span>
          <div className="font-heading font-black text-3xl sm:text-4xl text-[#071A33] mt-2">
            INFOSYS FOUNDATION
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Pioneering digital sustainability, green race corridors, and athlete timing infrastructure.
          </p>
        </div>

        {/* Category Partners Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SPONSORS_DATA.filter((s) => s.tier !== 'Title Sponsor').map((sponsor) => (
            <div
              key={sponsor.id}
              className="p-5 rounded-2xl bg-[#F5F7FA] border border-slate-200 flex flex-col items-center justify-center text-center group hover:border-[#1479FF] transition-all"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {sponsor.tier}
              </span>
              <div className="font-heading font-black text-base text-slate-900 mt-2 group-hover:text-[#1479FF] transition-colors">
                {sponsor.name}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {sponsor.role}
              </div>
            </div>
          ))}
        </div>

        {/* Metro Pass & Green Travel Notice */}
        <div className="mt-10 p-5 rounded-2xl bg-blue-50 border border-blue-200 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-700">
            <span className="font-bold text-[#071A33]">Namma Metro Special Race Service: </span>
            Green line & Purple line trains will operate starting from 03:30 AM on race day. Free travel for all runners wearing their official RFID bib!
          </div>
          <span className="font-bold text-[#1479FF] whitespace-nowrap">
            Bengaluru Metro Rail Corporation
          </span>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Clock, Calendar, MapPin, Flag, Award, Music, ShieldCheck } from 'lucide-react';
import { SCHEDULE_EVENTS } from '../data/mockData';

export const EventScheduleView: React.FC = () => {
  return (
    <div id="schedule-page" className="py-12 lg:py-16 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1479FF]/10 text-[#1479FF] text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            Race Weekend Itinerary
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#071A33] tracking-tight uppercase">
            EVENT SCHEDULE
          </h1>
          <p className="mt-2 text-slate-600 text-base">
            October 16–18, 2026 • Expo & Race Day at Sree Kanteerava Stadium & Cubbon Park precinct
          </p>
        </div>

        {/* Timeline Sequence */}
        <div className="mt-12 relative border-l-2 border-[#1479FF]/30 ml-4 sm:ml-36 space-y-8 pl-6 sm:pl-8">
          {SCHEDULE_EVENTS.map((item) => (
            <div key={item.id} className="relative group">
              {/* Left Time Badge for Desktop */}
              <div className="hidden sm:block absolute -left-40 top-1 text-right w-32">
                <span className="font-mono font-black text-xs text-[#1479FF] block">
                  {item.time}
                </span>
                <span className="text-[9px] text-slate-600 font-bold uppercase block mt-0.5">
                  {item.phase}
                </span>
              </div>

              {/* Pin on timeline */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#1479FF] group-hover:border-[#FF6B2C] group-hover:scale-125 transition-all shadow-sm" />

              {/* Card */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
                {/* Mobile time display */}
                <div className="sm:hidden font-mono font-black text-xs text-[#1479FF] mb-1">
                  {item.time} • {item.phase}
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading font-black text-lg text-[#071A33]">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="px-2.5 py-0.5 rounded-md bg-[#FF6B2C]/10 text-[#FF6B2C] font-bold text-[10px] uppercase shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B2C]" />
                  <span>{item.venue}</span>
                  <span className="text-slate-300">•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Cutoff Rules Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2.5 font-heading font-black text-lg text-[#071A33] mb-3">
            <ShieldCheck className="w-5 h-5 text-[#12B76A]" />
            <h3>OFFICIAL COURSE CUT-OFF ENFORCEMENT</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Per Bengaluru Traffic Police directives, roads reopen progressively. Full Marathon course has a strict 6 hour net cut-off (10:30 AM). Half marathon has a 3.5 hour net cut-off. Runners behind cutoff will be comfortably escorted via sweeper electric shuttles to the stadium recovery zone with full medal and breakfast entitlement.
          </p>
        </div>
      </div>
    </div>
  );
};

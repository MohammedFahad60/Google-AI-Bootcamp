import React from 'react';
import {
  Compass,
  TreePine,
  Music,
  Leaf,
  Users2,
  Trophy,
  Check,
} from 'lucide-react';

export const WhyBengaluruSection: React.FC = () => {
  const highlights = [
    {
      icon: Compass,
      title: "Iconic Heritage & Tech Corridors",
      description:
        "Race past colonial-era landmarks, the colossal Vidhana Soudha, high-tech metro flyovers, and lush Cubbon Park under crisp Bengaluru morning skies.",
    },
    {
      icon: Users2,
      title: "Vibrant Running Capital",
      description:
        "Bengaluru is India's distance running heartland. Run alongside seasoned club runners, tech founders, elite pacers, and thousands of roaring locals.",
    },
    {
      icon: Music,
      title: "High-Energy Music & Dhol Zones",
      description:
        "Over 30 live cheer points featuring traditional Nasik dhol drummers, indie rock bands, and student cheer tunnels that carry you past the 30K wall.",
    },
    {
      icon: Leaf,
      title: "Zero-Waste Green Marathon",
      description:
        "100% single-use plastic free. Composting 10 tons of organic waste, solar-powered bib timing pods, and 50,000 tree saplings planted post-race.",
    },
  ];

  const stats = [
    { value: "25K+", label: "Runners Registered", sublabel: "Across 4 distances" },
    { value: "50+", label: "Countries Represented", sublabel: "Global marathoners" },
    { value: "100+", label: "Official Pacers", sublabel: "Target pace squads" },
    { value: "4", label: "Race Categories", sublabel: "42K, 21K, 10K, 5K" },
  ];

  return (
    <section id="why-bengaluru-section" className="py-20 lg:py-28 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Rich City / Runner Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=85"
                alt="Marathon runner pushing through Bengaluru morning route"
                className="w-full h-[520px] object-cover object-center filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-transparent to-transparent opacity-80" />

              {/* Floating Badge in Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#071A33]/90 backdrop-blur-md border border-white/20 text-white">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FFC857] uppercase tracking-wider mb-1">
                  <TreePine className="w-4 h-4 text-[#12B76A]" />
                  The Garden City Experience
                </div>
                <div className="font-heading font-black text-lg">
                  Cubbon Park • Vidhana Soudha • Ulsoor Lake
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Average race morning temperature: 19°C (66°F) with cool shade.
                </p>
              </div>
            </div>

            {/* Decorative background accent */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#FF6B2C]/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-[#1479FF]/10 rounded-full blur-2xl -z-10" />
          </div>

          {/* Right Column: Narrative Content & Stats */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 text-[#FF6B2C] text-xs font-bold uppercase tracking-wider mb-3">
              <Trophy className="w-3.5 h-3.5" />
              The Bengaluru Experience
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#071A33] tracking-tight uppercase">
              MORE THAN A RACE.
            </h2>
            <div className="mt-2 text-xl font-heading font-extrabold text-[#1479FF]">
              AN UNSTOPPABLE CELEBRATION OF HUMAN SPIRIT.
            </div>

            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Every October, 25,000 feet hit the tarmac as the tech capital transforms into a high-octane stadium of endurance. From elite African champions chasing course records to weekend runners conquering their inaugural 10K, the Bengaluru Marathon is where perseverance meets pure celebration.
            </p>

            {/* 4 Feature Items */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-[#F5F7FA] border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white shadow-xs text-[#1479FF] flex items-center justify-center">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="font-heading font-bold text-sm text-[#071A33]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Section Statistics Grid */}
            <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-left">
                  <div className="font-heading font-black text-3xl sm:text-4xl text-[#071A33] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-bold text-xs text-slate-800 mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

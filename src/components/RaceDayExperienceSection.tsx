import React from 'react';
import {
  QrCode,
  Tent,
  Droplets,
  HeartPulse,
  Flag,
  Music2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export const RaceDayExperienceSection: React.FC<{ onExploreBib: () => void }> = ({
  onExploreBib,
}) => {
  const experiences = [
    {
      icon: QrCode,
      title: 'Bib Collection',
      tagline: 'Frictionless Expo Tech',
      description:
        'Instant biometric RFID bib pickup at Manpho Expo with digital QR scanning. Zero queues, custom timing chip testing, and instant personalized t-shirt fit.',
      actionText: 'Digital Bib Preview',
      action: onExploreBib,
    },
    {
      icon: Tent,
      title: 'Race Village',
      tagline: 'World-Class Athlete Arena',
      description:
        'State-of-the-art warmup facilities at Sree Kanteerava Stadium. Secure RFID luggage storage, warm tea stalls, dynamic stretch coaches, and elite gear tech zones.',
    },
    {
      icon: Droplets,
      title: 'Hydration & Nutrition',
      tagline: 'Every 1.5 KM',
      description:
        'Ice-cold bottled water, Enerzal electrolytes, chilled orange wedges, Fast&Up energy gels, and biodegradable sponge stations to keep your core temperature optimal.',
    },
    {
      icon: HeartPulse,
      title: 'Medical Support',
      tagline: 'Rapid Care Network',
      description:
        '14 full paramedic posts powered by Manipal Hospitals, 12 mobile cardiac bike ambulances with defibrillators, ice spray stations, and an 80-bed infield recovery ICU.',
    },
    {
      icon: Flag,
      title: 'Pacers',
      tagline: '100+ Goal Leaders',
      description:
        'Experienced national pacers equipped with glowing LED pace flags for targets ranging from 3:15 to 6:00. Pacing strategy bands distributed free at the expo.',
    },
    {
      icon: Music2,
      title: 'Entertainment',
      tagline: 'Live Rhythm & Cheers',
      description:
        'Bengaluru fusion drummers, college cheer squads, 15 DJ towers along the route, and a massive post-race concert on the stadium infield as you cross the finish line.',
    },
  ];

  return (
    <section id="race-day-experience-section" className="py-20 lg:py-28 bg-[#071A33] border-t border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6B2C]/15 border border-[#FF6B2C]/30 text-[#FF6B2C] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Athlete Experience
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-tight uppercase">
            RACE DAY, REIMAGINED.
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Every checkpoint, aid station, and volunteer touchpoint engineered for your ultimate personal best.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                id={`experience-card-${idx}`}
                className="group relative bg-gradient-to-b from-[#0c2340] to-[#081b33] rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-[#1479FF]/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Icon with glow */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-[#FF6B2C] group-hover:text-[#1479FF] group-hover:bg-[#1479FF]/10 transition-colors flex items-center justify-center mb-5">
                    <IconComp className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>

                  <div className="text-[11px] font-bold text-[#FFC857] uppercase tracking-wider mb-1">
                    {item.tagline}
                  </div>

                  <h3 className="font-heading font-black text-xl text-white group-hover:text-[#FF6B2C] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.actionText && (
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <button
                      onClick={item.action}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1479FF] hover:text-white transition-colors"
                    >
                      <span>{item.actionText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Subtle bottom border accent on hover */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#1479FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

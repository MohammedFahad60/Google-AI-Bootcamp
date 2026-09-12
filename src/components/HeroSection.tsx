import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Flame,
  Users,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
  onQuickTrackClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreClick,
  onQuickTrackClick,
}) => {
  // Animated live countdown: initialized at 42 days, 8 hours, 24 mins, 36 secs
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 8,
    minutes: 24,
    seconds: 36,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero-section" className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 pb-14 overflow-hidden bg-[#071A33]">
      {/* Cinematic Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=2000&q=85"
          alt="Marathon runners at sunrise on city road"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.62] contrast-[1.15]"
        />
        {/* Multi-tier gradient overlay for readability & brand atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/70 to-[#071A33]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/90 via-[#071A33]/40 to-transparent" />
        {/* Subtle energetic light accents */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FF6B2C]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-[#1479FF]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-3xl">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#FFC857] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
            <span className="tracking-wide uppercase">Official 12th Edition • Oct 18, 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A] animate-pulse"></span>
            <span className="text-white/80 font-normal">AIMS Certified</span>
          </div>

          {/* Main Headings */}
          <h1 className="font-heading font-black tracking-tight text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.05] uppercase">
            BENGALURU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#FF8D4D] to-[#FFC857]">
              MARATHON 2026
            </span>
          </h1>

          {/* Tagline */}
          <div className="mt-4 font-heading font-extrabold text-2xl sm:text-3xl text-slate-100 tracking-wider uppercase flex items-center gap-3">
            <span>RUN THE CITY.</span>
            <span className="text-[#1479FF]">OWN YOUR STORY.</span>
          </div>

          <p className="mt-3 text-lg sm:text-xl text-slate-300 font-normal max-w-2xl leading-relaxed">
            India's premier city marathon experience. Conquer the tree-lined avenues of Cubbon Park, the grand colonnade of Vidhana Soudha, and the historic finish at Sree Kanteerava Stadium.
          </p>

          {/* Race Distance Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-white">
            <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/15">42.2 KM Full</span>
            <span className="text-slate-400">•</span>
            <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/15">21.1 KM Half</span>
            <span className="text-slate-400">•</span>
            <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/15">10K Challenge</span>
            <span className="text-slate-400">•</span>
            <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/15">5K Fun Run</span>
          </div>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              id="hero-register-btn"
              onClick={onRegisterClick}
              className="px-8 py-4 rounded-xl font-heading font-bold text-base text-white bg-gradient-to-r from-[#FF6B2C] to-[#ff844f] hover:from-[#f05a18] hover:to-[#ff6b2c] shadow-xl shadow-[#FF6B2C]/30 hover:shadow-2xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2.5"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="px-7 py-4 rounded-xl font-heading font-bold text-base text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>EXPLORE THE RACE</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              id="hero-track-btn"
              onClick={onQuickTrackClick}
              className="sm:hidden px-6 py-3.5 rounded-xl font-medium text-sm text-[#FFC857] bg-[#FFC857]/10 border border-[#FFC857]/30 text-center"
            >
              Live Runner Tracking →
            </button>
          </div>
        </div>

        {/* Animated Countdown Timer */}
        <div className="mt-12 lg:mt-14 pt-8 border-t border-white/15">
          <div className="text-xs uppercase tracking-widest text-slate-300 font-bold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-ping" />
            RACE DAY COUNTDOWN
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl">
            {/* Days */}
            <div className="bg-[#071A33]/80 backdrop-blur-md border border-white/15 rounded-xl p-3 sm:p-4 text-center shadow-lg">
              <div className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-slate-300 mt-1">
                DAYS
              </div>
            </div>

            {/* Hours */}
            <div className="bg-[#071A33]/80 backdrop-blur-md border border-white/15 rounded-xl p-3 sm:p-4 text-center shadow-lg">
              <div className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-slate-300 mt-1">
                HOURS
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-[#071A33]/80 backdrop-blur-md border border-white/15 rounded-xl p-3 sm:p-4 text-center shadow-lg">
              <div className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-slate-300 mt-1">
                MINUTES
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-[#071A33]/80 backdrop-blur-md border border-[#FF6B2C]/40 rounded-xl p-3 sm:p-4 text-center shadow-lg relative overflow-hidden">
              <div className="font-heading font-black text-2xl sm:text-4xl text-[#FF6B2C] tracking-tight animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-slate-300 mt-1">
                SECONDS
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B2C]" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick Event Info Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 border border-slate-100 p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {/* Race Day */}
          <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-3">
            <div className="w-12 h-12 rounded-xl bg-[#1479FF]/10 text-[#1479FF] flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Race Day</div>
              <div className="text-base sm:text-lg font-heading font-black text-slate-900 leading-tight">
                Oct 18, 2026
              </div>
              <div className="text-xs text-slate-500 font-medium">Sunday 04:45 AM</div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-3">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B2C]/10 text-[#FF6B2C] flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Start & Finish</div>
              <div className="text-base sm:text-lg font-heading font-black text-slate-900 leading-tight">
                Sree Kanteerava
              </div>
              <div className="text-xs text-slate-500 font-medium">Bengaluru, Karnataka</div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-3">
            <div className="w-12 h-12 rounded-xl bg-[#12B76A]/10 text-[#12B76A] flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Distances</div>
              <div className="text-base sm:text-lg font-heading font-black text-slate-900 leading-tight">
                4 Categories
              </div>
              <div className="text-xs text-slate-500 font-medium">42.2K • 21.1K • 10K • 5K</div>
            </div>
          </div>

          {/* Runners Count */}
          <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-3">
            <div className="w-12 h-12 rounded-xl bg-[#FFC857]/20 text-amber-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Participation</div>
              <div className="text-base sm:text-lg font-heading font-black text-slate-900 leading-tight">
                25,000+ Runners
              </div>
              <div className="text-xs text-slate-500 font-medium">From 50+ Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

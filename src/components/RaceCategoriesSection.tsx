import React from 'react';
import {
  Clock,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { RACE_CATEGORIES_DATA } from '../data/mockData';
import { RaceCategory } from '../types';

interface RaceCategoriesSectionProps {
  onSelectCategory: (category: RaceCategory) => void;
}

export const RaceCategoriesSection: React.FC<RaceCategoriesSectionProps> = ({
  onSelectCategory,
}) => {
  // Category images for visual distinction
  const categoryImages: Record<RaceCategory, string> = {
    full: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    half: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=800&q=80',
    '10k': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    'fun_5k': 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=800&q=80',
  };

  const difficultyColors = {
    'Challenging': 'bg-rose-100 text-rose-800 border-rose-200',
    'Advanced': 'bg-orange-100 text-orange-800 border-orange-200',
    'Intermediate': 'bg-blue-100 text-blue-800 border-blue-200',
    'Beginner Friendly': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  return (
    <section id="race-categories-section" className="py-20 lg:py-28 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1479FF]/10 text-[#1479FF] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Official Race Categories
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#071A33] tracking-tight uppercase">
            CHOOSE YOUR CHALLENGE
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-slate-600 font-medium italic">
            "Every distance has a story. What's yours?"
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {RACE_CATEGORIES_DATA.map((race) => {
            const isFull = race.id === 'full';
            const isHalf = race.id === 'half';

            return (
              <div
                key={race.id}
                id={`race-card-${race.id}`}
                className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                  isHalf
                    ? 'border-[#1479FF] shadow-xl shadow-[#1479FF]/10 ring-2 ring-[#1479FF]/20 -translate-y-1'
                    : isFull
                    ? 'border-slate-200 hover:border-[#FF6B2C] shadow-lg hover:shadow-xl hover:-translate-y-1'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Popular Badge */}
                {isHalf && (
                  <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-[#1479FF] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}
                {isFull && (
                  <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-[#FF6B2C] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                    Premier 42.2K
                  </div>
                )}

                {/* Card Top Visual */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={categoryImages[race.id]}
                    alt={race.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/40 to-transparent" />

                  {/* Distance Pill in image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFC857]">
                        DISTANCE
                      </span>
                      <div className="font-heading font-black text-3xl text-white leading-none">
                        {race.distanceLabel}
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                        difficultyColors[race.difficulty]
                      }`}
                    >
                      {race.difficulty}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-black text-xl text-[#071A33] group-hover:text-[#1479FF] transition-colors">
                      {race.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#FF6B2C] italic mt-0.5">
                      "{race.tagline}"
                    </div>

                    <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {race.description}
                    </p>

                    {/* Metadata Specs */}
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <Clock className="w-3.5 h-3.5" /> Start Time
                        </span>
                        <span className="font-bold text-slate-800">{race.startTime}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <TrendingUp className="w-3.5 h-3.5" /> Elevation Gain
                        </span>
                        <span className="font-bold text-slate-800">+{race.elevationGainM}m</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <Award className="w-3.5 h-3.5" /> Course Limit
                        </span>
                        <span className="font-bold text-slate-800">{race.timeLimit}</span>
                      </div>
                    </div>

                    {/* Inclusions Highlights */}
                    <div className="mt-4 space-y-1">
                      {race.inclusions.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <CheckCircle2 className="w-3 h-3 text-[#12B76A] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom / Price & CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Entry Fee</span>
                        <div className="font-heading font-black text-2xl text-slate-900">
                          ₹{race.feeINR.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          race.status === 'Fast Filling' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {race.status}
                        </span>
                        <div className="text-[10px] text-slate-600 mt-0.5 font-medium">
                          {race.slotsRemaining} slots left
                        </div>
                      </div>
                    </div>

                    <button
                      id={`btn-register-cat-${race.id}`}
                      onClick={() => onSelectCategory(race.id)}
                      className={`w-full py-3 rounded-xl font-heading font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                        isHalf
                          ? 'bg-[#1479FF] hover:bg-blue-600 text-white shadow-md shadow-[#1479FF]/30'
                          : isFull
                          ? 'bg-[#071A33] hover:bg-[#FF6B2C] text-white shadow-md'
                          : 'bg-slate-900 hover:bg-[#1479FF] text-white'
                      }`}
                    >
                      <span>Register for {race.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

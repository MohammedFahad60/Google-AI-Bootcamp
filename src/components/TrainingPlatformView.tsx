import React, { useState } from 'react';
import {
  TrendingUp,
  Play,
  Flame,
  Award,
  Calendar,
  Heart,
  Activity,
  CheckCircle,
  Lightbulb,
  Pause,
  RotateCcw,
  X,
} from 'lucide-react';
import { TRAINING_PLANS } from '../data/mockData';
import { TrainingPlan } from '../types';

export const TrainingPlatformView: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlan>(TRAINING_PLANS[0]);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Timer simulation
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const weeklyMileageData = [
    { week: 'W1', km: 28 },
    { week: 'W2', km: 34 },
    { week: 'W3', km: 38 },
    { week: 'W4', km: 32 }, // Recovery week
    { week: 'W5', km: 44 },
    { week: 'W6', km: 48 },
    { week: 'W7', km: 52 },
    { week: 'W8', km: 46 }, // Current week
    { week: 'W9', km: 56 },
    { week: 'W10', km: 58 },
    { week: 'W11', km: 40 }, // Taper 1
    { week: 'W12', km: 22 }, // Race week
  ];

  return (
    <div id="training-platform-page" className="py-12 lg:py-16 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1479FF]/10 text-[#1479FF] text-xs font-bold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            Official Marathon Preparation Platform
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#071A33] tracking-tight uppercase">
            TRAIN SMARTER. RUN STRONGER.
          </h1>
          <p className="mt-2 text-slate-600 text-base">
            Curated training curriculums designed by Bengaluru marathon coaches and sports physiologists to help you peak on October 18.
          </p>
        </div>

        {/* Featured Workout Card */}
        <div className="mt-10 bg-gradient-to-r from-[#071A33] via-[#0b2447] to-[#071A33] rounded-2xl p-6 sm:p-8 text-white border border-white/10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B2C] uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4" /> TODAY'S RECOMMENDED WORKOUT
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl">
                LONG RUN — 18 KM
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400">Target Pace: </span>
                  <span className="font-bold text-white">5:45 – 6:00 / KM</span>
                </div>
                <div>•</div>
                <div>
                  <span className="text-slate-400">Duration: </span>
                  <span className="font-bold text-white">1h 48m</span>
                </div>
                <div>•</div>
                <div>
                  <span className="text-slate-400">Zone: </span>
                  <span className="font-bold text-[#12B76A]">Aerobic Endurance (Zone 2)</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-2 max-w-xl">
                Practice your race-day nutrition strategy. Take 1 carb gel at 7 KM and 14 KM with 150ml water. Maintain relaxed shoulders throughout Cubbon inclines.
              </p>
            </div>

            <button
              id="btn-start-workout-session"
              onClick={() => setIsWorkoutModalOpen(true)}
              className="px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-[#FF6B2C] hover:bg-[#f05a18] shadow-lg shadow-[#FF6B2C]/30 transition-all flex items-center justify-center gap-2.5 active:scale-95 shrink-0"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>START WORKOUT</span>
            </button>
          </div>
        </div>

        {/* Training Plan Selection Cards */}
        <div className="mt-12">
          <h2 className="font-heading font-black text-2xl text-[#071A33] mb-6">
            SELECT YOUR TRAINING PLAN
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINING_PLANS.map((plan) => {
              const isSelected = selectedPlan.id === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`cursor-pointer rounded-2xl p-6 bg-white border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#1479FF] ring-2 ring-[#1479FF]/20 shadow-lg -translate-y-1'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3 ${
                        plan.level === 'First Marathon'
                          ? 'bg-amber-100 text-amber-800'
                          : plan.level === 'Advanced'
                          ? 'bg-purple-100 text-purple-800'
                          : plan.level === 'Intermediate'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {plan.level}
                    </span>

                    <h3 className="font-heading font-black text-xl text-[#071A33]">
                      {plan.title}
                    </h3>

                    <div className="mt-2 text-xs text-slate-500 font-medium">
                      {plan.durationWeeks} Weeks • {plan.weeklyMileageKm}
                    </div>

                    <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className={isSelected ? 'text-[#1479FF]' : 'text-slate-500'}>
                      {isSelected ? '✓ Active Plan' : 'Select Plan'}
                    </span>
                    <span className="text-slate-400">View Curriculum →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analytics & Charts Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Weekly Mileage Chart (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-heading font-black text-lg text-[#071A33]">
                  WEEKLY MILEAGE PROGRESSION
                </h3>
                <p className="text-xs text-slate-500">12-Week Periodized Macrocycle</p>
              </div>
              <span className="text-xs font-bold text-[#1479FF]">Current: Week 8 (46 KM)</span>
            </div>

            {/* Custom Bar Chart */}
            <div className="mt-6 h-52 flex items-end justify-between gap-2 pt-4">
              {weeklyMileageData.map((item, idx) => {
                const heightPercent = (item.km / 60) * 100;
                const isCurrent = item.week === 'W8';
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                      {item.km}
                    </span>
                    <div className="w-full bg-slate-100 rounded-t-md relative flex items-end h-40">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          isCurrent
                            ? 'bg-[#FF6B2C]'
                            : idx < 7
                            ? 'bg-[#1479FF]'
                            : 'bg-slate-300'
                        }`}
                      />
                    </div>
                    <span className={`text-[10px] font-mono font-bold mt-1 ${isCurrent ? 'text-[#FF6B2C]' : 'text-slate-600'}`}>
                      {item.week}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-[11px] font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#1479FF]" /> Completed Weeks
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#FF6B2C]" /> Current Week
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-300" /> Taper & Race Weeks
              </span>
            </div>
          </div>

          {/* Training Load & Heart Rate Metrics (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Heart Rate Zones */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-heading font-black text-lg text-[#071A33] mb-4 flex items-center justify-between">
                <span>HEART RATE DISTRIBUTION</span>
                <Heart className="w-4 h-4 text-rose-500" />
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Zone 2 (Aerobic Base 130-145 BPM)</span>
                    <span className="text-[#12B76A]">65% (Optimal)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[65%] h-full bg-[#12B76A] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Zone 3 (Tempo / Marathon Pace 146-160 BPM)</span>
                    <span className="text-[#1479FF]">20%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[20%] h-full bg-[#1479FF] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Zone 4 (Threshold Intervals 161-175 BPM)</span>
                    <span className="text-[#FF6B2C]">15%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[15%] h-full bg-[#FF6B2C] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Coach's Tip */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" /> COACH'S TIP OF THE WEEK
              </div>
              <h4 className="font-heading font-bold text-base text-slate-900">
                Mastering the Bengaluru Weather & Hydration
              </h4>
              <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                "Bengaluru mornings are deceivingly dry and cool. You won't feel sweat dripping early on due to the light breeze, but dehydration quietly creeps up by kilometer 18. Sip 100ml of electrolytes at every station regardless of thirst."
              </p>
              <div className="mt-3 text-[11px] font-bold text-slate-500">
                — Coach Thomas Cherian, High Performance Director
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Interactive Workout Session Modal */}
      {isWorkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#071A33] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white shadow-2xl relative">
            <button
              onClick={() => setIsWorkoutModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-xs font-bold text-[#FF6B2C] uppercase tracking-wider">
                ACTIVE WORKOUT SIMULATOR
              </span>
              <h3 className="font-heading font-black text-2xl mt-1">18 KM Long Run</h3>
              <p className="text-xs text-slate-300 mt-1">Target Pace: 5:45 - 6:00 / KM</p>

              {/* Digital Timer */}
              <div className="my-8 py-6 rounded-2xl bg-[#0c2340] border border-white/10 text-center">
                <div className="font-mono font-black text-5xl sm:text-6xl text-white tracking-wider">
                  {formatTimer(elapsedSeconds)}
                </div>
                <div className="text-xs text-[#1479FF] font-semibold mt-2">
                  {isTimerRunning ? 'Session in progress...' : 'Paused'}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-6 py-3 rounded-xl font-heading font-bold text-sm flex items-center gap-2 ${
                    isTimerRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-[#12B76A] hover:bg-emerald-600 text-white'
                  }`}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-4 h-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" /> Resume / Start
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setElapsedSeconds(0);
                  }}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400">
                Connected to Garmin / Apple Watch sync. Keep phone unlocked during run.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import {
  Calendar,
  Flame,
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  QrCode,
  ArrowRight,
  ShieldAlert,
  Download,
} from 'lucide-react';

interface RunnerDashboardViewProps {
  onOpenDigitalBib: () => void;
  onOpenTraining: () => void;
}

export const RunnerDashboardView: React.FC<RunnerDashboardViewProps> = ({
  onOpenDigitalBib,
  onOpenTraining,
}) => {
  const weeklySchedule = [
    { day: 'MON', title: 'Easy Run', status: 'completed', distance: '8 KM', notes: 'Done @ 5:30/km' },
    { day: 'TUE', title: 'Rest & Mobility', status: 'completed', distance: '-', notes: 'Stretching & foam roller' },
    { day: 'WED', title: 'Intervals', status: 'completed', distance: '10 KM', notes: '5x1000m fast pace' },
    { day: 'THU', title: 'Recovery Run', status: 'today', distance: '6 KM', notes: 'Zone 2 aerobic today' },
    { day: 'FRI', title: 'Rest Day', status: 'upcoming', distance: '-', notes: 'Hydration focus' },
    { day: 'SAT', title: 'Long Run', status: 'upcoming', distance: '18 KM', notes: 'Target pace simulation' },
    { day: 'SUN', title: 'Active Recovery', status: 'upcoming', distance: '4 KM', notes: 'Walk or gentle spin' },
  ];

  const stats = [
    { label: 'Training Distance', value: '248.6 KM', sub: '+32 KM this week', color: 'text-[#1479FF]' },
    { label: 'Runs Completed', value: '28 Runs', sub: 'Target: 40 runs', color: 'text-slate-900' },
    { label: 'Average Pace', value: '5:18 / KM', sub: 'Target race: 5:10', color: 'text-[#FF6B2C]' },
    { label: 'Longest Run', value: '18.5 KM', sub: 'Cubbon Park Loop', color: 'text-[#12B76A]' },
    { label: 'Training Streak', value: '5 Weeks', sub: 'Zero missed sessions', color: 'text-[#FFC857]' },
  ];

  return (
    <div id="runner-dashboard-page" className="py-12 lg:py-16 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Greeting Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold text-[#1479FF] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#12B76A]" /> Registered Athlete
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#071A33] tracking-tight">
              Good morning, Arjun 👋
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Your race is <span className="font-bold text-[#FF6B2C]">42 days away</span>. Keep the momentum going!
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2.5">
            <button
              id="dash-btn-digital-bib"
              onClick={onOpenDigitalBib}
              className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-white bg-[#071A33] hover:bg-[#1479FF] shadow-sm transition-all flex items-center gap-2"
            >
              <QrCode className="w-4 h-4 text-[#FFC857]" />
              <span>View Digital Bib</span>
            </button>
            <button
              id="dash-btn-training"
              onClick={onOpenTraining}
              className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all flex items-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4 text-[#FF6B2C]" />
              <span>Training Hub</span>
            </button>
          </div>
        </div>

        {/* Hero Dashboard Card: Confirmed Registration */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#071A33] via-[#0c2340] to-[#071A33] p-6 sm:p-8 text-white border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Background ambient accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#1479FF]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-20 w-60 h-60 bg-[#FF6B2C]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#FFC857] uppercase tracking-wider mb-2">
                <Flame className="w-4 h-4 text-[#FF6B2C]" />
                BENGALURU MARATHON 2026
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-4xl">
                Half Marathon • 21.1 KM
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Start: Sree Kanteerava Stadium • Sunday, Oct 18, 2026 • Wave 2 (05:30 AM IST) • Corral B
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1 text-[#12B76A]">
                  <CheckCircle2 className="w-4 h-4" /> Registration Confirmed
                </div>
                <div className="text-slate-400">•</div>
                <div className="text-slate-300">RFID Bib #BGL10248</div>
                <div className="text-slate-400">•</div>
                <div className="text-slate-300">T-Shirt Size: M (Pro Fit)</div>
              </div>
            </div>

            {/* Quick Bib Card Graphic */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 text-center min-w-[200px]">
              <div className="text-[10px] uppercase font-bold text-slate-300">Official Bib Number</div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-[#FFC857] tracking-wider my-1">
                10248
              </div>
              <div className="text-[11px] font-bold text-white bg-[#1479FF] py-0.5 rounded uppercase">
                HALF MARATHON
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Statistics Row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="text-xs text-slate-500 font-semibold">{s.label}</div>
              <div className={`font-heading font-black text-2xl sm:text-3xl mt-1 ${s.color}`}>
                {s.value}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Training Plan Weekly Calendar */}
        <div className="mt-10 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="text-xs font-bold text-[#FF6B2C] uppercase tracking-wider">
                WEEK 8 OF 12
              </div>
              <h3 className="font-heading font-black text-xl text-[#071A33]">
                YOUR TRAINING PLAN (THIS WEEK)
              </h3>
            </div>
            <button
              onClick={onOpenTraining}
              className="text-xs font-bold text-[#1479FF] hover:underline flex items-center gap-1"
            >
              <span>Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Weekly Days Grid */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weeklySchedule.map((item, idx) => {
              const isToday = item.status === 'today';
              const isDone = item.status === 'completed';

              return (
                <div
                  key={idx}
                  className={`rounded-xl p-3.5 border transition-all ${
                    isToday
                      ? 'bg-[#1479FF]/10 border-[#1479FF] ring-2 ring-[#1479FF]/20 shadow-xs'
                      : isDone
                      ? 'bg-slate-50 border-slate-200 opacity-90'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-xs text-slate-700">
                      {item.day}
                    </span>
                    {isDone ? (
                      <span className="text-[11px] font-bold text-[#12B76A]">✓ Done</span>
                    ) : isToday ? (
                      <span className="text-[10px] font-black uppercase text-white bg-[#1479FF] px-1.5 py-0.5 rounded">
                        Today
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-600 font-medium">Pending</span>
                    )}
                  </div>

                  <div className="font-heading font-bold text-sm text-slate-900 mt-2">
                    {item.title}
                  </div>

                  {item.distance !== '-' && (
                    <div className="text-xs font-bold text-[#FF6B2C] mt-0.5">
                      {item.distance}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {item.notes}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

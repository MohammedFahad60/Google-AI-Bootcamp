import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Share2,
  Heart,
  Flame,
  Activity,
  CheckCircle2,
  Clock,
  Compass,
  Trophy,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OTHER_RUNNERS_LIST } from '../data/mockData';
import { RunnerTrackingData } from '../types';

export const LiveTrackingView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('BGL10248');
  const [activeRunner, setActiveRunner] = useState<RunnerTrackingData>(OTHER_RUNNERS_LIST[0]);
  const [cheers, setCheers] = useState<number>(OTHER_RUNNERS_LIST[0].cheersCount);
  const [hasCheered, setHasCheered] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return;

    const found = OTHER_RUNNERS_LIST.find(
      (r) =>
        r.bib.toLowerCase().includes(cleanQuery) ||
        r.name.toLowerCase().includes(cleanQuery)
    );

    if (found) {
      setActiveRunner(found);
      setCheers(found.cheersCount);
      setHasCheered(false);
      setSearchError(null);
    } else {
      setSearchError(`No runner found matching "${query}". Try "BGL10248" or "Ananya Rao".`);
    }
  };

  const handleCheer = () => {
    setCheers((prev) => prev + 1);
    setHasCheered(true);

    // Launch celebratory confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FF6B2C', '#1479FF', '#FFC857', '#12B76A'],
    });
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/?track=${activeRunner.bib}`;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const progressPercent = Math.min(
    100,
    Math.round((activeRunner.distanceCoveredKm / activeRunner.totalDistanceKm) * 100)
  );

  return (
    <div id="live-tracking-page" className="py-12 lg:py-16 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12B76A]/10 text-[#12B76A] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#12B76A] animate-ping" />
            Live Mat Timing Active
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#071A33] tracking-tight uppercase">
            LIVE RACE TRACKING
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Track your favorite runners in real-time along the 42.2K & 21.1K course. Check split times, estimated finish, and send live cheers.
          </p>
        </div>

        {/* Runner Search Bar */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="live-runner-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search runner by name or bib number (e.g. BGL10248)..."
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-slate-200 focus:border-[#1479FF] focus:ring-2 focus:ring-[#1479FF]/20 shadow-sm text-sm text-slate-900 font-medium outline-none transition-all"
            />
          </div>

          {/* Quick Runner Chips */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-600 font-semibold">Try sample:</span>
            {OTHER_RUNNERS_LIST.map((r) => (
              <button
                key={r.bib}
                onClick={() => handleSearch(r.bib)}
                className={`px-2.5 py-1 rounded-full border text-xs font-bold transition-colors ${
                  activeRunner.bib === r.bib
                    ? 'bg-[#1479FF] text-white border-[#1479FF]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {r.name} ({r.bib})
              </button>
            ))}
          </div>

          {/* Error Message */}
          {searchError && (
            <div className="mt-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 text-center font-medium">
              {searchError}
            </div>
          )}
        </div>

        {/* Active Tracked Runner Interface */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Visual Course Tracking Map (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xl p-5 sm:p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A] animate-pulse" />
                <span className="font-heading font-black text-sm text-[#071A33] uppercase">
                  Live Course Position
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Last Mat: {activeRunner.lastCheckpoint}
              </span>
            </div>

            {/* Map Canvas with Runner Coordinates */}
            <div className="relative mt-4 w-full h-80 sm:h-96 bg-[#071A33] rounded-xl overflow-hidden flex items-center justify-center p-4">
              {/* Map Grid Texture */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #1479ff 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Landmark zones */}
              <div className="absolute top-8 left-10 text-[10px] font-bold text-emerald-400 opacity-60 uppercase">
                Cubbon Park
              </div>
              <div className="absolute top-6 right-12 text-[10px] font-bold text-cyan-400 opacity-60 uppercase">
                Ulsoor Lake
              </div>
              <div className="absolute bottom-8 left-16 text-[10px] font-bold text-[#FFC857] opacity-60 uppercase">
                Kanteerava Stadium
              </div>

              {/* Course Route Curve SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 20 75 Q 30 50 45 35 T 75 45 T 70 75 T 20 75"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M 20 75 Q 30 50 45 35 T 75 45 T 70 75 T 20 75"
                  fill="none"
                  stroke="#1479FF"
                  strokeWidth="3"
                  strokeDasharray={`${progressPercent * 2} 200`}
                  strokeLinecap="round"
                />
              </svg>

              {/* Runner Live Icon positioned proportionally on track */}
              <div
                style={{
                  left: `${20 + (progressPercent / 100) * 55}%`,
                  top: `${75 - Math.sin((progressPercent / 100) * Math.PI) * 40}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700"
              >
                <div className="relative group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B2C] text-white flex items-center justify-center shadow-2xl ring-4 ring-[#FF6B2C]/40 animate-bounce">
                    <Flame className="w-5 h-5 fill-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                    {activeRunner.name} ({activeRunner.distanceCoveredKm} KM)
                  </div>
                </div>
              </div>

              {/* Start & Finish Pins */}
              <div className="absolute left-[20%] top-[75%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-[#12B76A] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  S
                </div>
              </div>
              <div className="absolute left-[22%] top-[78%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-[#FF6B2C] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  F
                </div>
              </div>
            </div>

            {/* Visual Race Progress Timeline */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                <span>COURSE PROGRESS</span>
                <span className="text-[#1479FF]">{progressPercent}% COMPLETED</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-5">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-[#1479FF] to-[#FF6B2C] transition-all duration-500 rounded-full"
                />
              </div>

              {/* Checkpoints Sequence */}
              <div className="grid grid-cols-6 gap-1 text-center">
                {activeRunner.splits.map((split, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        split.passed
                          ? 'bg-[#12B76A] text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {split.passed ? '✓' : idx}
                    </div>
                    <div className="text-[10px] font-bold text-slate-800 mt-1 truncate max-w-full">
                      {split.km === 0 ? 'START' : `${split.km}K`}
                    </div>
                    <div className="text-[9px] text-slate-600 truncate font-mono">
                      {split.splitTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Runner Information Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 relative">
              {/* Runner Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1479FF]/10 text-[#1479FF] text-[11px] font-bold uppercase tracking-wider">
                    BIB #{activeRunner.bib}
                  </span>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#071A33] mt-1">
                    {activeRunner.name}
                  </h2>
                  <div className="text-xs text-slate-500 font-medium">
                    {activeRunner.city} • {activeRunner.ageGroup}
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    activeRunner.status === 'Finished'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {activeRunner.status}
                </span>
              </div>

              {/* Runner Key Metrics Grid */}
              <div className="mt-6 grid grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-[#F5F7FA] border border-slate-100">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Distance Covered</div>
                  <div className="font-heading font-black text-2xl text-slate-900 mt-0.5">
                    {activeRunner.distanceCoveredKm}{' '}
                    <span className="text-sm font-normal text-slate-500">
                      / {activeRunner.totalDistanceKm} KM
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F7FA] border border-slate-100">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Current Pace</div>
                  <div className="font-heading font-black text-2xl text-[#1479FF] mt-0.5">
                    {activeRunner.currentPace}
                  </div>
                  <div className="text-[10px] text-slate-600">Avg: {activeRunner.avgPace}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F7FA] border border-slate-100">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Est. Finish Time</div>
                  <div className="font-heading font-black text-xl text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#FF6B2C]" />
                    {activeRunner.estimatedFinishTime}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F7FA] border border-slate-100">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Current Position</div>
                  <div className="font-heading font-black text-xl text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-[#FFC857]" />
                    #{activeRunner.currentPosition.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-600">
                    Category: #{activeRunner.categoryPosition}
                  </div>
                </div>
              </div>

              {/* Interactive Cheer Button with Counter */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-3">
                <button
                  id="btn-cheer-runner"
                  onClick={handleCheer}
                  className="w-full py-3.5 px-4 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-[#FF6B2C] to-[#ff844f] hover:from-[#f05a18] hover:to-[#ff6b2c] shadow-lg shadow-[#FF6B2C]/25 transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Heart className={`w-5 h-5 ${hasCheered ? 'fill-white animate-pulse' : ''}`} />
                  <span>CHEER FOR {activeRunner.name.toUpperCase()}</span>
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                    {cheers} Cheers
                  </span>
                </button>

                {/* Shareable Runner Tracking Link UI */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-600 truncate">
                    <span className="font-bold text-slate-700">Share Link: </span>
                    blr26.run/track/{activeRunner.bib}
                  </div>
                  <button
                    id="btn-copy-share-track"
                    onClick={handleCopyLink}
                    className="shrink-0 p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#1479FF] transition-colors text-xs font-semibold flex items-center gap-1"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#12B76A]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

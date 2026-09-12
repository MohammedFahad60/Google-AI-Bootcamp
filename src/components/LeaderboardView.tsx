import React, { useState } from 'react';
import { Trophy, Medal, Search, Filter, Globe, Sparkles } from 'lucide-react';
import { FULL_LEADERBOARD, PODIUM_RUNNERS } from '../data/mockData';
import { LeaderboardEntry } from '../types';

export const LeaderboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Overall' | 'Men' | 'Women' | 'Age Group' | 'Corporate'>('Overall');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredEntries = FULL_LEADERBOARD.filter((entry) => {
    if (activeTab === 'Men' && entry.gender !== 'M') return false;
    if (activeTab === 'Women' && entry.gender !== 'F') return false;

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        entry.name.toLowerCase().includes(q) ||
        entry.bib.toLowerCase().includes(q) ||
        entry.country.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div id="leaderboard-page" className="py-12 lg:py-16 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC857]/20 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            Official Race Standings
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#071A33] tracking-tight uppercase">
            RACE LEADERBOARD
          </h1>
          <p className="mt-2 text-slate-600 text-base">
            Live chip-timed provisional and official standings for the 2026 Bengaluru Marathon.
          </p>
        </div>

        {/* Impressive Visual Podium for 1st, 2nd, and 3rd Places */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-end">
            {/* Silver / 2nd Place */}
            <div className="order-2 sm:order-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-md text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-xl mb-3 shadow-sm">
                🥈
              </div>
              <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                Rank 02 • Silver
              </span>
              <h3 className="font-heading font-black text-lg text-[#071A33] mt-1">
                {PODIUM_RUNNERS.second.name}
              </h3>
              <div className="text-xs text-slate-500 font-medium">
                {PODIUM_RUNNERS.second.country} ({PODIUM_RUNNERS.second.countryCode}) • #{PODIUM_RUNNERS.second.bib}
              </div>
              <div className="font-mono font-black text-2xl text-[#1479FF] mt-3">
                {PODIUM_RUNNERS.second.chipTime}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Pace: {PODIUM_RUNNERS.second.pace}
              </div>
            </div>

            {/* Gold / 1st Place (Taller & Highlighted) */}
            <div className="order-1 sm:order-2 bg-gradient-to-b from-[#071A33] to-[#0c2340] text-white rounded-3xl p-7 border border-[#FFC857]/40 shadow-2xl text-center flex flex-col items-center sm:-translate-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC857]/10 rounded-full blur-2xl" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFC857] to-amber-500 flex items-center justify-center text-2xl mb-3 shadow-lg ring-4 ring-[#FFC857]/30">
                🥇
              </div>
              <span className="text-xs font-black uppercase text-[#FFC857] tracking-wider">
                CHAMPION • 1ST PLACE
              </span>
              <h2 className="font-heading font-black text-2xl text-white mt-1">
                {PODIUM_RUNNERS.first.name}
              </h2>
              <div className="text-xs text-slate-300 font-medium">
                {PODIUM_RUNNERS.first.country} ({PODIUM_RUNNERS.first.countryCode}) • #{PODIUM_RUNNERS.first.bib}
              </div>
              <div className="font-mono font-black text-3xl text-[#FFC857] mt-3">
                {PODIUM_RUNNERS.first.chipTime}
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                Pace: {PODIUM_RUNNERS.first.pace}
              </div>
            </div>

            {/* Bronze / 3rd Place */}
            <div className="order-3 bg-white rounded-2xl p-6 border border-slate-200 shadow-md text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-50 border-2 border-amber-600/30 flex items-center justify-center text-xl mb-3 shadow-sm">
                🥉
              </div>
              <span className="text-[11px] font-extrabold uppercase text-amber-700/60 tracking-wider">
                Rank 03 • Bronze
              </span>
              <h3 className="font-heading font-black text-lg text-[#071A33] mt-1">
                {PODIUM_RUNNERS.third.name}
              </h3>
              <div className="text-xs text-slate-500 font-medium">
                {PODIUM_RUNNERS.third.country} ({PODIUM_RUNNERS.third.countryCode}) • #{PODIUM_RUNNERS.third.bib}
              </div>
              <div className="font-mono font-black text-2xl text-[#FF6B2C] mt-3">
                {PODIUM_RUNNERS.third.chipTime}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Pace: {PODIUM_RUNNERS.third.pace}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mt-14 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-xs">
            {(['Overall', 'Men', 'Women', 'Age Group', 'Corporate'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-[#071A33] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Table */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by name, bib, country..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:border-[#1479FF] outline-none"
            />
          </div>
        </div>

        {/* Modern Leaderboard Table */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#071A33] text-white text-xs font-heading font-black uppercase tracking-wider">
                  <th className="py-4 px-5">Rank</th>
                  <th className="py-4 px-5">Runner Name</th>
                  <th className="py-4 px-4">Bib</th>
                  <th className="py-4 px-4">Country</th>
                  <th className="py-4 px-5 text-right">Chip Time</th>
                  <th className="py-4 px-5 text-right">Pace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {filteredEntries.map((entry) => (
                  <tr
                    key={entry.bib}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-4 px-5 font-bold font-mono">
                      {entry.rank === 1 && '🥇 01'}
                      {entry.rank === 2 && '🥈 02'}
                      {entry.rank === 3 && '🥉 03'}
                      {entry.rank > 3 && String(entry.rank).padStart(2, '0')}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-heading font-bold text-sm text-[#071A33]">
                        {entry.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {entry.ageGroup} • {entry.gender === 'M' ? 'Men' : 'Women'}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-slate-600">
                      #{entry.bib}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        {entry.country}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right font-mono font-bold text-sm text-[#071A33]">
                      {entry.chipTime}
                    </td>
                    <td className="py-4 px-5 text-right font-mono text-slate-600">
                      {entry.pace}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

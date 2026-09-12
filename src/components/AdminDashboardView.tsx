import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Activity,
  Droplets,
  Radio,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  Send,
  Flag,
} from 'lucide-react';
import { ADMIN_STATS } from '../data/mockData';

export const AdminDashboardView: React.FC = () => {
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [waveStatus, setWaveStatus] = useState({
    wave1: 'Finished',
    wave2: 'On Course',
    wave3: 'Corral Staged',
    wave4: 'Staging 06:15 AM',
  });

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setActiveAlert(`Broadcast sent to all 38,420 runners: "${broadcastMessage}"`);
    setBroadcastMessage('');
    setTimeout(() => setActiveAlert(null), 5000);
  };

  return (
    <div id="admin-dashboard-page" className="py-12 lg:py-16 bg-[#071A33] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12B76A]/20 border border-[#12B76A]/40 text-[#12B76A] text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#12B76A] animate-ping" />
              RACE CONTROL CENTER ACTIVE • LIVE TELEMETRY
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl tracking-tight">
              EVENT OPERATIONS & DISPATCH
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Bengaluru City Police, BBMP, Ambulance Fleet & Timing Mesh Network
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Course Safety</span>
              <div className="text-xs font-bold text-[#12B76A] flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-[#12B76A]" /> ALL SECTORS GREEN
              </div>
            </div>
          </div>
        </div>

        {/* Global Broadcast Banner */}
        {activeAlert && (
          <div className="mt-6 p-4 rounded-xl bg-[#12B76A]/20 border border-[#12B76A]/50 text-white font-bold text-xs flex items-center gap-3">
            <Radio className="w-5 h-5 text-[#12B76A] shrink-0 animate-pulse" />
            <span>{activeAlert}</span>
          </div>
        )}

        {/* High-Level Command Center Metrics */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0c2340] border border-white/10">
            <div className="text-xs font-bold text-slate-400 uppercase">Total Registrations</div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
              38,420
              <span className="text-sm font-normal text-slate-400"> / 40,000</span>
            </div>
            <div className="text-xs text-[#12B76A] mt-1 font-semibold">96.0% Capacity Sold Out</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c2340] border border-white/10">
            <div className="text-xs font-bold text-slate-400 uppercase">Runners on Course</div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-[#1479FF] mt-1">
              18,420
            </div>
            <div className="text-xs text-slate-300 mt-1">9,840 Finished • 12 DNF</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c2340] border border-white/10">
            <div className="text-xs font-bold text-slate-400 uppercase">Ambulance Fleet</div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-[#FFC857] mt-1">
              12 / 12
            </div>
            <div className="text-xs text-slate-300 mt-1">Active on Course Patrol</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c2340] border border-white/10">
            <div className="text-xs font-bold text-slate-400 uppercase">Timing Checkpoints</div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-[#12B76A] mt-1">
              14 / 14
            </div>
            <div className="text-xs text-slate-300 mt-1">100% RFID Mat Synced</div>
          </div>
        </div>

        {/* Management Panels Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Aid Station Inventory & Wave Management (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Aid Station Water & Electrolyte Levels */}
            <div className="p-6 rounded-2xl bg-[#0c2340] border border-white/10">
              <h3 className="font-heading font-black text-lg text-white mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#1479FF]" />
                  AID STATIONS WATER & ELECTROLYTE LEVELS
                </span>
                <span className="text-xs font-normal text-slate-400">Live RFID stock</span>
              </h3>

              <div className="space-y-4 text-xs">
                {[
                  { station: 'Station 01 — Cubbon Park Gate', level: 94, status: 'Optimal' },
                  { station: 'Station 02 — MG Road Trinity', level: 82, status: 'Optimal' },
                  { station: 'Station 03 — Vidhana Soudha Plaza', level: 88, status: 'Optimal' },
                  { station: 'Station 04 — Ulsoor Lake Loop', level: 76, status: 'Refill En Route' },
                  { station: 'Station 05 — Kanteerava Infield', level: 98, status: 'Optimal' },
                ].map((s, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-200">{s.station}</span>
                      <span className="text-[#1479FF] font-mono">{s.level}% Capacity</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${s.level}%` }}
                        className={`h-full rounded-full ${
                          s.level > 80 ? 'bg-[#1479FF]' : 'bg-[#FFC857]'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wave Flag-Off Dispatch */}
            <div className="p-6 rounded-2xl bg-[#0c2340] border border-white/10">
              <h3 className="font-heading font-black text-lg text-white mb-4 flex items-center gap-2">
                <Flag className="w-4 h-4 text-[#FF6B2C]" />
                CORRAL & WAVE CONTROLS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Wave 1 — Full Marathon (42.2K)</div>
                    <div className="text-slate-400">04:30 AM Flagged Off</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    Running
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Wave 2 — Half Marathon Wave A</div>
                    <div className="text-slate-400">05:15 AM Flagged Off</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    Running
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Wave 3 — Half Marathon Wave B</div>
                    <div className="text-slate-400">05:30 AM Staged at Gate</div>
                  </div>
                  <button className="px-2.5 py-1 rounded bg-[#FF6B2C] text-white font-bold hover:bg-[#f05a18]">
                    Flag-Off
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Wave 4 — 10K & 5K Hope Run</div>
                    <div className="text-slate-400">06:15 AM Warming Up</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    Scheduled
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Broadcast & Incident Console (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Emergency Broadcast Console */}
            <div className="p-6 rounded-2xl bg-[#0c2340] border border-white/10">
              <h3 className="font-heading font-black text-lg text-white mb-2 flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#FF6B2C]" />
                EMERGENCY RUNNER BROADCAST
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Pushes immediate audio-chime notifications to runners' tracking apps and SMS alerts.
              </p>

              <form onSubmit={handleSendBroadcast}>
                <textarea
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="e.g. Weather update: Light shower near Vidhana Soudha, road conditions optimal..."
                  rows={3}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#1479FF] resize-none"
                />
                <button
                  type="submit"
                  disabled={!broadcastMessage.trim()}
                  className="mt-3 w-full py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-[#FF6B2C] hover:bg-[#f05a18] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Priority Broadcast</span>
                </button>
              </form>
            </div>

            {/* Medical Incidents Log */}
            <div className="p-6 rounded-2xl bg-[#0c2340] border border-white/10">
              <h3 className="font-heading font-black text-lg text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#FFC857]" />
                MEDICAL LOG & FIRST RESPONDERS
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-200">Dehydration / Cramps (Bib #18420)</span>
                    <span className="text-[#12B76A]">Resolved</span>
                  </div>
                  <div className="text-slate-400 mt-1">KM 16 Aid Post • Electrolyte spray administered</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-200">Minor Sprain (Bib #22104)</span>
                    <span className="text-[#12B76A]">Resolved</span>
                  </div>
                  <div className="text-slate-400 mt-1">KM 8 Aid Post • Ice compression applied</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

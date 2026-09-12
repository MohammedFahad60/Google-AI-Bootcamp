import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Download,
  Activity,
  Droplets,
  HeartPulse,
  Music,
  Maximize2,
  Info,
  CheckCircle,
} from 'lucide-react';
import { ROUTE_MARKERS } from '../data/mockData';
import { RouteMarker } from '../types';

export const RaceRouteSection: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<RouteMarker>(ROUTE_MARKERS[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredMarkers = ROUTE_MARKERS.filter((m) => {
    if (filterType === 'all') return true;
    if (filterType === 'splits') return m.type === 'split' || m.type === 'start' || m.type === 'finish';
    if (filterType === 'hydration') return m.type === 'hydration';
    if (filterType === 'medical') return m.type === 'medical';
    if (filterType === 'entertainment') return m.type === 'entertainment';
    return true;
  });

  const handleDownload = () => {
    setDownloadSuccess(true);
    // Trigger simulated GPX download
    const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Bengaluru Marathon 2026 Official GPX">
  <metadata><name>Bengaluru Marathon 42.2K Official Course</name></metadata>
  <trk><name>Bengaluru Marathon 2026</name><trkseg></trkseg></trk>
</gpx>`;
    const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Bengaluru_Marathon_2026_42K.gpx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const getMarkerColor = (type: RouteMarker['type']) => {
    switch (type) {
      case 'start':
        return 'bg-[#12B76A] text-white ring-4 ring-[#12B76A]/30';
      case 'finish':
        return 'bg-[#FF6B2C] text-white ring-4 ring-[#FF6B2C]/30';
      case 'split':
        return 'bg-[#1479FF] text-white';
      case 'hydration':
        return 'bg-cyan-500 text-white';
      case 'medical':
        return 'bg-rose-500 text-white';
      case 'toilet':
        return 'bg-purple-500 text-white';
      case 'entertainment':
        return 'bg-[#FFC857] text-slate-900';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  return (
    <section id="race-route-section" className="py-20 lg:py-28 bg-[#071A33] text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#1479FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF6B2C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1479FF]/20 text-[#1479FF] border border-[#1479FF]/30 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              AIMS Certified Official Course
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-tight uppercase">
              RUN THROUGH BENGALURU
            </h2>
            <p className="mt-2 text-slate-300 text-base max-w-xl">
              Certified 42.195 KM looped course traversing Bengaluru's verdant parks, high-court boulevards, and high-energy tech avenues.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Landmarks' },
              { id: 'splits', label: 'KM Splits' },
              { id: 'hydration', label: 'Hydration' },
              { id: 'medical', label: 'Medical' },
              { id: 'entertainment', label: 'Cheer Zones' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === f.id
                    ? 'bg-[#1479FF] text-white shadow-md'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Map & Route Details Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Map Canvas Interface (8 Cols) */}
          <div className="lg:col-span-8 bg-[#0c2340] rounded-2xl border border-white/10 shadow-2xl p-4 sm:p-6 overflow-hidden relative">
            {/* Map Top Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <MapPin className="w-4 h-4 text-[#FF6B2C]" /> Bengaluru Marathon Circuit
                </span>
                <span className="hidden sm:inline-block text-slate-500">|</span>
                <span className="hidden sm:inline-block text-[#12B76A] font-medium">
                  Live GPS Route Verified
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[11px]">Click any checkpoint to inspect</span>
              </div>
            </div>

            {/* Simulated Vector SVG Map of Course */}
            <div className="relative w-full h-[400px] sm:h-[480px] bg-[#071629] rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
              {/* Map grid lines */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #1479ff 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Landmark background areas */}
              <div className="absolute top-12 left-20 w-44 h-36 bg-emerald-950/40 rounded-3xl border border-emerald-500/20 flex items-center justify-center text-center p-2 pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 opacity-60">
                  Cubbon Park Canopy
                </span>
              </div>

              <div className="absolute top-8 right-16 w-36 h-28 bg-cyan-950/40 rounded-full border border-cyan-500/20 flex items-center justify-center text-center pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 opacity-60">
                  Ulsoor Lake
                </span>
              </div>

              <div className="absolute bottom-12 right-28 w-40 h-28 bg-amber-950/30 rounded-2xl border border-amber-500/20 flex items-center justify-center text-center pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 opacity-60">
                  Richmond & Lalbagh
                </span>
              </div>

              {/* Course SVG Path */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Outer Marathon Glow Line */}
                <path
                  d="M 18 72 C 22 62, 28 56, 30 55 C 36 50, 40 40, 44 35 C 52 30, 58 38, 62 42 C 68 46, 72 50, 74 50 C 80 48, 84 42, 86 40 C 88 52, 82 60, 78 62 C 72 68, 68 74, 64 76 C 54 80, 48 82, 45 82 C 34 82, 28 80, 26 80 C 22 78, 19 76, 20 74"
                  fill="none"
                  stroke="#1479FF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="2 1"
                  className="opacity-40"
                />
                {/* Active Marathon Line */}
                <path
                  d="M 18 72 C 22 62, 28 56, 30 55 C 36 50, 40 40, 44 35 C 52 30, 58 38, 62 42 C 68 46, 72 50, 74 50 C 80 48, 84 42, 86 40 C 88 52, 82 60, 78 62 C 72 68, 68 74, 64 76 C 54 80, 48 82, 45 82 C 34 82, 28 80, 26 80 C 22 78, 19 76, 20 74"
                  fill="none"
                  stroke="#FF6B2C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Interactive Markers Overlaid */}
              {filteredMarkers.map((marker) => {
                const isSelected = selectedMarker.id === marker.id;
                return (
                  <button
                    key={marker.id}
                    id={`map-marker-${marker.id}`}
                    onClick={() => setSelectedMarker(marker)}
                    style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 z-20 group ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                    title={marker.name}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black shadow-lg ${getMarkerColor(
                        marker.type
                      )}`}
                    >
                      {marker.type === 'start' && 'S'}
                      {marker.type === 'finish' && 'F'}
                      {marker.type === 'split' && `${marker.km}K`}
                      {marker.type === 'hydration' && <Droplets className="w-4 h-4" />}
                      {marker.type === 'medical' && <HeartPulse className="w-4 h-4" />}
                      {marker.type === 'toilet' && 'WC'}
                      {marker.type === 'entertainment' && <Music className="w-4 h-4" />}
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block whitespace-nowrap bg-slate-900/95 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-lg border border-white/15 pointer-events-none z-40">
                      {marker.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#12B76A]" /> Start Gate
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF6B2C]" /> Finish Gate
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#1479FF]" /> KM Split Mats
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-cyan-500" /> Hydration & Electrolytes
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" /> Medical & Physio
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FFC857]" /> Dhol & Cheer Zones
              </span>
            </div>
          </div>

          {/* Side Route Information & Inspector (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Route Stats Card */}
            <div className="bg-[#0c2340] rounded-2xl border border-white/10 p-6 shadow-xl">
              <h3 className="font-heading font-black text-xl text-white flex items-center justify-between">
                <span>COURSE PROFILE</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#1479FF] text-white">
                  42.195 KM
                </span>
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs text-slate-400">Total Distance</div>
                  <div className="font-heading font-black text-2xl text-white mt-0.5">
                    42.2 KM
                  </div>
                  <div className="text-[11px] text-[#12B76A]">World Athletics Compliant</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs text-slate-400">Total Elevation</div>
                  <div className="font-heading font-black text-2xl text-white mt-0.5">
                    182 M
                  </div>
                  <div className="text-[11px] text-slate-400">Gentle Rolling Course</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs text-slate-400">Aid Stations</div>
                  <div className="font-heading font-black text-2xl text-cyan-400 mt-0.5">
                    18 Points
                  </div>
                  <div className="text-[11px] text-slate-400">Every 1.5 - 2 KM</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs text-slate-400">Medical Tents</div>
                  <div className="font-heading font-black text-2xl text-rose-400 mt-0.5">
                    14 Points
                  </div>
                  <div className="text-[11px] text-slate-400">Manipal Paramedics</div>
                </div>
              </div>

              {/* Elevation Profile Visual Simulation */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                  <span className="font-bold">Elevation Graph</span>
                  <span className="text-[11px] text-slate-400">Peak: 928m | Base: 908m</span>
                </div>
                <div className="h-20 w-full bg-[#071629] rounded-lg p-2 flex items-end justify-between gap-1 border border-white/5">
                  {[45, 60, 52, 40, 70, 85, 65, 30, 48, 75, 80, 60, 50, 45, 48].map((val, i) => (
                    <div
                      key={i}
                      style={{ height: `${val}%` }}
                      className="w-full bg-gradient-to-t from-[#1479FF] to-[#FF6B2C] rounded-t-xs opacity-75 hover:opacity-100 transition-opacity"
                      title={`Km ${(i * 3).toFixed(0)} — Elevation: ${900 + val}m`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>Start (0K)</span>
                  <span>Half (21.1K)</span>
                  <span>30K</span>
                  <span>Finish (42.2K)</span>
                </div>
              </div>
            </div>

            {/* Selected Checkpoint Card */}
            <div className="bg-[#0c2340] rounded-2xl border border-white/10 p-6 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B2C] uppercase tracking-wider mb-2">
                <Info className="w-4 h-4" /> Checkpoint Detail
              </div>

              <h4 className="font-heading font-black text-lg text-white">
                {selectedMarker.name}
              </h4>

              <div className="mt-2 flex items-center gap-3 text-xs text-slate-300">
                <span className="font-bold text-[#1479FF]">
                  {selectedMarker.km === 0 ? 'Start' : `${selectedMarker.km} KM`}
                </span>
                <span>•</span>
                <span>Elevation: {selectedMarker.elevationM}m</span>
                <span>•</span>
                <span className="capitalize text-[#FFC857] font-semibold">{selectedMarker.type}</span>
              </div>

              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                {selectedMarker.description}
              </p>
            </div>

            {/* Actions: View Full & Download Route */}
            <div className="space-y-2.5">
              <button
                id="btn-download-route-gpx"
                onClick={handleDownload}
                className="w-full py-3.5 px-4 rounded-xl font-heading font-bold text-sm text-white bg-[#FF6B2C] hover:bg-[#f05a18] shadow-lg shadow-[#FF6B2C]/25 transition-all flex items-center justify-center gap-2"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>Route GPX Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download GPX Route (For Garmin / Strava)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedMarker(ROUTE_MARKERS[ROUTE_MARKERS.length - 1])}
                className="w-full py-3 px-4 rounded-xl font-heading font-bold text-sm text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Jump to Finish Line (Kanteerava)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

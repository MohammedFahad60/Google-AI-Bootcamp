import React, { useState } from 'react';
import {
  Search,
  Download,
  Share2,
  Award,
  Sparkles,
  Trophy,
  CheckCircle,
  Clock,
  Printer,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_RESULT_RECORD } from '../data/mockData';
import { ResultRecord } from '../types';

export const ResultsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('BGL10248');
  const [result, setResult] = useState<ResultRecord | null>(MOCK_RESULT_RECORD);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    if (
      q.includes('10248') ||
      q.includes('arjun') ||
      q.includes('sharma') ||
      q.includes('@')
    ) {
      setResult(MOCK_RESULT_RECORD);
    } else {
      setResult({
        ...MOCK_RESULT_RECORD,
        bib: searchQuery.toUpperCase(),
        name: searchQuery.includes(' ') ? searchQuery : `Runner ${searchQuery}`,
      });
    }
  };

  const handleOpenCertificate = () => {
    setShowCertificateModal(true);
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B2C', '#FFC857', '#1479FF', '#12B76A'],
    });
  };

  const handleShare = () => {
    setShareSuccess(true);
    navigator.clipboard.writeText(
      `I finished the Bengaluru Marathon 2026 Half Marathon in ${result?.chipTime} (Pace: ${result?.avgPace})! 🏅 Check my official certificate: ${window.location.origin}`
    );
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <div id="results-page" className="py-12 lg:py-16 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Search Area */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12B76A]/10 text-[#12B76A] text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            Verified Timing & Certificates
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#071A33] tracking-tight uppercase">
            FIND YOUR RESULT
          </h1>
          <p className="mt-2 text-slate-600 text-base">
            Search by your Name, Bib Number, or Registered Email to look up official chip times, split splits, and verified finisher certificates.
          </p>
        </div>

        {/* Large Search Input */}
        <div className="mt-8 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="results-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Runner Name, Bib # (e.g. BGL10248), or Email..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-[#1479FF] focus:ring-2 focus:ring-[#1479FF]/20 text-sm text-slate-900 font-medium outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-[#071A33] hover:bg-[#1479FF] transition-colors"
            >
              Search Result
            </button>
          </form>
        </div>

        {/* Result Card */}
        {result && (
          <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-[#071A33] to-[#0c2340] p-6 sm:p-8 text-white relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12B76A]/20 border border-[#12B76A]/40 text-[#12B76A] text-xs font-black uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    YOU DID IT! 🎉
                  </div>
                  <h2 className="font-heading font-black text-3xl sm:text-4xl">
                    {result.name}
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                    Bib #{result.bib} • Half Marathon (21.1 KM) • Certificate ID: {result.certificateId}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] uppercase font-bold text-slate-400">Official Chip Time</span>
                  <div className="font-mono font-black text-3xl sm:text-4xl text-[#FFC857]">
                    {result.chipTime}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Gun Time: {result.finishTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Average Pace</div>
                  <div className="font-heading font-black text-2xl text-[#1479FF] mt-0.5">
                    {result.avgPace}
                  </div>
                  <div className="text-[11px] text-slate-600">Consistent Pacing</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Overall Rank</div>
                  <div className="font-heading font-black text-2xl text-slate-900 mt-0.5">
                    {result.overallRank.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-600">of {result.totalRunners.toLocaleString('en-IN')}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Gender Rank</div>
                  <div className="font-heading font-black text-2xl text-slate-900 mt-0.5">
                    {result.genderRank.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-600">of {result.totalGender.toLocaleString('en-IN')}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Category Rank</div>
                  <div className="font-heading font-black text-2xl text-[#FF6B2C] mt-0.5">
                    {result.categoryRank}
                  </div>
                  <div className="text-[11px] text-slate-600">of {result.totalCategory.toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Checkpoint Splits Table */}
              <div className="mt-8">
                <h3 className="font-heading font-black text-sm uppercase tracking-wider text-slate-700 mb-3">
                  Split Checkpoint Breakdown
                </h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                        <th className="py-2.5 px-4">Checkpoint</th>
                        <th className="py-2.5 px-4 text-center">Split Time</th>
                        <th className="py-2.5 px-4 text-right">Split Pace</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {result.splits.map((s, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 font-medium">
                          <td className="py-2.5 px-4">{s.checkpoint}</td>
                          <td className="py-2.5 px-4 text-center font-mono">{s.time}</td>
                          <td className="py-2.5 px-4 text-right font-mono text-[#1479FF] font-bold">
                            {s.splitPace}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  id="btn-download-certificate"
                  onClick={handleOpenCertificate}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-[#FF6B2C] hover:bg-[#f05a18] shadow-lg shadow-[#FF6B2C]/25 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD CERTIFICATE</span>
                </button>

                <button
                  id="btn-share-result"
                  onClick={handleShare}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{shareSuccess ? 'Result Copied!' : 'SHARE RESULT'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Modal */}
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-[#071A33] shadow-2xl relative border-8 border-[#071A33]">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center border-4 border-[#FFC857] p-6 sm:p-8 rounded-2xl relative">
                <div className="font-heading font-black text-xs sm:text-sm tracking-widest text-[#FF6B2C] uppercase">
                  OFFICIAL FINISHER CERTIFICATE
                </div>
                <div className="font-heading font-black text-2xl sm:text-4xl tracking-tight text-[#071A33] mt-1">
                  BENGALURU MARATHON 2026
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">
                  AIMS Certified • Oct 18, 2026
                </div>

                <div className="my-6">
                  <div className="text-xs text-slate-500 uppercase tracking-wider">This certifies that</div>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#1479FF] mt-1">
                    {result?.name}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 font-medium">
                    Bib #{result?.bib} has successfully conquered the
                  </div>
                  <div className="font-heading font-black text-xl text-slate-900 mt-1 uppercase">
                    HALF MARATHON (21.0975 KM)
                  </div>
                </div>

                {/* Times strip */}
                <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Chip Time</span>
                    <div className="font-mono font-black text-lg text-slate-900">{result?.chipTime}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Avg Pace</span>
                    <div className="font-mono font-black text-lg text-[#1479FF]">{result?.avgPace}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Category Rank</span>
                    <div className="font-mono font-black text-lg text-[#FF6B2C]">#{result?.categoryRank}</div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-[11px] text-slate-500 pt-4 border-t border-slate-200">
                  <span>Race Director: Nagaraj Adiga</span>
                  <span className="font-mono font-semibold">ID: {result?.certificateId}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#071A33] hover:bg-[#1479FF]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

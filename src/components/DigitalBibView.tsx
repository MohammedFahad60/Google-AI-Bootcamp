import React, { useState } from 'react';
import {
  QrCode,
  Download,
  Share2,
  BookmarkPlus,
  ShieldCheck,
  Heart,
  Phone,
  Flame,
  CheckCircle2,
  Printer,
  Sparkles,
} from 'lucide-react';

export const DigitalBibView: React.FC = () => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = () => {
    setDownloadNotice('Digital Bib pass downloaded to device storage.');
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  const handleWallet = () => {
    setDownloadNotice('Pass added to Apple Wallet / Google Wallet pass file (.pkpass).');
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setDownloadNotice('Bib link copied to clipboard!');
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div id="digital-bib-page" className="py-12 lg:py-16 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1479FF]/10 text-[#1479FF] text-xs font-bold uppercase tracking-wider mb-3">
            <QrCode className="w-3.5 h-3.5" />
            Official Athlete Pass
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#071A33] tracking-tight uppercase">
            DIGITAL RACE BIB
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Your official race credentials for Expo Kit Collection and Race Day Corral Gate Access.
          </p>
        </div>

        {/* Notice alert */}
        {downloadNotice && (
          <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl text-center">
            {downloadNotice}
          </div>
        )}

        {/* Physical-Style Digital Marathon Bib Card */}
        <div className="mt-10 bg-white rounded-3xl border-2 border-slate-300 shadow-2xl overflow-hidden relative">
          {/* Bib Punch Holes (Top & Bottom simulated race bib eyelets) */}
          <div className="absolute top-4 left-6 w-4 h-4 rounded-full bg-slate-200 border border-slate-300 shadow-inner z-20" />
          <div className="absolute top-4 right-6 w-4 h-4 rounded-full bg-slate-200 border border-slate-300 shadow-inner z-20" />
          <div className="absolute bottom-4 left-6 w-4 h-4 rounded-full bg-slate-200 border border-slate-300 shadow-inner z-20" />
          <div className="absolute bottom-4 right-6 w-4 h-4 rounded-full bg-slate-200 border border-slate-300 shadow-inner z-20" />

          {/* Top Brand Banner */}
          <div className="bg-[#071A33] text-white px-8 py-5 border-b-4 border-[#1479FF] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF6B2C] text-white flex items-center justify-center font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-black text-xl tracking-tight leading-none">
                  BENGALURU <span className="text-[#FF6B2C]">MARATHON</span>
                </div>
                <div className="text-[10px] tracking-widest uppercase text-slate-300 mt-0.5">
                  12th Edition • Sunday, Oct 18, 2026
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase">TIMING CHIP</span>
              <div className="font-mono text-xs font-black text-[#FFC857]">RFID PASS ACTIVE</div>
            </div>
          </div>

          {/* Bib Main Content */}
          <div className="p-8 text-center bg-gradient-to-b from-white to-slate-50">
            {/* Runner Name */}
            <div className="font-heading font-black text-2xl sm:text-3xl text-[#071A33] uppercase tracking-wider">
              ARJUN SHARMA
            </div>

            {/* Giant Bib Number Display */}
            <div className="my-4 select-all">
              <div className="font-mono font-black text-6xl sm:text-8xl tracking-tight text-slate-900 leading-none">
                10248
              </div>
              <div className="text-xs font-mono font-bold text-slate-400 mt-1">
                BIB # BGL10248
              </div>
            </div>

            {/* Category Color Ribbon Strip */}
            <div className="inline-block px-6 py-2 rounded-xl bg-[#1479FF] text-white font-heading font-black text-lg uppercase tracking-widest shadow-md">
              HALF MARATHON • 21.1 KM
            </div>

            {/* Details Grid & Scannable QR Code */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-left">
              {/* QR Code Container */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="p-2.5 bg-white border-2 border-slate-900 rounded-xl shadow-xs">
                  {/* Simulated SVG QR Code */}
                  <div className="w-24 h-24 bg-slate-900 rounded-lg p-1.5 flex flex-wrap gap-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-xs ${
                          (i * 7) % 3 === 0 ? 'bg-white' : 'bg-slate-900'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 mt-1">
                  EXPO VERIFIED SCAN
                </span>
              </div>

              {/* Race Day Details */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Flag-Off Wave</span>
                  <div className="font-bold text-slate-800">Wave 2 • 05:30 AM IST</div>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Start Corral</span>
                  <div className="font-bold text-[#1479FF]">Zone B (Sub-2h Aspirants)</div>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Venue</span>
                  <div className="font-bold text-slate-800">Sree Kanteerava Stadium</div>
                </div>
              </div>

              {/* Medical & Emergency Contact */}
              <div className="space-y-2 text-xs bg-rose-50/70 p-3 rounded-xl border border-rose-100">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold uppercase text-[10px]">
                  <Heart className="w-3.5 h-3.5 text-rose-600" />
                  <span>Medical & Safety</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">Blood Group:</span>
                  <span className="font-bold text-slate-900 ml-1">O+ Positive</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">Emergency Contact:</span>
                  <div className="font-bold text-slate-900 truncate">Priya S. (Spouse)</div>
                  <div className="font-mono text-slate-600 text-[11px]">+91 98860 12345</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bib Footer Bar */}
          <div className="bg-slate-100 px-8 py-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <span>Official Timing: TCS & RFID Matrix</span>
            <span className="font-semibold text-[#12B76A] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Medical Clearance Approved
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="btn-download-bib"
            onClick={handleDownload}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-[#071A33] hover:bg-[#1479FF] transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD BIB (PDF/PNG)</span>
          </button>

          <button
            id="btn-add-wallet"
            onClick={handleWallet}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <BookmarkPlus className="w-4 h-4 text-[#FF6B2C]" />
            <span>ADD TO WALLET</span>
          </button>

          <button
            id="btn-share-bib"
            onClick={handleShare}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>SHARE BIB</span>
          </button>
        </div>
      </div>
    </div>
  );
};

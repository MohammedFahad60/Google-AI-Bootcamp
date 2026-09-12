import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Bell,
  CheckCheck,
  User,
  MapPin,
  Flame,
  Award,
  Calendar,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { NOTIFICATIONS_DATA, OTHER_RUNNERS_LIST } from '../data/mockData';
import { NotificationItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { label: 'Live Runner Tracking', tab: 'tracking', icon: Flame, badge: 'Live Mat' },
    { label: 'My Digital Bib & Pass', tab: 'digitalBib', icon: Award, badge: 'Pass' },
    { label: 'Race Leaderboard & Standings', tab: 'leaderboard', icon: Award, badge: 'Podium' },
    { label: 'Interactive Course Map (42.2K & 21.1K)', tab: 'route', icon: MapPin, badge: 'AIMS' },
    { label: 'Training Platform & Plans', tab: 'training', icon: Calendar, badge: '12-Week' },
    { label: 'Timing Results & Certificates', tab: 'results', icon: Award, badge: 'Instant' },
  ];

  const matchingRunners = OTHER_RUNNERS_LIST.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.bib.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            id="global-search-input"
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search runners, bibs, race routes, training plans..."
            className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-transparent outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Runner Matches if query present */}
          {query.trim() && (
            <div>
              <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                RUNNERS & BIBS
              </div>
              {matchingRunners.length > 0 ? (
                <div className="space-y-1">
                  {matchingRunners.map((runner) => (
                    <button
                      key={runner.bib}
                      onClick={() => {
                        onSelectTab('tracking');
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left group transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#1479FF]/10 text-[#1479FF] flex items-center justify-center font-bold">
                          {runner.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-[#1479FF]">
                            {runner.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Bib #{runner.bib} • {runner.category} • {runner.status}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#1479FF] font-bold">
                        Track Runner →
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-slate-500 py-2">No runner found matching "{query}"</div>
              )}
            </div>
          )}

          {/* Quick Platform Destinations */}
          <div>
            <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
              NAVIGATION & FEATURES
            </div>
            <div className="grid grid-cols-1 gap-1">
              {quickLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectTab(item.tab);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#1479FF]/10 text-slate-600 group-hover:text-[#1479FF] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-800 group-hover:text-[#1479FF]">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Press ESC or click outside to dismiss</span>
          <span>Bengaluru Marathon 2026</span>
        </div>
      </div>
    </div>
  );
};

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectTab: (tab: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#071A33] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FF6B2C] text-white">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-black text-base">RACE NOTIFICATIONS</h3>
              <div className="text-[10px] text-slate-300">Official Athlete Bulletins</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-bar */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-600">
            {notifications.filter((n) => !n.isRead).length} Unread Updates
          </span>
          <button
            onClick={onMarkAllAsRead}
            className="text-xs font-bold text-[#1479FF] hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        </div>

        {/* List of Notifications */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                n.isRead
                  ? 'bg-white border-slate-200 opacity-80'
                  : 'bg-blue-50/50 border-blue-200 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B2C]">
                  {n.category}
                </span>
                <span className="text-[10px] text-slate-400">{n.timestamp}</span>
              </div>
              <h4 className="font-heading font-bold text-xs text-slate-900 mt-1">
                {n.title}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {n.message}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={() => {
              onSelectTab('admin');
              onClose();
            }}
            className="text-xs font-bold text-[#071A33] hover:text-[#1479FF]"
          >
            Manage alerts in Race Command Center →
          </button>
        </div>
      </div>
    </div>
  );
};

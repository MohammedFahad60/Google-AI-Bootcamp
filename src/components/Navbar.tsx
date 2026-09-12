import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  ShieldCheck,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRegister: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenRegister,
  onOpenSearch,
  onOpenNotifications,
  unreadCount,
  isAdmin,
  setIsAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'race', label: 'Race' },
    { id: 'route', label: 'Route' },
    { id: 'training', label: 'Training' },
    { id: 'tracking', label: 'Live Tracking', highlight: true },
    { id: 'results', label: 'Results' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'community', label: 'Community' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#071A33]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
            : 'bg-gradient-to-b from-[#071A33]/90 via-[#071A33]/60 to-transparent backdrop-blur-xs py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B2C] to-[#1479FF] flex items-center justify-center text-white shadow-md shadow-[#FF6B2C]/20 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="font-heading font-black text-xl tracking-tight text-white flex items-center gap-1.5 leading-none">
                <span>BENGALURU</span>
                <span className="text-[#FF6B2C]">MARATHON</span>
              </div>
              <div className="text-[10px] tracking-wider uppercase text-slate-300 font-semibold mt-0.5">
                2026 • RUN THE CITY
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    isActive
                      ? 'text-white bg-white/10 shadow-inner'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {item.highlight && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12B76A] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12B76A]"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Search runners, routes, bibs (Cmd+K)"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications Trigger */}
            <button
              id="nav-notifications-btn"
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-[#FF6B2C] rounded-full ring-2 ring-[#071A33]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Runner Profile / Dashboard Quick Access */}
            <button
              id="nav-dashboard-toggle-btn"
              onClick={() => setActiveTab(activeTab === 'dashboard' ? 'home' : 'dashboard')}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#1479FF] text-white border-[#1479FF] shadow-sm'
                  : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#FFC857]" />
              <span>Arjun S.</span>
            </button>

            {/* Admin Toggle */}
            <button
              id="nav-admin-toggle-btn"
              onClick={() => {
                const nextAdmin = !isAdmin;
                setIsAdmin(nextAdmin);
                if (nextAdmin) setActiveTab('admin');
                else if (activeTab === 'admin') setActiveTab('home');
              }}
              className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                isAdmin
                  ? 'bg-[#FF6B2C] text-white border-[#FF6B2C]'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/10'
              }`}
              title="Organizer Admin Panel"
              aria-label="Organizer Admin"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>

            {/* Register Now CTA */}
            <button
              id="nav-register-cta-btn"
              onClick={onOpenRegister}
              className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#FF6B2C] to-[#ff844f] hover:from-[#f05a18] hover:to-[#ff6b2c] rounded-lg shadow-md shadow-[#FF6B2C]/25 hover:shadow-lg transition-all active:scale-95"
            >
              Register Now
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="nav-mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#071A33] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B2C] flex items-center justify-center text-white">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div className="font-heading font-black text-lg text-white">
                    BENGALURU <span className="text-[#FF6B2C]">MARATHON</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Runner card in drawer */}
              <div className="mt-5 p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1479FF] text-white flex items-center justify-center font-bold text-sm">
                    AS
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Arjun Sharma</div>
                    <div className="text-xs text-slate-400">Bib #BGL10248 • Half Marathon</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-medium text-[#1479FF] hover:underline"
                >
                  Dashboard
                </button>
              </div>

              {/* Navigation list */}
              <div className="mt-6 flex flex-col gap-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-medium text-sm transition-colors ${
                      activeTab === item.id
                        ? 'bg-[#1479FF] text-white'
                        : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                ))}

                {/* Additional views */}
                <button
                  onClick={() => {
                    setActiveTab('digitalBib');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-medium text-sm transition-colors ${
                    activeTab === 'digitalBib'
                      ? 'bg-[#1479FF] text-white'
                      : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#FFC857]" />
                    <span>My Digital Bib</span>
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>

                <button
                  onClick={() => {
                    setActiveTab('schedule');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-medium text-sm transition-colors ${
                    activeTab === 'schedule'
                      ? 'bg-[#1479FF] text-white'
                      : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span>Event Schedule</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>

                <button
                  onClick={() => {
                    setActiveTab('faq');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-medium text-sm transition-colors ${
                    activeTab === 'faq'
                      ? 'bg-[#1479FF] text-white'
                      : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span>Runner FAQs</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>

                <button
                  onClick={() => {
                    setIsAdmin(!isAdmin);
                    setActiveTab('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-medium text-sm text-[#FFC857] hover:bg-white/5"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Admin Command Center</span>
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  onOpenRegister();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 text-center text-sm font-bold text-white bg-[#FF6B2C] hover:bg-[#f05a18] rounded-xl shadow-lg shadow-[#FF6B2C]/30"
              >
                Register Now — 2026
              </button>
              <div className="text-center text-[11px] text-slate-400">
                Oct 18, 2026 • Sree Kanteerava Stadium
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

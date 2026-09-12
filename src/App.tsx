import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RaceCategoriesSection } from './components/RaceCategoriesSection';
import { WhyBengaluruSection } from './components/WhyBengaluruSection';
import { RaceRouteSection } from './components/RaceRouteSection';
import { RaceDayExperienceSection } from './components/RaceDayExperienceSection';
import { SponsorsSection } from './components/SponsorsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

// Dynamic Sub-Pages
import { LiveTrackingView } from './components/LiveTrackingView';
import { RunnerDashboardView } from './components/RunnerDashboardView';
import { TrainingPlatformView } from './components/TrainingPlatformView';
import { CommunityView } from './components/CommunityView';
import { LeaderboardView } from './components/LeaderboardView';
import { ResultsView } from './components/ResultsView';
import { DigitalBibView } from './components/DigitalBibView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { EventScheduleView } from './components/EventScheduleView';

// Modals
import { RegistrationFlowModal } from './components/RegistrationFlowModal';
import { SearchModal, NotificationModal } from './components/SearchAndNotificationModals';
import { NOTIFICATIONS_DATA } from './data/mockData';
import { RaceCategory } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [registerCategory, setRegisterCategory] = useState<RaceCategory>('half');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  // Check URL query parameters on load (e.g. ?track=BGL10248 or ?tab=dashboard)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const trackParam = params.get('track');

    if (trackParam) {
      setActiveTab('tracking');
    } else if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);

  const handleOpenRegister = (category: RaceCategory = 'half') => {
    setRegisterCategory(category);
    setIsRegisterOpen(true);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-900 flex flex-col selection:bg-[#FF6B2C] selection:text-white font-sans antialiased">
      {/* Top Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenRegister={() => handleOpenRegister('half')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={unreadNotificationsCount}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      {/* Main Content Area based on activeTab */}
      <main className="flex-1 pt-16 sm:pt-20">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onRegisterClick={() => handleOpenRegister('half')}
              onExploreClick={() => {
                const elem = document.getElementById('race-categories-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              onQuickTrackClick={() => setActiveTab('tracking')}
            />
            <RaceCategoriesSection
              onSelectCategory={(cat) => handleOpenRegister(cat)}
            />
            <WhyBengaluruSection />
            <RaceRouteSection />
            <RaceDayExperienceSection
              onExploreBib={() => {
                setActiveTab('digitalBib');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <SponsorsSection />
            <FAQSection />
          </>
        )}

        {(activeTab === 'race' || activeTab === 'races') && (
          <div>
            <RaceCategoriesSection
              onSelectCategory={(cat) => handleOpenRegister(cat)}
            />
            <RaceDayExperienceSection
              onExploreBib={() => setActiveTab('digitalBib')}
            />
          </div>
        )}

        {activeTab === 'route' && (
          <div className="py-6">
            <RaceRouteSection />
          </div>
        )}

        {activeTab === 'tracking' && <LiveTrackingView />}

        {activeTab === 'dashboard' && (
          <RunnerDashboardView
            onOpenDigitalBib={() => setActiveTab('digitalBib')}
            onOpenTraining={() => setActiveTab('training')}
          />
        )}

        {activeTab === 'training' && <TrainingPlatformView />}

        {activeTab === 'community' && <CommunityView />}

        {activeTab === 'leaderboard' && <LeaderboardView />}

        {activeTab === 'results' && <ResultsView />}

        {(activeTab === 'digitalBib' || activeTab === 'bib') && <DigitalBibView />}

        {activeTab === 'schedule' && <EventScheduleView />}

        {activeTab === 'faq' && <FAQSection />}

        {activeTab === 'admin' && <AdminDashboardView />}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Multi-Step Registration Modal */}
      <RegistrationFlowModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialCategory={registerCategory}
      />

      {/* Quick Search Modal (Cmd+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Live Race Notifications Center */}
      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

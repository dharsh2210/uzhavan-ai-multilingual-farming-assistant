import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { JudgeDemoBar } from './components/JudgeDemoBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SystemArchitectureModal } from './components/SystemArchitectureModal';
import { PitchGuideModal } from './components/PitchGuideModal';

import { DashboardPage } from './pages/DashboardPage';
import { DiseaseDetectionPage } from './pages/DiseaseDetectionPage';
import { WeatherAdvisoryPage } from './pages/WeatherAdvisoryPage';
import { SchemeMatcherPage } from './pages/SchemeMatcherPage';
import { AssistantChatPage } from './pages/AssistantChatPage';
import { AlertsPage } from './pages/AlertsPage';
import { ImpactDashboardPage } from './pages/ImpactDashboardPage';
import { ProfilePage } from './pages/ProfilePage';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F1] text-slate-900 font-sans antialiased selection:bg-yellow-300 selection:text-green-950">
      
      {/* 1. Hackathon Judge Bar for Instant Persona Switching & Demo Execution */}
      <JudgeDemoBar
        onOpenArchitecture={() => setIsArchModalOpen(true)}
        onOpenPitchGuide={() => setIsPitchModalOpen(true)}
      />

      {/* 2. Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setActiveTab('profile')}
        onOpenPitchGuide={() => setIsPitchModalOpen(true)}
        onOpenArchitecture={() => setIsArchModalOpen(true)}
      />

      {/* 3. Dynamic Page View */}
      <main className="flex-1">
        {activeTab === 'dashboard' && <DashboardPage setActiveTab={setActiveTab} />}
        {activeTab === 'cropDoctor' && <DiseaseDetectionPage />}
        {activeTab === 'weatherAdvisory' && <WeatherAdvisoryPage />}
        {activeTab === 'schemeMatcher' && <SchemeMatcherPage />}
        {activeTab === 'aiAssistant' && <AssistantChatPage />}
        {activeTab === 'alerts' && <AlertsPage />}
        {activeTab === 'impact' && <ImpactDashboardPage />}
        {activeTab === 'profile' && <ProfilePage />}
      </main>

      {/* 4. Footer with Knowledge Grounding & Disclaimers */}
      <Footer />

      {/* 5. Modals */}
      <SystemArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

      <PitchGuideModal
        isOpen={isPitchModalOpen}
        onClose={() => setIsPitchModalOpen(false)}
        onNavigateToTab={(tab) => setActiveTab(tab)}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

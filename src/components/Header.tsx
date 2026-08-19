import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Sprout,
  LayoutDashboard,
  Stethoscope,
  CloudSun,
  FileCheck,
  MessageSquare,
  Bell,
  BarChart3,
  User,
  Globe,
  Menu,
  X,
  ChevronDown,
  Presentation,
  Cpu
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
  onOpenPitchGuide?: () => void;
  onOpenArchitecture?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenPitchGuide,
  onOpenArchitecture
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, demoFarmersList, switchFarmer } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'cropDoctor', label: t.nav.cropDoctor, icon: Stethoscope },
    { id: 'weatherAdvisory', label: t.nav.weatherAdvisory, icon: CloudSun },
    { id: 'schemeMatcher', label: t.nav.schemeMatcher, icon: FileCheck },
    { id: 'aiAssistant', label: t.nav.aiAssistant, icon: MessageSquare },
    { id: 'alerts', label: t.nav.alerts, icon: Bell },
    { id: 'impact', label: t.nav.impact, icon: BarChart3 },
    { id: 'profile', label: t.nav.profile, icon: User },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1B4332] text-white shadow-md border-b border-green-900/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2 text-left group"
            >
              <div className="bg-yellow-400 p-2 rounded-xl text-green-950 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center flex-shrink-0">
                <Sprout className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="hidden sm:block">
                <div className="font-extrabold text-base sm:text-lg text-white tracking-tight flex items-center gap-1.5 whitespace-nowrap">
                  <span>{language === 'ta' ? 'உழவன் AI' : 'Uzhavan AI'}</span>
                  <span className="text-yellow-400 font-bold text-xs">
                    | KrishiMitra
                  </span>
                </div>
                <span className="text-[10px] text-green-200 font-medium block leading-tight opacity-90 whitespace-nowrap">
                  {language === 'ta' ? 'விவசாய முடிவெடுக்கும் தளம்' : 'Decision Support for Smallholders'}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation with Vibrant Rounded Pills - Clean Horizontal Scrollable Container */}
          <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1 px-1 max-w-[55vw] no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all ${
                    isActive
                      ? 'bg-yellow-400 text-green-950 font-bold shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-green-950' : 'text-green-200'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Area: Language Toggle, Farmer Badge, Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Language Toggle Button */}
            <button
              id="lang-toggle-btn"
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold border border-white/30 text-white whitespace-nowrap flex-shrink-0 transition-all shadow-xs"
              title="Switch Language (தமிழ் / English)"
            >
              <Globe className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Farmer Profile Switcher */}
            <div className="relative flex-shrink-0">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-full text-xs text-white transition-colors whitespace-nowrap"
              >
                <div className="w-7 h-7 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-green-950 font-black text-xs shadow-inner flex-shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left hidden md:block">
                  <p className="font-bold text-white leading-tight truncate max-w-[80px]">{user.name.split(' ')[0]}</p>
                  <p className="text-[9px] text-green-300 leading-tight">{user.district}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-green-300 flex-shrink-0" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-2xl shadow-2xl border border-green-100 p-2.5 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-green-950">{user.name}</p>
                    <p className="text-[11px] text-slate-500">{user.primaryCrop} • {user.landSizeAcres} Acres ({user.district})</p>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                    Switch Farmer Profile:
                  </p>
                  {demoFarmersList.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        switchFarmer(f.id);
                        setProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        user.id === f.id ? 'bg-[#F0F7F0] text-green-900 font-bold border border-green-200' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{f.name.split(' ')[0]}</div>
                        <div className="text-[10px] text-slate-500">{f.district} • {f.primaryCrop.split(' ')[0]}</div>
                      </div>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-600">{f.landSizeAcres} ac</span>
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1.5 pt-1">
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-green-800 font-bold hover:bg-green-50 rounded-lg flex items-center justify-between"
                    >
                      <span>{language === 'ta' ? 'முழு விவரம் பார்க்க' : 'View Full Farm Profile'}</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-white hover:bg-white/10 rounded-xl flex-shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-green-800/80 space-y-2">
            {/* Quick 3-Min Pitch Guide in Mobile Menu */}
            {onOpenPitchGuide && (
              <button
                type="button"
                onClick={() => {
                  onOpenPitchGuide();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-green-950 px-4 py-3 rounded-xl font-black text-sm shadow-md whitespace-nowrap"
              >
                <Presentation className="w-5 h-5 text-green-950" />
                <span>3-Min Hackathon Pitch Guide</span>
              </button>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-yellow-400 text-green-950 shadow-md'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-green-950' : 'text-green-300'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </header>
  );
};

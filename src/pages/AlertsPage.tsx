import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { AgriAlert } from '../types';
import { SpeechSpeaker } from '../components/SpeechSpeaker';
import {
  Bell,
  AlertTriangle,
  CloudRain,
  Bug,
  Calendar,
  TrendingUp,
  ShieldAlert,
  Clock,
  Zap
} from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [alerts, setAlerts] = useState<AgriAlert[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlerts() {
      setLoading(true);
      try {
        const res = await api.getAlerts();
        if (res.alerts) setAlerts(res.alerts);
      } catch (err) {
        console.error("Failed to load alerts:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAlerts();
  }, []);

  const filteredAlerts = selectedCategory === 'All'
    ? alerts
    : alerts.filter(a => a.type.toLowerCase().includes(selectedCategory.toLowerCase()));

  const getCategoryIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'weather': return CloudRain;
      case 'pest': return Bug;
      case 'scheme': return Calendar;
      case 'market': return TrendingUp;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header Banner - Vibrant Coral Red #FF7043 with Gold Accents */}
      <div className="bg-[#FF7043] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-3.5 py-1 rounded-full text-xs font-bold text-yellow-200">
              <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span>Hyperlocal Agricultural Early Warning System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.alerts.title}
            </h1>
            <p className="text-white/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {t.alerts.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: t.alerts.filterAll, val: 'All' },
          { label: t.alerts.filterWeather, val: 'Weather' },
          { label: t.alerts.filterPest, val: 'Pest' },
          { label: t.alerts.filterScheme, val: 'Scheme' },
          { label: t.alerts.filterMarket, val: 'Market' }
        ].map((cat) => (
          <button
            key={cat.val}
            onClick={() => setSelectedCategory(cat.val)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat.val
                ? 'bg-[#1B4332] text-white shadow-md'
                : 'bg-white border border-green-200 text-green-950 hover:bg-[#F0F7F0]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Alerts Grid */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const Icon = getCategoryIcon(alert.type);
          const speechText = language === 'ta'
            ? `${alert.titleTamil}. ${alert.messageTamil}. உடனடி நடவடிக்கை: ${alert.recommendedActionTamil}.`
            : `${alert.title}. ${alert.message}. Recommended action: ${alert.recommendedAction}.`;

          return (
            <div
              key={alert.id}
              className={`bg-white border rounded-3xl p-6 sm:p-7 transition-all shadow-sm space-y-3.5 ${
                alert.severity === 'Urgent'
                  ? 'border-red-300 bg-red-50/20'
                  : alert.severity === 'Warning'
                  ? 'border-yellow-300 bg-yellow-50/20'
                  : 'border-green-200 bg-green-50/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className={`p-2.5 rounded-xl ${
                    alert.severity === 'Urgent'
                      ? 'bg-red-100 text-red-700'
                      : alert.severity === 'Warning'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-xs text-slate-600 uppercase tracking-wider">
                    {alert.type} • {alert.district}
                  </span>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                    alert.severity === 'Urgent'
                      ? 'bg-red-600 text-white animate-pulse'
                      : alert.severity === 'Warning'
                      ? 'bg-yellow-400 text-green-950 font-black'
                      : 'bg-green-600 text-white'
                  }`}>
                    {alert.severity}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {alert.date || 'Today'}
                  </span>
                  <SpeechSpeaker
                    textToSpeak={speechText}
                    language={language}
                    size="sm"
                  />
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                {language === 'ta' ? alert.titleTamil : alert.title}
              </h3>

              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                {language === 'ta' ? alert.messageTamil : alert.message}
              </p>

              <div className="bg-[#F0F7F0] border border-green-200 rounded-2xl p-3.5 text-xs text-green-950 font-bold">
                <strong>{language === 'ta' ? 'செய்ய வேண்டிய உடனடி நடவடிக்கை:' : 'Recommended Farmer Action:'}</strong>{' '}
                {language === 'ta' ? alert.recommendedActionTamil : alert.recommendedAction}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

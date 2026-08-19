import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { WeatherData, WeatherCropRecommendation, AgriAlert, GovernmentScheme } from '../types';
import { SpeechSpeaker } from '../components/SpeechSpeaker';
import {
  Sprout,
  CloudSun,
  Droplets,
  AlertTriangle,
  Stethoscope,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Wind,
  CheckCircle2,
  Calendar,
  Sparkles,
  Volume2,
  Camera,
  Zap
} from 'lucide-react';

interface DashboardPageProps {
  setActiveTab: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ setActiveTab }) => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recommendation, setRecommendation] = useState<WeatherCropRecommendation | null>(null);
  const [alerts, setAlerts] = useState<AgriAlert[]>([]);
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        const [weatherRes, recRes, alertsRes, schemesRes] = await Promise.all([
          api.getWeather(user.district),
          api.getWeatherCropRecommendation({ district: user.district, crop: user.primaryCrop, stage: user.cropStage }),
          api.getAlerts(),
          api.getMatchedSchemes(user)
        ]);

        if (weatherRes.weather) setWeather(weatherRes.weather);
        if (recRes.recommendation) setRecommendation(recRes.recommendation);
        if (alertsRes.alerts) setAlerts(alertsRes.alerts);
        if (schemesRes.schemes) setSchemes(schemesRes.schemes);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  const highPriorityAlert = alerts[0];
  const topScheme = schemes[0];

  const speechText = language === 'ta'
    ? `வணக்கம் ${user.name}! இன்றைய முக்கிய வானிலை ஆலோசனை: ${recommendation?.sprayingAdvisory.safeToSpray ? 'இன்று மருந்து தெளிக்க உகந்த நாள்' : 'இன்று மருந்து தெளிக்க வேண்டாம், மழை வாய்ப்புள்ளது'}. ${recommendation?.irrigationReasonTamil || ''}`
    : `Welcome ${user.name}! Today's key farm advisory: ${recommendation?.sprayingAdvisory.safeToSpray ? 'Today is safe for foliar spraying' : 'Avoid spraying today due to expected rainfall'}. ${recommendation?.irrigationReason || ''}`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* 1. Hero Banner with Rich #1B4332 & Yellow Accents */}
      <div className="bg-[#1B4332] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-green-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xs border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold text-yellow-300">
              <Sprout className="w-3.5 h-3.5 text-yellow-400" />
              <span>{user.farmerCategory} • {user.district}, {user.state}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {t.dashboard.welcome}, {user.name}!
            </h1>

            <p className="text-green-100 text-xs sm:text-sm max-w-2xl leading-relaxed opacity-95">
              {language === 'ta'
                ? `உங்கள் ${user.primaryCrop} (${user.cropStage} பருவம்) பயிருக்கான இன்றைய AI முடிவெடுக்கும் ஆலோசனைகள் கீழே தயாராக உள்ளன.`
                : `Hyperlocal agro-meteorological decisions and disease protection for your ${user.primaryCrop} (${user.cropStage} stage).`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <SpeechSpeaker
              textToSpeak={speechText}
              language={language}
              label={language === 'ta' ? 'ஆலோசனையை கேட்க' : 'Listen Advisory'}
              size="lg"
            />
            <button
              onClick={() => setActiveTab('aiAssistant')}
              className="px-5 py-3 bg-yellow-400 hover:bg-yellow-500 text-green-950 font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-lg hover:scale-102 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-green-950" />
              <span>{t.dashboard.askAiVoice}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Spotlight: Scan Crop Leaf Assistant & Urgent Weather Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: AI Crop Disease Assistant Scanner Box */}
        <section className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-sm border border-green-100 flex flex-col sm:flex-row gap-6 items-center">
          <div
            onClick={() => setActiveTab('cropDoctor')}
            className="w-full sm:w-48 h-48 bg-[#F0F7F0] border-2 border-dashed border-green-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition-colors group shrink-0 p-4"
          >
            <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
              <Camera className="w-8 h-8 text-green-700" />
            </div>
            <span className="mt-3 font-bold text-green-900 text-center text-xs leading-tight">
              {language === 'ta' ? 'இலை படம் எடு' : 'Scan Crop Leaf'}<br/>
              <span className="text-[11px] font-medium text-green-700">
                {language === 'ta' ? 'AI நோய் கண்டறிதல்' : 'AI Disease Doctor'}
              </span>
            </span>
          </div>

          <div className="flex-1 space-y-3 w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                {t.nav.cropDoctor}
              </h2>
              <span className="text-[10px] bg-green-100 text-green-900 font-bold px-2.5 py-0.5 rounded-full uppercase">
                Ready for Diagnosis
              </span>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3.5 rounded-r-xl">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-yellow-900">
                    {language === 'ta' ? 'சமீபத்திய மாதிரி: நெல் இலை கருகல் நோய் (Rice Blast)' : 'Sample Pathology: Rice Blast / Bacterial Leaf Blight'}
                  </p>
                  <p className="text-[11px] text-yellow-800 italic mt-0.5">
                    {language === 'ta' ? 'AI துல்லிய அளவு: 94.8% (பரிந்துரை: சூடோமோனாஸ்)' : 'Confidence Score: 94.8% (Recommended: Pseudomonas fluorescens)'}
                  </p>
                </div>
                <span className="bg-yellow-200 text-yellow-900 text-[10px] px-2 py-0.5 rounded-md uppercase font-black">
                  Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-600">Immediate Action</p>
                <p className="font-semibold text-slate-800 mt-0.5">Drain excess standing water from field plots.</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-600">Bio-Remedy</p>
                <p className="font-semibold text-slate-800 mt-0.5">Apply balanced neem cake & bio-fertilizer.</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('cropDoctor')}
              className="text-xs font-bold text-green-800 hover:text-green-950 flex items-center gap-1.5 pt-1"
            >
              <span>{language === 'ta' ? 'முழு பரிசோதனை பக்கம் செல்ல' : 'Open Full Crop Doctor Scanner'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* Right 4 Cols: Coral Red #FF7043 Urgent Weather Alerts Box */}
        <section className="lg:col-span-4 bg-[#FF7043] rounded-3xl p-6 text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3">
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <span>{language === 'ta' ? 'அவசர வானிலை எச்சரிக்கை' : 'Urgent Weather Alerts'}</span>
            </h3>

            <div className="space-y-2.5">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/25">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-yellow-200">
                  {user.district} • Today Advisory
                </p>
                <p className="text-xs font-medium mt-1 leading-relaxed">
                  {language === 'ta'
                    ? highPriorityAlert?.messageTamil || 'கனமழை வாய்ப்புள்ளதால் மருந்து தெளிப்பதை தவிர்க்கவும்.'
                    : highPriorityAlert?.message || 'Heavy rainfall expected. Hold pesticide spraying and clear water drains.'}
                </p>
              </div>

              <div className="bg-white/15 p-3 rounded-2xl border border-white/15">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-white/80">
                  Next 24 Hours
                </p>
                <p className="text-xs mt-1 leading-relaxed opacity-90">
                  {language === 'ta'
                    ? 'ஈரப்பதம் 92% ஆக உயரும் வாய்ப்பு. பூஞ்சான நோய் பரவலை கண்காணிக்கவும்.'
                    : 'Relative humidity surging to 92%. Monitor paddy for fungal blast symptoms.'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('alerts')}
            className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 rounded-2xl text-xs transition-colors border border-white/30"
          >
            {t.dashboard.viewAllAlerts} →
          </button>
        </section>

      </div>

      {/* 3. AI Farming Plan (Red/Blue/Green actionable strips) & AI Assistant Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: AI Farming Plan Action Strips */}
        <section className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-sm border border-green-100 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {language === 'ta' ? 'இன்றைய AI விவசாய முடிவுகள்' : 'AI Daily Farming Plan'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">Hyperlocal agro-meteorological prescriptions for {user.primaryCrop}</p>
            </div>
            <span className="text-[10px] bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-extrabold uppercase">
              {user.district}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            
            {/* Strip 1: Spraying Window */}
            <div className={`flex items-center gap-4 p-4 rounded-2xl border ${
              recommendation?.sprayingAdvisory.safeToSpray
                ? 'bg-green-50 border-green-200 text-green-950'
                : 'bg-red-50 border-red-100 text-red-950'
            }`}>
              <div className="text-2xl shrink-0">
                {recommendation?.sprayingAdvisory.safeToSpray ? '🌿' : '🌧️'}
              </div>
              <div className="flex-1">
                <span className={`text-[10px] font-black uppercase tracking-wider block ${
                  recommendation?.sprayingAdvisory.safeToSpray ? 'text-green-700' : 'text-red-700'
                }`}>
                  {recommendation?.sprayingAdvisory.safeToSpray ? 'Spray Window Safe' : 'Avoid Spraying Today'}
                </span>
                <p className="text-xs font-bold leading-relaxed">
                  {language === 'ta'
                    ? recommendation?.sprayingAdvisory.reasonTamil
                    : recommendation?.sprayingAdvisory.reason}
                </p>
              </div>
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${
                recommendation?.sprayingAdvisory.safeToSpray ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'
              }`}>
                {recommendation?.sprayingAdvisory.bestWindow}
              </span>
            </div>

            {/* Strip 2: Irrigation Action */}
            <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-100 text-blue-950 rounded-2xl">
              <div className="text-2xl shrink-0">💧</div>
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block">
                  Irrigation Decision
                </span>
                <p className="text-xs font-bold leading-relaxed">
                  {language === 'ta'
                    ? recommendation?.irrigationReasonTamil
                    : recommendation?.irrigationReason}
                </p>
              </div>
              <span className="text-[10px] font-extrabold bg-blue-200 text-blue-900 px-2.5 py-1 rounded-full shrink-0">
                Soil: {weather?.soilMoistureEst}
              </span>
            </div>

            {/* Strip 3: Harvest / Stage Advisory */}
            <div className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 text-yellow-950 rounded-2xl">
              <div className="text-2xl shrink-0">🌾</div>
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-yellow-800 block">
                  Crop Stage ({user.cropStage})
                </span>
                <p className="text-xs font-bold leading-relaxed">
                  {language === 'ta'
                    ? `உங்கள் ${user.primaryCrop} பயிர் ${user.cropStage} பருவத்தில் உள்ளது. சமநிலையற்ற நைட்ரஜன் உர பயன்பாட்டை தவிர்க்கவும்.`
                    : `Your ${user.primaryCrop} is in ${user.cropStage} stage. Maintain optimal water drainage and monitor leaf tip color.`}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Right 4 Cols: Conversational Assistant Card (#1B4332 with Gold Button) */}
        <section className="lg:col-span-4 bg-[#1B4332] text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="z-10 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-white">Uzhavan AI Voice</h3>
                <p className="text-xs text-green-300 font-medium">Ask anything in Tamil or English</p>
              </div>
              <div className="bg-white/20 p-2.5 rounded-full text-yellow-400">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-black/25 rounded-2xl p-4 text-xs italic text-green-100 border border-white/10 space-y-1">
              <p>“நாளைக்கு மழை வருமா? மருந்து அடிக்கலாமா?”</p>
              <p className="text-green-300">“How to apply for 100% drip subsidy?”</p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('aiAssistant')}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-950 font-black py-3.5 rounded-2xl mt-4 text-xs sm:text-sm transition-all shadow-lg hover:scale-102"
          >
            Start Voice Conversation
          </button>
          
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-green-600 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        </section>

      </div>

      {/* 4. Government Scheme Matcher Highlight Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-700" />
              <span>{t.dashboard.matchedSchemes}</span>
            </h3>
            <p className="text-xs text-slate-500">Subsidies matched for {user.name} ({user.farmerCategory})</p>
          </div>

          <button
            onClick={() => setActiveTab('schemeMatcher')}
            className="text-xs font-bold text-green-800 hover:text-green-950 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{language === 'ta' ? 'அனைத்து திட்டங்கள் பார்க்க' : 'View All Scheme Matches'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {schemes.slice(0, 3).map((scheme) => (
            <div
              key={scheme.id}
              onClick={() => setActiveTab('schemeMatcher')}
              className="p-4 rounded-2xl border border-green-100 hover:border-green-400 hover:shadow-md transition-all cursor-pointer bg-green-50/30 flex flex-col justify-between space-y-2.5"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-xs font-bold text-green-950 line-clamp-1">
                    {language === 'ta' ? scheme.nameTamil : scheme.name}
                  </h4>
                  <span className="text-[10px] bg-green-200 text-green-900 font-extrabold px-2 py-0.5 rounded-full shrink-0">
                    {scheme.criteriaMatchScore}% Match
                  </span>
                </div>
                <p className="text-xs font-bold text-amber-700 mt-1">
                  {language === 'ta' ? scheme.maxBenefitTamil : scheme.maxBenefit}
                </p>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                  {language === 'ta' ? scheme.whyRelevantTamil : scheme.whyRelevant}
                </p>
              </div>

              <div className="flex gap-1.5 pt-1">
                <span className="px-2 py-0.5 bg-white rounded-md text-[10px] font-semibold border border-slate-200 text-slate-600">
                  {scheme.sponsoringBody ? scheme.sponsoringBody.split(' ')[0] : 'Govt Scheme'}
                </span>
                <span className="px-2 py-0.5 bg-white rounded-md text-[10px] font-semibold border border-slate-200 text-slate-600">
                  {user.farmerCategory.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setActiveTab('schemeMatcher')}
          className="w-full border-2 border-green-700 text-green-800 hover:bg-green-700 hover:text-white font-extrabold py-3 rounded-2xl text-xs transition-all shadow-xs"
        >
          {t.dashboard.applyScheme}
        </button>
      </div>

    </div>
  );
};

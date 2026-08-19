import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { WeatherData, WeatherCropRecommendation } from '../types';
import { SpeechSpeaker } from '../components/SpeechSpeaker';
import {
  CloudSun,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ShieldAlert,
  Sparkles,
  MapPin,
  Clock,
  Zap
} from 'lucide-react';

export const WeatherAdvisoryPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [selectedDistrict, setSelectedDistrict] = useState<string>(user.district || 'Thanjavur');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recommendation, setRecommendation] = useState<WeatherCropRecommendation | null>(null);
  const [loading, setLoading] = useState(true);

  const districts = ['Thanjavur', 'Dindigul', 'Coimbatore', 'Madurai'];

  useEffect(() => {
    async function loadWeatherData() {
      setLoading(true);
      try {
        const [wRes, rRes] = await Promise.all([
          api.getWeather(selectedDistrict),
          api.getWeatherCropRecommendation({
            district: selectedDistrict,
            crop: user.primaryCrop,
            stage: user.cropStage
          })
        ]);

        if (wRes.weather) setWeather(wRes.weather);
        if (rRes.recommendation) setRecommendation(rRes.recommendation);
      } catch (err) {
        console.error("Failed to load weather advisory:", err);
      } finally {
        setLoading(false);
      }
    }

    loadWeatherData();
  }, [selectedDistrict, user]);

  const speechAdvisoryText = recommendation
    ? (language === 'ta'
        ? `${selectedDistrict} மாவட்ட வானிலை ஆலோசனை: ${recommendation.sprayingAdvisory.safeToSpray ? 'இன்று மருந்து தெளிக்க உகந்த சூழல்' : 'இன்று மருந்து தெளிக்க வேண்டாம்'}. ${recommendation.irrigationReasonTamil}. ${recommendation.rainWarningNoteTamil}`
        : `Weather advisory for ${selectedDistrict}: ${recommendation.sprayingAdvisory.safeToSpray ? 'Optimal window for pesticide spray' : 'Unsafe to spray today due to rain risk'}. ${recommendation.irrigationReason}. ${recommendation.rainWarningNote}`)
    : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Page Header Banner - Vibrant #1B4332 */}
      <div className="bg-[#1B4332] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 px-3.5 py-1 rounded-full text-xs font-bold text-yellow-300">
              <CloudSun className="w-3.5 h-3.5 text-yellow-400" />
              <span>IMD Agromet + Agro-Meteorological Crop Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.weather.title}
            </h1>
            <p className="text-green-100 text-xs sm:text-sm max-w-2xl leading-relaxed opacity-95">
              {t.weather.subtitle}
            </p>
          </div>

          {/* District Selector */}
          <div className="bg-green-950/80 border border-green-800/80 rounded-2xl p-3 text-xs shrink-0 space-y-1.5 shadow-md">
            <label className="text-yellow-300 font-bold block text-[11px] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-yellow-400" />
              <span>{t.weather.selectDistrict}</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-[#1B4332] text-white border border-green-700 rounded-xl px-3 py-2 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d} {d === 'Thanjavur' ? '(தஞ்சாவூர் - Delta)' : d === 'Dindigul' ? '(திண்டுக்கல்)' : d === 'Coimbatore' ? '(கோயம்புத்தூர்)' : '(மதுரை)'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 1. Hyperlocal Raw Meteorological Metrics */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></div>
            <h2 className="font-extrabold text-slate-900 text-sm">
              {t.weather.currentConditions}: <span className="text-green-800 font-black">{weather?.location}</span>
            </h2>
          </div>
          <SpeechSpeaker
            textToSpeak={speechAdvisoryText}
            language={language}
            label={language === 'ta' ? 'ஆலோசனையை கேட்க' : 'Listen Advisory'}
            size="sm"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="bg-[#F0F7F0] border border-green-200/70 rounded-2xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-green-900 block">{t.weather.temp}</span>
            <div className="text-xl font-black text-slate-900 mt-1">{weather?.temperature}°C</div>
            <span className="text-[10px] text-slate-600">Feels {weather?.feelsLike}°C</span>
          </div>

          <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-blue-900 block">{t.weather.rainProb}</span>
            <div className={`text-xl font-black mt-1 ${
              (weather?.rainProbability || 0) >= 50 ? 'text-blue-600' : 'text-slate-800'
            }`}>
              {weather?.rainProbability}%
            </div>
            <span className="text-[10px] text-slate-600">{weather?.rainfallExpectedMm} mm exp</span>
          </div>

          <div className="bg-cyan-50/70 border border-cyan-200/70 rounded-2xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-cyan-900 block">{t.weather.humidity}</span>
            <div className="text-xl font-black text-slate-900 mt-1">{weather?.humidity}%</div>
            <span className="text-[10px] text-slate-600">Canopy moist</span>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-900 block">{t.weather.windSpeed}</span>
            <div className="text-xl font-black text-slate-900 mt-1">{weather?.windSpeed} km/h</div>
            <span className="text-[10px] text-slate-600">Spray drift</span>
          </div>

          <div className="bg-green-50 border border-green-200/70 rounded-2xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-green-900 block">{t.weather.soilMoisture}</span>
            <div className="text-xl font-black text-green-800 mt-1">{weather?.soilMoistureEst}</div>
            <span className="text-[10px] text-slate-600">Root zone</span>
          </div>

          <div className="bg-yellow-50/80 border border-yellow-200/70 rounded-2xl p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-yellow-900 block">UV Index</span>
            <div className="text-xl font-black text-yellow-700 mt-1">{weather?.uvIndex} / 11</div>
            <span className="text-[10px] text-slate-600">Sun intensity</span>
          </div>

        </div>
      </div>

      {/* 2. AI Agronomic Decision Engine */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span>{t.weather.decisionEngine} ({user.primaryCrop} • {user.cropStage} Stage)</span>
          </h2>
          <span className="text-xs bg-yellow-100 text-yellow-900 font-bold px-3 py-1 rounded-full border border-yellow-200">
            Personalized Field Advisory
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card A: Spraying Window */}
          <div className={`rounded-3xl p-6 border shadow-sm space-y-3 ${
            recommendation?.sprayingAdvisory.safeToSpray
              ? 'bg-[#F0F7F0] border-green-200 text-green-950'
              : 'bg-red-50/90 border-red-200 text-red-950'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                {t.weather.sprayTitle}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-black ${
                recommendation?.sprayingAdvisory.safeToSpray
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
              }`}>
                {recommendation?.sprayingAdvisory.safeToSpray
                  ? (language === 'ta' ? 'உகந்த நேரம்' : 'Optimal Window')
                  : (language === 'ta' ? 'தெளிக்க வேண்டாம்' : 'High Washout Risk')}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              {language === 'ta'
                ? recommendation?.sprayingAdvisory.reasonTamil
                : recommendation?.sprayingAdvisory.reason}
            </p>

            <div className="bg-white rounded-2xl p-3.5 text-xs border border-slate-200/80 text-slate-800 shadow-2xs">
              <div className="font-bold flex items-center gap-1.5 text-green-900 mb-0.5">
                <Clock className="w-3.5 h-3.5 text-green-700" />
                <span>{language === 'ta' ? 'பரிந்துரைக்கப்படும் நேரம்:' : 'Target Timeframe:'}</span>
              </div>
              <p className="text-slate-700 font-medium">{recommendation?.sprayingAdvisory.bestWindow}</p>
            </div>
          </div>

          {/* Card B: Irrigation Action */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-3xl p-6 shadow-sm space-y-3 text-blue-950">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                {t.weather.irrigationTitle}
              </span>
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>

            <div className="text-sm font-black text-blue-900">
              {recommendation?.irrigationNeeded
                ? (language === 'ta' ? 'பாசனம் உடனடியாக தேவை' : 'Irrigation Cycle Scheduled')
                : (language === 'ta' ? 'பாசனத்தை தற்காலிகமாக நிறுத்துக' : 'Hold Irrigation Cycle')}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              {language === 'ta'
                ? recommendation?.irrigationReasonTamil
                : recommendation?.irrigationReason}
            </p>
          </div>

          {/* Card C: Heavy Rain & Drainage Warning in Vibrant Amber/Red */}
          <div className="bg-yellow-50/80 border border-yellow-300 rounded-3xl p-6 shadow-sm space-y-3 text-yellow-950">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                {t.weather.rainTitle}
              </span>
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>

            <div className="text-sm font-black text-yellow-900">
              {recommendation?.heavyRainExpected
                ? (language === 'ta' ? 'கனமழை & வடிகால் எச்சரிக்கை!' : 'Heavy Rain Inundation Alert')
                : (language === 'ta' ? 'கனமழை அபாயம் இல்லை' : 'Normal Conditions')}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              {language === 'ta'
                ? recommendation?.rainWarningNoteTamil
                : recommendation?.rainWarningNote}
            </p>
          </div>

        </div>
      </div>

      {/* 3. Crop-Specific Weather Risk Matrix */}
      {recommendation?.cropRiskAlerts && recommendation.cropRiskAlerts.length > 0 && (
        <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>{t.weather.cropRiskTitle}</span>
          </h3>

          <div className="space-y-3">
            {recommendation.cropRiskAlerts.map((risk, idx) => (
              <div key={idx} className="bg-red-50/60 border border-red-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-red-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    {language === 'ta' ? risk.riskTitleTamil : risk.riskTitle}
                  </span>
                  <span className="text-[10px] bg-red-200 text-red-950 font-black px-2.5 py-0.5 rounded-full">
                    {risk.level} Risk
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {language === 'ta' ? risk.riskDescriptionTamil : risk.riskDescription}
                </p>
                <div className="bg-white p-3 rounded-xl border border-red-200 text-xs font-semibold text-red-950">
                  <strong>{language === 'ta' ? 'பரிந்துரைக்கப்படும் நடவடிக்கை:' : 'Corrective Action:'}</strong>{' '}
                  {language === 'ta' ? risk.actionTamil : risk.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 5-Day Agricultural Forecast Table / Cards */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4 text-green-700" />
          <span>{t.weather.fiveDayForecast}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {weather?.forecast.map((fc, idx) => (
            <div
              key={idx}
              className="bg-[#FCF9F1] border border-green-200/80 rounded-2xl p-4 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-xs text-slate-900">
                    {language === 'ta' ? fc.dayTamil : fc.day}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{fc.date}</span>
                </div>
                <p className="text-xs text-slate-700 font-semibold truncate">
                  {language === 'ta' ? fc.conditionTamil : fc.condition}
                </p>
              </div>

              <div className="flex items-baseline justify-between text-xs">
                <span className="font-black text-slate-900 text-lg">{fc.tempMax}°C</span>
                <span className="text-slate-500 font-medium">Min: {fc.tempMin}°C</span>
              </div>

              <div className="text-[11px] text-slate-600 space-y-0.5 border-t border-slate-200/80 pt-2">
                <div>🌧️ Rain Prob: <strong>{fc.rainProb}%</strong> ({fc.rainfallMm}mm)</div>
              </div>

              <div>
                <span className={`block text-center text-[10px] font-black py-1.5 px-2 rounded-xl ${
                  fc.spraySuitability === 'Optimal'
                    ? 'bg-green-200 text-green-900'
                    : fc.spraySuitability === 'Caution'
                    ? 'bg-yellow-200 text-yellow-900'
                    : 'bg-red-200 text-red-900'
                }`}>
                  {fc.spraySuitability === 'Optimal'
                    ? t.weather.optimal
                    : fc.spraySuitability === 'Caution'
                    ? t.weather.caution
                    : t.weather.unsafe}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

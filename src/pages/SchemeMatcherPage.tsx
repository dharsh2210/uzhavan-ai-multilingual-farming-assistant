import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { GovernmentScheme } from '../types';
import { SpeechSpeaker } from '../components/SpeechSpeaker';
import {
  FileCheck,
  ShieldCheck,
  Award,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
  Layers,
  Sparkles,
  Phone,
  FileText
} from 'lucide-react';

export const SchemeMatcherPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter state for dynamic criteria testing
  const [filterLandSize, setFilterLandSize] = useState<number>(user.landSizeAcres);
  const [filterCategory, setFilterCategory] = useState<string>(user.farmerCategory);

  useEffect(() => {
    async function loadSchemes() {
      setLoading(true);
      try {
        const res = await api.getMatchedSchemes({
          ...user,
          landSizeAcres: filterLandSize,
          farmerCategory: filterCategory
        });
        if (res.schemes) {
          setSchemes(res.schemes);
          if (res.schemes.length > 0) {
            setExpandedSchemeId(res.schemes[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to match schemes:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSchemes();
  }, [user, filterLandSize, filterCategory]);

  const filteredSchemes = selectedCategory === 'All'
    ? schemes
    : schemes.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const toggleExpand = (id: string) => {
    setExpandedSchemeId(expandedSchemeId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header Banner - Vibrant #1B4332 with Gold Accents */}
      <div className="bg-[#1B4332] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 px-3.5 py-1 rounded-full text-xs font-bold text-yellow-300">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span>Deterministic Rule-Engine • 100% Transparent Match</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.schemes.title}
            </h1>
            <p className="text-green-100 text-xs sm:text-sm max-w-2xl leading-relaxed opacity-95">
              {t.schemes.subtitle}
            </p>
          </div>

          <div className="shrink-0 bg-green-950/80 border border-green-800/80 rounded-2xl p-4 text-xs shadow-md">
            <span className="text-yellow-300 block text-[10px] uppercase font-bold">Eligibility Profile</span>
            <span className="font-bold text-white block mt-0.5">{user.name} ({user.farmerCategory})</span>
            <span className="text-[11px] text-green-200">{user.landSizeAcres} Acres • {user.district}</span>
          </div>
        </div>
      </div>

      {/* Interactive Criteria Simulation & Category Filter Bar */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-green-700" />
            <h2 className="font-extrabold text-slate-900 text-sm">{t.schemes.filterByCategory}:</h2>
          </div>

          {/* Quick Simulation Toggles */}
          <div className="flex items-center gap-3 text-xs">
            <label className="text-slate-600 font-semibold">Simulate Land Holding:</label>
            <select
              value={filterLandSize}
              onChange={(e) => {
                const size = parseFloat(e.target.value);
                setFilterLandSize(size);
                if (size <= 2.5) setFilterCategory('Marginal Farmer (< 2.5 Acres)');
                else if (size <= 5.0) setFilterCategory('Small Farmer (2.5 - 5 Acres)');
                else setFilterCategory('Medium/Large Farmer (> 5 Acres)');
              }}
              className="bg-[#F0F7F0] border border-green-200 rounded-xl px-3 py-1.5 text-green-950 font-bold focus:ring-2 focus:ring-green-600"
            >
              <option value="1.8">1.8 Acres (Marginal Farmer)</option>
              <option value="3.5">3.5 Acres (Small Farmer)</option>
              <option value="6.0">6.0 Acres (Medium/Large)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {['All', 'Irrigation', 'Income', 'Insurance', 'Solar', 'Organic'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1B4332] text-white shadow-sm'
                  : 'bg-[#F0F7F0] text-green-900 hover:bg-green-100 border border-green-200/60'
              }`}
            >
              {cat === 'All' ? 'All Schemes' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Matched Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedSchemeId === scheme.id;
          const speechText = language === 'ta'
            ? `${scheme.nameTamil}. அதிகபட்ச மானியம்: ${scheme.maxBenefitTamil}. தகுதி விளக்கம்: ${scheme.whyRelevantTamil}. தேவையான ஆவணங்கள்: ${(scheme.requiredDocumentsTamil || scheme.requiredDocuments).join(', ')}.`
            : `${scheme.name}. Maximum benefit: ${scheme.maxBenefit}. Eligibility reason: ${scheme.whyRelevant}. Required documents: ${scheme.requiredDocuments.join(', ')}.`;

          return (
            <div
              key={scheme.id}
              className={`bg-white border rounded-3xl transition-all shadow-sm overflow-hidden ${
                isExpanded ? 'border-green-400 ring-2 ring-yellow-400' : 'border-green-100 hover:border-green-300'
              }`}
            >
              {/* Scheme Summary Row */}
              <div
                onClick={() => toggleExpand(scheme.id)}
                className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {scheme.sponsoringBody || 'Government of India / Tamil Nadu'}
                    </span>
                    <span className="text-[10px] bg-yellow-400 text-green-950 font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                      {scheme.criteriaMatchScore}% {t.schemes.matchScore}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    {language === 'ta' ? scheme.nameTamil : scheme.name}
                  </h3>

                  <p className="text-xs sm:text-sm font-extrabold text-amber-700">
                    {language === 'ta' ? scheme.maxBenefitTamil : scheme.maxBenefit}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <SpeechSpeaker
                    textToSpeak={speechText}
                    language={language}
                    size="sm"
                  />
                  <div className="p-2.5 bg-[#F0F7F0] rounded-xl text-green-900">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-3 border-t border-slate-100 bg-[#FCF9F1]/70 space-y-5">
                  
                  {/* Why Relevant to Farmer in #F0F7F0 Container */}
                  <div className="bg-[#F0F7F0] border border-green-200 rounded-2xl p-4 text-xs text-green-950">
                    <strong className="block text-green-900 font-extrabold mb-1">
                      {t.schemes.whyRelevant}:
                    </strong>
                    <p className="leading-relaxed font-semibold">
                      {language === 'ta' ? scheme.whyRelevantTamil : scheme.whyRelevant}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Eligibility Criteria */}
                    <div className="bg-white border border-green-100 rounded-2xl p-4 space-y-2">
                      <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>{t.schemes.eligibilityCriteria}</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {(language === 'ta' ? (scheme.basicEligibilityTamil || scheme.basicEligibility) : scheme.basicEligibility).map((el, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                            <span className="font-medium">{el}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Required Documents */}
                    <div className="bg-white border border-green-100 rounded-2xl p-4 space-y-2">
                      <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span>{t.schemes.requiredDocuments}</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {(language === 'ta' ? (scheme.requiredDocumentsTamil || scheme.requiredDocuments) : scheme.requiredDocuments).map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                            <span className="font-medium">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Step-by-Step Application Steps */}
                  <div className="bg-white border border-green-100 rounded-2xl p-4 space-y-2.5">
                    <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-purple-600" />
                      <span>{t.schemes.applicationSteps}</span>
                    </h4>
                    <ol className="space-y-2 text-xs text-slate-700">
                      {(language === 'ta' ? (scheme.applicationGuidanceTamil || scheme.applicationGuidance) : scheme.applicationGuidance).map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="font-extrabold text-purple-900 bg-purple-100 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-[10px]">
                            {idx + 1}
                          </span>
                          <span className="font-medium">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Actions & Official Portal Link with Gold Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <div className="text-xs text-slate-600 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-green-700" />
                      <span>Helpline: <strong className="text-slate-900 font-bold">{scheme.helpline || '1800-180-1551'}</strong></span>
                    </div>

                    <a
                      href={scheme.portalUrl || 'https://agricoop.nic.in'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-green-950 px-6 py-3 rounded-2xl text-xs font-black transition-all shadow-md hover:scale-102"
                    >
                      <span>{t.schemes.applyOnline}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-green-950" />
                    </a>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

import React from 'react';
import { X, Cpu, Database, CloudRain, ShieldCheck, Languages, Eye, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';

interface SystemArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemArchitectureModal: React.FC<SystemArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 text-white px-6 py-4 flex items-center justify-between z-10 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-lg font-bold">Uzhavan AI - System & AI Architecture</h2>
              <p className="text-xs text-slate-300">Clean Separation: Multi-Modal AI + Rule Decision Engine + MongoDB Persistence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-slate-700 text-sm">
          
          {/* Architecture Diagram Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              Full-Stack End-to-End Topology
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
              <div className="bg-white border border-emerald-200 rounded-lg p-3 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Frontend Tier</span>
                <p className="font-semibold text-slate-800 mt-1">React + Tailwind CSS</p>
                <p className="text-xs text-slate-500 mt-0.5">Mobile-first, Web Speech API Voice, Bilingual i18n (தமிழ் / EN)</p>
              </div>

              <div className="bg-white border border-blue-200 rounded-lg p-3 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">API Gateway</span>
                <p className="font-semibold text-slate-800 mt-1">Node.js + Express</p>
                <p className="text-xs text-slate-500 mt-0.5">REST APIs, JWT Auth, Input Validation, Agro-Engine</p>
              </div>

              <div className="bg-white border border-purple-200 rounded-lg p-3 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">AI & ML Engine</span>
                <p className="font-semibold text-slate-800 mt-1">Gemini 3.7 Flash + CV</p>
                <p className="text-xs text-slate-500 mt-0.5">Multimodal Plant Vision, TNAU Agro-Grounding, Low-Confidence Safety</p>
              </div>

              <div className="bg-white border border-amber-200 rounded-lg p-3 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">Persistence</span>
                <p className="font-semibold text-slate-800 mt-1">MongoDB Collections</p>
                <p className="text-xs text-slate-500 mt-0.5">users, crops, predictions, weather, schemes, alerts, logs</p>
              </div>
            </div>
          </div>

          {/* 4 Core Pillars Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Pillar 1 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-bold mb-2">
                <Eye className="w-4 h-4" />
                <span>1. Multi-Modal Crop Disease Diagnostics</span>
              </div>
              <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                Leaf Image → Base64 Stream → Gemini 3.7 Flash Vision / Edge CV Pipeline → Feature Classification → Confidence Meter & Uncertainty Flag → Organic & Chemical Remedies.
              </p>
              <div className="bg-emerald-50 rounded-md p-2 text-[11px] text-emerald-800">
                <strong>Safety Guardrail:</strong> When confidence drops below 75%, system triggers an explicit advisory notice and redirects to local Krishi Vigyan Kendra (KVK).
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
              <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                <CloudRain className="w-4 h-4" />
                <span>2. Agro-Meteorological Decision Engine</span>
              </div>
              <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                Combines IMD Agromet Weather (Rain, Wind, Humidity, Soil Moisture) + Farmer Crop Type & Stage (Vegetative/Flowering) to prescribe actionable guidance (e.g. spray safety windows, irrigation hold, drainage alerts).
              </p>
              <div className="bg-blue-50 rounded-md p-2 text-[11px] text-blue-800">
                <strong>Distinction:</strong> Clearly separates raw meteorological data from agronomic AI recommendations.
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
              <div className="flex items-center gap-2 text-amber-700 font-bold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>3. Transparent Government Scheme Matcher</span>
              </div>
              <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                Rule-based deterministic engine evaluated against farmer's landholding size (&lt; 2.5 acres for marginal, &lt; 5 acres for small), crop notification status, and state criteria with 100% explainability.
              </p>
              <div className="bg-amber-50 rounded-md p-2 text-[11px] text-amber-800">
                <strong>No Hallucinations:</strong> Every scheme links to verified official government portals (PM-KISAN, PMFBY, TN Horticulture).
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
              <div className="flex items-center gap-2 text-purple-700 font-bold mb-2">
                <Languages className="w-4 h-4" />
                <span>4. Grounded Multilingual Voice Assistant</span>
              </div>
              <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                Seamless Tamil (தமிழ்) and English voice interaction powered by Web Speech Recognition + Gemini Conversational Agent grounded with farmer profile and hyperlocal context.
              </p>
              <div className="bg-purple-50 rounded-md p-2 text-[11px] text-purple-800">
                <strong>Accessibility:</strong> High-contrast typography, large touch targets, and full Tamil Text-to-Speech playback for low-literacy farmers.
              </div>
            </div>

          </div>

          {/* Database Schema Reference */}
          <div className="bg-slate-900 text-slate-200 rounded-xl p-4 text-xs font-mono">
            <div className="text-emerald-400 font-bold mb-2 flex items-center gap-1.5 font-sans">
              <Database className="w-4 h-4" />
              MongoDB Collections Schema
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>• <strong>users:</strong> id, name, phone, state, district, landSizeAcres, category, primaryCrop, stage, soilType</div>
              <div>• <strong>diseasePredictions:</strong> id, cropName, diseaseName, confidence, remedies[], timestamp</div>
              <div>• <strong>weatherData:</strong> district, temp, humidity, windSpeed, rainProbability, forecast[]</div>
              <div>• <strong>governmentSchemes:</strong> id, name, category, eligibility[], requiredDocs[], portalUrl</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium text-xs transition-colors"
          >
            Close Architecture View
          </button>
        </div>

      </div>
    </div>
  );
};

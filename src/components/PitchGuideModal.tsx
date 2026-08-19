import React from 'react';
import { X, Presentation, Clock, CheckCircle2, AlertTriangle, ArrowRight, Award, Sparkles } from 'lucide-react';

interface PitchGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const PitchGuideModal: React.FC<PitchGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab
}) => {
  if (!isOpen) return null;

  const demoSteps = [
    {
      minute: "0:00 - 0:45",
      title: "Step 1: The Underserved Problem & Farmer Persona",
      focus: "Dashboard & Persona Switcher",
      tab: "dashboard",
      script: "Introduce Murugan, a 1.8-acre marginal paddy farmer in Thanjavur. Smallholders face 3 crippling barriers: late disease detection causing 35% crop loss, unpredictable weather destroying pesticide investments, and missing out on government subsidies due to complex paperwork and language barriers."
    },
    {
      minute: "0:45 - 1:30",
      title: "Step 2: AI Crop Doctor (Multi-Modal Leaf Diagnostics)",
      focus: "AI Crop Doctor Page",
      tab: "cropDoctor",
      script: "Click 'Test with Sample Leaves' or upload a leaf photo. Show instant diagnosis of Rice Blast / BPH with 94.8% confidence, root causes, organic biological remedies (Pseudomonas), and clear low-confidence safety disclaimers in Tamil & English."
    },
    {
      minute: "1:30 - 2:15",
      title: "Step 3: Weather-Aware Decision Engine",
      focus: "Weather Advisory Page",
      tab: "weatherAdvisory",
      script: "Show how Uzhavan AI doesn't just show numbers; it generates actionable prescriptions: 'Heavy rain tomorrow in Thanjavur: Do not spray pesticide today (unsafe window), pause canal irrigation, deepen drainage channels.'"
    },
    {
      minute: "2:15 - 2:45",
      title: "Step 4: 100% Transparent Scheme Matcher",
      focus: "Scheme Matcher Page",
      tab: "schemeMatcher",
      script: "Demonstrate automated matching showing Murugan qualifies for 100% Micro Irrigation Subsidy, PM-KISAN (₹6,000), and Kalaignar Scheme with step-by-step application guidance and verified official links."
    },
    {
      minute: "2:45 - 3:00",
      title: "Step 5: Multilingual Voice AI & Social Impact",
      focus: "Impact Dashboard & Voice Assistant",
      tab: "impact",
      script: "Demonstrate Tamil Voice Q&A ('நாளைக்கு மழை வருமா?'), play Text-to-Speech audio, and highlight the Impact Metrics Dashboard (14,850+ farmers supported, ₹342 Lakhs crop loss averted)."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-indigo-950 text-white px-6 py-4 flex items-center justify-between z-10 border-b border-indigo-900">
          <div className="flex items-center gap-2.5">
            <Presentation className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-lg font-bold">Hackathon 3-Minute Live Presentation Script</h2>
              <p className="text-xs text-indigo-200">Follow this sequenced flow for maximum judging impact</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-indigo-300 hover:text-white p-1 rounded-lg hover:bg-indigo-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-slate-700">
          
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
            <Award className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-900">
              <strong className="block text-sm font-bold text-indigo-950 mb-0.5">Core Pitch Thesis: AI for Public Good</strong>
              Uzhavan AI turns complex AI into a simple, pocket-sized advisory lifeline for 100M+ small & marginal farmers in India with zero jargon, full Tamil voice support, and high trust.
            </div>
          </div>

          {/* Stepper Flow */}
          <div className="space-y-3">
            {demoSteps.map((step, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white hover:border-indigo-300 transition-all shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 font-bold text-xs bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" />
                    {step.minute}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Focus: {step.focus}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.script}</p>

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateToTab(step.tab);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <span>Jump to {step.focus}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg font-medium text-xs transition-colors"
          >
            Ready to Demo
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { DiseasePrediction } from '../types';
import { sampleLeafGallery, SampleLeaf } from '../data/sampleDiseases';
import { SpeechSpeaker } from '../components/SpeechSpeaker';
import {
  Upload,
  Camera,
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Info,
  Sparkles,
  FlaskConical,
  Sprout
} from 'lucide-react';

export const DiseaseDetectionPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedSample, setSelectedSample] = useState<SampleLeaf | null>(null);
  const [prediction, setPrediction] = useState<DiseasePrediction | null>(sampleLeafGallery[0].prediction);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTabRemedy, setActiveTabRemedy] = useState<'all' | 'organic' | 'chemical'>('all');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    let detectedCrop = selectedCrop;
    if (!detectedCrop) {
      if (fileName.includes('banana') || fileName.includes('sigatoka') || fileName.includes('வாழை') || fileName.includes('plantain')) {
        detectedCrop = 'Banana';
        setSelectedCrop('Banana');
      } else if (fileName.includes('tomato') || fileName.includes('தக்காளி')) {
        detectedCrop = 'Tomato';
        setSelectedCrop('Tomato');
      } else if (fileName.includes('cotton') || fileName.includes('பருத்தி')) {
        detectedCrop = 'Cotton';
        setSelectedCrop('Cotton');
      } else if (fileName.includes('maize') || fileName.includes('corn') || fileName.includes('மக்காச்சோளம்')) {
        detectedCrop = 'Maize';
        setSelectedCrop('Maize');
      } else if (fileName.includes('rice') || fileName.includes('paddy') || fileName.includes('நெல்')) {
        detectedCrop = 'Rice (Paddy)';
        setSelectedCrop('Rice (Paddy)');
      }
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setPreviewImage(base64);
      setSelectedSample(null);
      triggerAnalysis(base64, undefined, detectedCrop);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: SampleLeaf) => {
    setSelectedSample(sample);
    setPreviewImage(null);
    setSelectedCrop(sample.cropName.split(' ')[0]);
    setPrediction(sample.prediction);
  };

  const triggerAnalysis = async (base64Image?: string, sampleId?: string, explicitCrop?: string) => {
    setIsAnalyzing(true);
    try {
      const cropToUse = explicitCrop !== undefined ? explicitCrop : selectedCrop;
      const res = await api.analyzeLeaf({
        image: base64Image || previewImage || undefined,
        sampleId: sampleId,
        cropHint: cropToUse || undefined,
        preferredLanguage: language
      });

      if (res.prediction) {
        setPrediction(res.prediction);
        if (res.prediction.cropName && !selectedCrop) {
          setSelectedCrop(res.prediction.cropName.split(' ')[0]);
        }
      }
    } catch (err) {
      console.error("Leaf analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const speechDiagnosisText = prediction
    ? (language === 'ta'
        ? `கண்டறியப்பட்ட பயிர் பாதிப்பு: ${prediction.diseaseNameTamil}. துல்லிய அளவு ${prediction.confidence} சதவீதம். காரணங்கள்: ${prediction.possibleCausesTamil.slice(0, 2).join(', ')}. பரிந்துரைக்கப்படும் இயற்கை மருந்து: ${prediction.recommendedMedicines.find(m => m.type === 'Organic/Bio')?.name || 'சூடோமோனாஸ்'}.`
        : `Detected condition: ${prediction.diseaseName}. Confidence score ${prediction.confidence} percent. Main causes include ${prediction.possibleCauses.slice(0, 2).join(', ')}. Recommended biological remedy: ${prediction.recommendedMedicines.find(m => m.type === 'Organic/Bio')?.name || 'Pseudomonas fluorescens'}.`)
    : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header Banner - Vibrant #1B4332 with Gold Accents */}
      <div className="bg-[#1B4332] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 px-3.5 py-1 rounded-full text-xs font-bold text-yellow-300">
              <Stethoscope className="w-3.5 h-3.5 text-yellow-400" />
              <span>Multi-Modal Vision + Gemini Agronomic Diagnostic</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.cropDoctor.title}
            </h1>
            <p className="text-green-100 text-xs sm:text-sm max-w-2xl leading-relaxed opacity-95">
              {t.cropDoctor.subtitle}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <div className="bg-green-950/60 border border-green-800/80 rounded-2xl px-4 py-2 text-xs">
              <span className="text-green-300 block text-[10px] uppercase font-bold">Diagnostic Model</span>
              <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Cpu className="w-3.5 h-3.5 text-yellow-400" />
                {prediction?.modelEngine || 'Gemini Multimodal AI'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Upload & Preset Leaf Gallery (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Upload Card */}
          <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Upload className="w-4 h-4 text-green-700" />
                <span>{t.cropDoctor.uploadTitle}</span>
              </h2>

              {/* Crop Hint Selector */}
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="text-xs bg-[#F0F7F0] border border-green-200 rounded-xl px-3 py-1.5 text-green-900 font-bold focus:ring-2 focus:ring-green-600"
              >
                <option value="">{t.cropDoctor.allCrops}</option>
                <option value="Rice (Paddy)">Rice / Paddy (நெல்)</option>
                <option value="Tomato">Tomato (தக்காளி)</option>
                <option value="Cotton">Cotton (பருத்தி)</option>
                <option value="Maize">Maize (மக்காச்சோளம்)</option>
                <option value="Banana">Banana (வாழை)</option>
              </select>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {t.cropDoctor.uploadDesc}
            </p>

            {/* Hidden inputs */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Drop / Upload Zone (#F0F7F0 with dashed green border) */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                previewImage
                  ? 'border-green-500 bg-[#F0F7F0]'
                  : 'border-green-300 bg-[#F0F7F0] hover:bg-green-50'
              }`}
            >
              {previewImage ? (
                <div className="space-y-3">
                  <img
                    src={previewImage}
                    alt="Uploaded leaf"
                    className="max-h-48 mx-auto rounded-xl shadow-md object-cover"
                  />
                  <p className="text-xs font-bold text-green-900">
                    {language === 'ta' ? 'படம் பதிவேற்றப்பட்டது (மாற்ற தட்டவும்)' : 'Photo uploaded (Click to change)'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-white text-green-700 shadow-sm flex items-center justify-center mx-auto">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-green-900">
                    {language === 'ta' ? 'புகைப்படத்தை இழுத்து விடவும் அல்லது தேர்ந்தெடுக்கவும்' : 'Drag & drop leaf photo or click to browse'}
                  </p>
                  <p className="text-[11px] text-slate-500">Supports JPG, PNG, WebP</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Camera className="w-4 h-4 text-green-700" />
                <span>{t.cropDoctor.takePhoto}</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-3 px-3 bg-[#1B4332] hover:bg-green-900 text-white rounded-2xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Upload className="w-4 h-4" />
                <span>{t.cropDoctor.uploadImage}</span>
              </button>
            </div>

            {previewImage && (
              <button
                type="button"
                disabled={isAnalyzing}
                onClick={() => triggerAnalysis(previewImage, undefined, selectedCrop)}
                className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-500 text-green-950 rounded-2xl text-xs font-black transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t.cropDoctor.analyzing}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-green-950" />
                    <span>{t.cropDoctor.analyzeBtn}</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Preset Sample Gallery for Judges & Quick Testing */}
          <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                <span>{t.cropDoctor.orChooseSample}</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sampleLeafGallery.map((sample) => {
                const isSelected = selectedSample?.id === sample.id;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`text-left p-3.5 rounded-2xl border text-xs transition-all ${
                      isSelected
                        ? 'border-green-600 bg-green-50 shadow-sm ring-2 ring-yellow-400'
                        : 'border-slate-200 hover:border-green-300 hover:bg-[#F0F7F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{sample.cropName.split(' ')[0]}</span>
                      <span className="text-[10px] bg-yellow-100 text-yellow-900 px-2 py-0.5 rounded-full font-bold">
                        {sample.prediction.conditionStatus}
                      </span>
                    </div>
                    <p className="font-bold text-green-900 text-[11px] truncate">
                      {language === 'ta' ? sample.diseaseNameTamil : sample.diseaseName}
                    </p>
                    <p className="text-[10px] text-slate-600 line-clamp-2 mt-1">
                      {language === 'ta' ? sample.sampleDescriptionTamil : sample.sampleDescription}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: AI Diagnostic Report & Prescription (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {isAnalyzing ? (
            <div className="bg-white border border-green-100 rounded-3xl p-12 text-center shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-800 flex items-center justify-center mx-auto animate-pulse">
                <Stethoscope className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {t.cropDoctor.analyzing}
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Running cellular pattern segmentation, fungal lesion classification, and generating bio-organic management plan in தமிழ்...
              </p>
            </div>
          ) : prediction ? (
            <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Report Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-green-800 block">
                    {t.cropDoctor.resultTitle} • {prediction.cropName}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                    {language === 'ta' ? prediction.diseaseNameTamil : prediction.diseaseName}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <SpeechSpeaker
                    textToSpeak={speechDiagnosisText}
                    language={language}
                    label={language === 'ta' ? 'அறிக்கையை கேட்க' : 'Listen Report'}
                    size="md"
                  />
                </div>
              </div>

              {/* Confidence Meter & Uncertainty Disclaimer */}
              <div className="bg-yellow-50/80 border border-yellow-200 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-yellow-950">{t.cropDoctor.confidenceScore}</span>
                  <span className="text-sm font-extrabold text-yellow-900">
                    {prediction.confidence}% Confidence
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-yellow-200/80 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-yellow-500 transition-all duration-500"
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>

                {prediction.isConfidenceLow && (
                  <div className="bg-amber-100 border border-amber-300 text-amber-900 rounded-xl p-2.5 text-xs font-medium flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{t.cropDoctor.lowConfidenceWarning}</span>
                  </div>
                )}
              </div>

              {/* Possible Causes */}
              <div className="space-y-2.5">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>{t.cropDoctor.possibleCauses}</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {(language === 'ta' ? prediction.possibleCausesTamil : prediction.possibleCauses).map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                      <span className="font-medium">{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Treatments (Tabbed Organic vs Chemical) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-green-700" />
                    <span>{t.cropDoctor.recommendedRemedies}</span>
                  </h3>

                  <div className="flex bg-[#F0F7F0] border border-green-200 rounded-xl p-1 text-xs font-bold">
                    <button
                      onClick={() => setActiveTabRemedy('all')}
                      className={`px-3 py-1 rounded-lg transition-all ${activeTabRemedy === 'all' ? 'bg-[#1B4332] text-white shadow-xs' : 'text-green-900'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveTabRemedy('organic')}
                      className={`px-3 py-1 rounded-lg transition-all ${activeTabRemedy === 'organic' ? 'bg-[#1B4332] text-white shadow-xs' : 'text-green-900'}`}
                    >
                      🌿 {t.cropDoctor.organicBio}
                    </button>
                    <button
                      onClick={() => setActiveTabRemedy('chemical')}
                      className={`px-3 py-1 rounded-lg transition-all ${activeTabRemedy === 'chemical' ? 'bg-[#1B4332] text-white shadow-xs' : 'text-green-900'}`}
                    >
                      🧪 {t.cropDoctor.chemical}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {prediction.recommendedMedicines
                    .filter(m => {
                      if (activeTabRemedy === 'organic') return m.type === 'Organic/Bio';
                      if (activeTabRemedy === 'chemical') return m.type === 'Chemical';
                      return true;
                    })
                    .map((med, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          med.type === 'Organic/Bio'
                            ? 'bg-[#F0F7F0] border-green-200 text-green-950'
                            : 'bg-yellow-50 border-yellow-200 text-yellow-950'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                          <span className="font-extrabold text-xs">{med.name}</span>
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                            med.type === 'Organic/Bio'
                              ? 'bg-green-200 text-green-900'
                              : 'bg-yellow-200 text-yellow-900'
                          }`}>
                            {med.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-semibold">
                          <strong>{language === 'ta' ? 'பயன்பாட்டு அளவு:' : 'Recommended Dosage:'}</strong> {med.dosage}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Preventive Cultural Actions */}
              <div className="space-y-2.5">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-700" />
                  <span>{t.cropDoctor.preventiveActions}</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {(language === 'ta' ? prediction.preventiveActionsTamil : prediction.preventiveActions).map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-purple-50/60 p-2.5 rounded-xl border border-purple-100">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expert Escalation Guidance in #1B4332 Card */}
              <div className="bg-[#1B4332] text-white rounded-2xl p-4 text-xs space-y-1.5 shadow-md">
                <div className="text-yellow-400 font-extrabold flex items-center gap-1.5">
                  <Sprout className="w-4 h-4" />
                  <span>{t.cropDoctor.expertAdvice}</span>
                </div>
                <p className="text-green-100 text-xs leading-relaxed opacity-95">
                  {language === 'ta' ? prediction.expertVerificationAdviceTamil : prediction.expertVerificationAdvice}
                </p>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-slate-500 text-center italic pt-1">
                {t.cropDoctor.disclaimer}
              </p>

            </div>
          ) : (
            <div className="bg-white border border-green-100 rounded-3xl p-12 text-center text-slate-500">
              <Leaf className="w-12 h-12 mx-auto text-green-300 mb-2" />
              <p className="text-xs">Upload an image or pick a test sample to view diagnosis.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

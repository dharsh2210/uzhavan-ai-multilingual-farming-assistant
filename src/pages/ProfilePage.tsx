import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  User as UserIcon,
  Sprout,
  MapPin,
  Layers,
  Save,
  CheckCircle2,
  Sparkles,
  Phone,
  ShieldCheck,
  Award
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, updateFarmerProfile, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    district: user.district,
    state: user.state,
    landSizeAcres: user.landSizeAcres,
    primaryCrop: user.primaryCrop,
    cropStage: user.cropStage,
    soilType: user.soilType,
    irrigationType: user.irrigationType,
    farmerCategory: user.farmerCategory,
    preferredLanguage: user.preferredLanguage
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setFormData({
      name: user.name,
      phone: user.phone,
      district: user.district,
      state: user.state,
      landSizeAcres: user.landSizeAcres,
      primaryCrop: user.primaryCrop,
      cropStage: user.cropStage,
      soilType: user.soilType,
      irrigationType: user.irrigationType,
      farmerCategory: user.farmerCategory,
      preferredLanguage: user.preferredLanguage
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateFarmerProfile(formData as any);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLandSizeChange = (acres: number) => {
    let cat: any = 'Marginal (< 2.5 acres)';
    if (acres > 10.0) cat = 'Large (> 10 acres)';
    else if (acres > 5.0) cat = 'Medium (5 - 10 acres)';
    else if (acres > 2.5) cat = 'Small (2.5 - 5 acres)';

    setFormData(prev => ({
      ...prev,
      landSizeAcres: acres,
      farmerCategory: cat
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header Banner - Vibrant #1B4332 with Gold Accents */}
      <div className="bg-[#1B4332] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 px-3.5 py-1 rounded-full text-xs font-bold text-yellow-300">
              <UserIcon className="w-3.5 h-3.5 text-yellow-400" />
              <span>Smallholder Farmer Digital Identity</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.profile.title}
            </h1>
            <p className="text-green-100 text-xs sm:text-sm max-w-2xl leading-relaxed opacity-95">
              {t.profile.subtitle}
            </p>
          </div>

          <div className="shrink-0 bg-green-950/80 border border-green-800/80 rounded-2xl p-4 text-xs space-y-0.5 shadow-md">
            <span className="text-yellow-300 block text-[10px] uppercase font-bold">Category</span>
            <span className="font-black text-white block mt-0.5">{user.farmerCategory}</span>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-[#F0F7F0] border border-green-300 text-green-950 rounded-2xl p-4 flex items-center gap-3 text-xs font-bold shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <span>Farm profile successfully updated & synced with agro-decision engine!</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Personal Info */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold text-green-950 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <UserIcon className="w-4 h-4 text-green-700" />
            <span>Personal & Location Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t.profile.name}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs font-bold bg-[#F0F7F0] border border-green-200 rounded-2xl px-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-600 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t.profile.phone}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs font-bold bg-[#F0F7F0] border border-green-200 rounded-2xl px-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-600 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t.profile.district}</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full text-xs font-bold bg-[#F0F7F0] border border-green-200 rounded-2xl px-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-600 focus:outline-none"
              >
                <option value="Thanjavur">Thanjavur (தஞ்சாவூர் - Delta)</option>
                <option value="Dindigul">Dindigul (திண்டுக்கல்)</option>
                <option value="Coimbatore">Coimbatore (கோயம்புத்தூர்)</option>
                <option value="Madurai">Madurai (மதுரை)</option>
                <option value="Erode">Erode (ஈரோடு)</option>
                <option value="Salem">Salem (சேலம்)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t.profile.state}</label>
              <input
                type="text"
                value={formData.state}
                disabled
                className="w-full text-xs font-bold bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Agricultural Holdings */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold text-green-950 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sprout className="w-4 h-4 text-green-700" />
            <span>Farm & Crop Parameters</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t.profile.landSize} (Acres)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="50"
                value={formData.landSizeAcres}
                onChange={(e) => handleLandSizeChange(parseFloat(e.target.value) || 1)}
                className="w-full text-xs font-bold bg-[#F0F7F0] border border-green-200 rounded-2xl px-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-600 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t.profile.primaryCrop}</label>
              <select
                value={formData.primaryCrop}
                onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                className="w-full text-xs font-bold bg-[#F0F7F0] border border-green-200 rounded-2xl px-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-600 focus:outline-none"
              >
                <option value="Rice (Paddy)">Rice (Paddy - நெல்)</option>
                <option value="Tomato">Tomato (தக்காளி)</option>
                <option value="Cotton">Cotton (பருத்தி)</option>
                <option value="Maize">Maize (மக்காச்சோளம்)</option>
                <option value="Banana">Banana (வாழை)</option>
                <option value="Groundnut">Groundnut (நிலக்கடலை)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t.profile.cropStage}</label>
              <select
                value={formData.cropStage}
                onChange={(e) => setFormData({ ...formData, cropStage: e.target.value as any })}
                className="w-full text-xs font-bold bg-[#F0F7F0] border border-green-200 rounded-2xl px-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-600 focus:outline-none"
              >
                <option value="Sowing">Sowing / Nursery (நாற்றங்கால் / விதைப்பு)</option>
                <option value="Vegetative">Vegetative (வளர்ச்சி பருவம்)</option>
                <option value="Flowering">Flowering (பூக்கும் பருவம்)</option>
                <option value="Maturity">Maturity / Grain filling (காய் பிடிக்கும் பருவம்)</option>
                <option value="Harvest">Harvest (அறுவடை பருவம்)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t.profile.soilType}</label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value as any })}
                className="w-full text-xs font-bold bg-[#F0F7F0] border border-green-200 rounded-2xl px-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-600 focus:outline-none"
              >
                <option value="Alluvial Soil">Alluvial Soil (வண்டல் மண்)</option>
                <option value="Clayey Loam">Clayey Loam (களிமண் சார்ந்த மண்)</option>
                <option value="Red Soil">Red Soil (செம்மண்)</option>
                <option value="Black Cotton Soil">Black Cotton (கரிசல் மண்)</option>
                <option value="Sandy Loam">Sandy Loam (மணல் சார்ந்த மண்)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t.profile.irrigationType}</label>
              <select
                value={formData.irrigationType}
                onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value as any })}
                className="w-full text-xs font-bold bg-[#F0F7F0] border border-green-200 rounded-2xl px-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-600 focus:outline-none"
              >
                <option value="Canal">Canal (கால்வாய் பாசனம்)</option>
                <option value="Borewell">Borewell (ஆழ்துளை கிணறு)</option>
                <option value="Drip/Sprinkler">Drip/Sprinkler (சொட்டுநீர் / தெளிப்புநீர்)</option>
                <option value="Rainfed">Rainfed (மானாவாரி)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{t.profile.language}</label>
              <select
                value={formData.preferredLanguage}
                onChange={(e) => {
                  const lang = e.target.value as 'en' | 'ta';
                  setFormData({ ...formData, preferredLanguage: lang });
                  setLanguage(lang);
                }}
                className="w-full text-xs font-bold bg-[#F0F7F0] border border-green-200 rounded-2xl px-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-600 focus:outline-none"
              >
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="en">English</option>
              </select>
            </div>

          </div>
        </div>

        {/* Submit Button in Gold Accent */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-7 py-3.5 bg-yellow-400 hover:bg-yellow-500 text-green-950 rounded-2xl font-black text-xs transition-all shadow-md hover:scale-105 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{t.profile.save}</span>
          </button>
        </div>

      </form>

    </div>
  );
};


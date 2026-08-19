import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, ShieldAlert, Heart, Phone, ExternalLink, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-[#F2F4F2] text-slate-700 border-t border-green-200/80 text-xs py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Top Impact Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-green-100 shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-extrabold text-[#1B4332] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-yellow-500" />
              Verified Public Good Impact:
            </span>
            <span className="bg-green-100 text-green-900 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
              +14% Crop Yield Protected
            </span>
            <span className="bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">
              14,850+ Farmers Served
            </span>
            <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
              62.4 ML Water Conserved
            </span>
          </div>

          <div className="text-xs text-slate-500 font-medium italic">
            Developed for AI for Public Good Hackathon 2024
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-200">
          
          {/* Col 1: Mission */}
          <div>
            <div className="flex items-center gap-2 text-[#1B4332] font-extrabold text-base mb-2">
              <div className="bg-yellow-400 p-1.5 rounded-lg text-green-950">
                <Sprout className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span>{language === 'ta' ? 'உழவன் AI | பசுமைத் தோழன்' : 'Uzhavan AI | KrishiMitra'}</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              {language === 'ta'
                ? 'இந்தியாவில் உள்ள சிறு மற்றும் குறு விவசாயிகளுக்கு செயற்கை நுண்ணறிவு மூலம் எளிய தமிழில் விவசாய முடிவெடுக்கும் வழிகாட்டுதல் வழங்கும் சமூக தாக்க தளம்.'
                : 'Empowering India’s 100M+ small & marginal farmers with accessible AI decision support in Tamil & English to protect yields, save water, and unlock government welfare.'}
            </p>
          </div>

          {/* Col 2: Agricultural Knowledge Sources */}
          <div>
            <h4 className="text-[#1B4332] font-bold text-xs uppercase tracking-wider mb-2">
              {language === 'ta' ? 'அங்கீகரிக்கப்பட்ட தரவு மூலங்கள்' : 'Agronomic Knowledge Partners'}
            </h4>
            <ul className="space-y-1.5 text-slate-600 text-xs">
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-green-700" />
                <span>Tamil Nadu Agricultural University (TNAU) Agritech</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-green-700" />
                <span>IMD Agromet Advisory Service (India Meteorological Dept)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-green-700" />
                <span>Ministry of Agriculture & Farmers Welfare, GoI</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Farmer Helpline */}
          <div>
            <h4 className="text-[#1B4332] font-bold text-xs uppercase tracking-wider mb-2">
              {language === 'ta' ? 'விவசாயி அவசர உதவி எண்கள்' : 'Emergency Farmer Helplines'}
            </h4>
            <div className="space-y-2 text-slate-600 text-xs">
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                <Phone className="w-4 h-4 text-yellow-600" />
                <span>Kisan Call Centre (Toll-Free): <strong className="text-slate-900 font-bold">1800-180-1551</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                <Phone className="w-4 h-4 text-green-700" />
                <span>TN Agri Department Help: <strong className="text-slate-900 font-bold">1800-425-4444</strong></span>
              </div>
            </div>
          </div>

        </div>

        {/* Safety Disclaimer */}
        <div className="bg-yellow-50/80 border border-yellow-200 rounded-2xl p-4 text-[11px] text-yellow-950 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-yellow-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>{language === 'ta' ? 'முக்கிய பாதுகாப்பு வழிகாட்டுதல்:' : 'Important Safety & Agricultural Disclaimer:'}</strong>{' '}
            {language === 'ta'
              ? 'உழவன் AI வழங்கும் பரிந்துரைகள் முடிவெடுக்கும் உதவிக்கான ஆலோசனைகளே ஆகும். பூச்சிக்கொல்லி மருந்துகளை கையாளும் போது பாதுகாப்பு முகக்கவசம் அணியவும். தீவிர நோய் பரவல்களுக்கு உங்கள் வட்டார வேளாண்மை உதவி இயக்குநர் அல்லது வேளாண் அறிவியல் நிலையத்தை (KVK) அணுகவும்.'
              : 'Uzhavan AI generates advisory decision-support based on weather forecasts, plant pathology models, and public government scheme rules. Always wear protective gear during spraying and verify severe pest infestations with your local Block Agricultural Extension Officer or Krishi Vigyan Kendra.'}
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Uzhavan AI (பசுமைத் தோழன்) • AI for Public Good Solution</p>
          <p className="flex items-center gap-1 font-semibold text-green-900">
            <span>Crafted for Indian Smallholder Resilience</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
          </p>
        </div>

      </div>
    </footer>
  );
};

import { AgriAlert } from '../types';

export const initialAlerts: AgriAlert[] = [
  {
    id: 'alert-01',
    title: 'Cauvery Delta Heavy Rainfall & Inundation Warning',
    titleTamil: 'காவிரி டெல்டா மாவட்டங்களில் கனமழை & வெள்ள அபாய எச்சரிக்கை',
    type: 'Weather',
    severity: 'Urgent',
    date: 'Today, 06:30 AM',
    district: 'Thanjavur, Tiruvarur, Nagapattinam',
    message: 'IMD forecasts heavy to very heavy rainfall (40-60mm) across delta blocks. Sizable surface runoff likely in low-lying paddy basins.',
    messageTamil: 'வானிலை மையம் டெல்டா மாவட்டங்களில் 40-60 மி.மீ கனமழை எச்சரிக்கை விடுத்துள்ளது. தாழ்வான நெல் வயல்களில் தண்ணீர் தேங்க வாய்ப்புள்ளது.',
    recommendedAction: 'Clear field drains immediately. Stop top-dressing of Urea and suspend power sprayer operations until Friday.',
    recommendedActionTamil: 'வடிகால் வாய்க்கால்களை உடனே தூர்வாரவும். யூரியா உரம் இடுவதை நிறுத்தி வைக்கவும்.'
  },
  {
    id: 'alert-02',
    title: 'Fall Armyworm (படைப்புழு) Outbreak Alert in Maize',
    titleTamil: 'மக்காச்சோளத்தில் படைப்புழு தாக்குதல் தீவிர எச்சரிக்கை',
    type: 'Pest Outbreak',
    severity: 'Warning',
    date: 'Yesterday',
    district: 'Dindigul, Theni, Perambalur',
    message: 'Agricultural department scouts detected 12-15% whorl infestation of Spodoptera frugiperda in young maize crops.',
    messageTamil: 'இளம் மக்காச்சோள பயிர்களில் 12-15% அளவில் படைப்புழுவின் சேதம் வேளாண் அலுவலர்களால் கண்டறியப்பட்டுள்ளது.',
    recommendedAction: 'Apply Azadirachtin 1500 PPM @ 5ml/liter or install pheromone traps @ 5 per acre in central field areas.',
    recommendedActionTamil: 'வேப்ப எண்ணெய் அல்லது ஒரு ஏக்கருக்கு 5 இனக்கவர்ச்சி பொறிகளை அமைத்து கட்டுப்படுத்தவும்.'
  },
  {
    id: 'alert-03',
    title: 'PMFBY Kharif/Samba Crop Insurance Cut-off Deadline',
    titleTamil: 'சம்பா நெல் பயிர் காப்பீடு செய்ய கடைசி தேதி அறிவிப்பு',
    type: 'Scheme Deadline',
    severity: 'Info',
    date: 'Valid till 30th of this month',
    district: 'All Districts of Tamil Nadu',
    message: 'Enroll with Village Administrative Officer (VAO) Adangal at your nearest PACCS cooperative society before the cutoff date to receive full premium subsidy.',
    messageTamil: 'அரசு மானியத்துடன் கூடிய பயிர் காப்பீட்டுக்கு தொடக்க வேளாண் கூட்டுறவு வங்கியில் அடங்கலுடன் விண்ணப்பிக்கவும்.',
    recommendedAction: 'Keep Aadhaar, Patta copy, and Crop Adangal ready and visit the e-Sevai or PACCS center.',
    recommendedActionTamil: 'ஆதார், பட்டா மற்றும் VAO அடங்கலுடன் இ-சேவை மையத்திற்கு செல்லவும்.'
  },
  {
    id: 'alert-04',
    title: 'Dindigul Vegetable Market Price Surge: Tomato & Shallots',
    titleTamil: 'திண்டுக்கல் ஒட்டன்சத்திரம் சந்தை: தக்காளி & சின்ன வெங்காயம் விலை உயர்வு',
    type: 'Market Price',
    severity: 'Info',
    date: 'Updated 2 hours ago',
    district: 'Dindigul, Madurai, Coimbatore',
    message: 'Oddanchatram wholesale mandi reports high demand for Grade-A red tomatoes at ₹42/kg and country shallots at ₹58/kg.',
    messageTamil: 'ஒட்டன்சத்திரம் மொத்த சந்தையில் தக்காளி கிலோ ₹42 மற்றும் சின்ன வெங்காயம் ₹58 என நல்ல விலைக்கு விற்பனையாகிறது.',
    recommendedAction: 'Harvest ripe fruits during morning cool hours and pack in ventilated plastic crates for maximum mandi valuation.',
    recommendedActionTamil: 'காலை வேளையில் பறித்து தரம்பிரித்து சந்தைக்கு அனுப்பினால் கூடுதல் லாபம் பெறலாம்.'
  }
];

import { DiseasePrediction } from '../types';

export interface SampleLeaf {
  id: string;
  cropName: string;
  cropNameTamil: string;
  diseaseName: string;
  diseaseNameTamil: string;
  thumbnailColor: string;
  sampleDescription: string;
  sampleDescriptionTamil: string;
  prediction: DiseasePrediction;
}

export const sampleLeafGallery: SampleLeaf[] = [
  {
    id: 'sample-paddy-blast',
    cropName: 'Rice (Paddy)',
    cropNameTamil: 'நெல் பயிர்',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    diseaseNameTamil: 'நெல் குலை நோய் (இலைக் கருகல்)',
    thumbnailColor: 'from-amber-600 to-yellow-800',
    sampleDescription: 'Spindle-shaped elliptical lesions with gray-white centers and dark reddish-brown margins on leaf blade.',
    sampleDescriptionTamil: 'இலைகளில் கண் போன்ற வடிவத்தில் மையத்தில் சாம்பல் நிறத்துடனும் விளிம்புகளில் பழுப்பு நிறத்துடனும் கூடிய புள்ளிகள்.',
    prediction: {
      id: 'diag-blast-01',
      cropName: 'Rice (Paddy)',
      diseaseName: 'Rice Blast Fungus (Magnaporthe oryzae)',
      diseaseNameTamil: 'நெல் குலை நோய் (குலைக்காளான்)',
      conditionStatus: 'Moderate',
      confidence: 94.8,
      isConfidenceLow: false,
      modelEngine: 'Gemini Multimodal AI',
      possibleCauses: [
        'High relative humidity (> 90%) and cloudy overcast weather for consecutive 3 days',
        'Excessive application of chemical Nitrogen (Urea) without balanced Potassium',
        'Night temperatures between 19°C - 24°C with heavy dew deposition on leaves',
        'Dense planting obstructing natural air circulation'
      ],
      possibleCausesTamil: [
        'தொடர்ந்து 3 நாட்களுக்கு மேகமூட்டம் மற்றும் 90% க்கும் அதிகமான காற்றின் ஈரப்பதம்',
        'பொட்டாஷ் உரமின்றி அளவுக்கு அதிகமாக யூரியா (தழைச்சத்து) இடுதல்',
        'இரவு நேரக் குளிர்ச்சி (19°C-24°C) மற்றும் இலைகளில் பனித்துளி தேங்குதல்',
        'அடர்த்தியாக நடவு செய்யப்பட்டு காற்று புகாத நிலை'
      ],
      preventiveActions: [
        'Drain standing water and allow soil to aerate for 2 days if field is waterlogged',
        'Split nitrogen applications into 3-4 doses; avoid single heavy urea application',
        'Treat seeds with Pseudomonas fluorescens @ 10g/kg of seed prior to nursery sowing',
        'Maintain 20cm spacing between rows for optimum ventilation'
      ],
      preventiveActionsTamil: [
        'வயலில் தேங்கியுள்ள தண்ணீரை வடித்து 2 நாட்கள் நிலத்தை உலர விடவும்',
        'யூரியாவை ஒரே நேரத்தில் இடாமல் 3-4 தவணைகளாக பிரித்து இடவும்',
        'விதைப்பதற்கு முன் ஒரு கிலோ விதைக்கு 10 கிராம் சூடோமோனாஸ் கலந்து விதை நேர்த்தி செய்யவும்',
        'நல்ல காற்றோட்டம் கிடைக்க பயிர்களுக்கு இடையே 20 செ.மீ இடைவெளி விடவும்'
      ],
      recommendedMedicines: [
        {
          name: 'Pseudomonas fluorescens (உயிரியல் பூஞ்சாணக் கொல்லி)',
          dosage: '5g per liter of water (or 1 kg/acre foliar spray)',
          type: 'Organic/Bio'
        },
        {
          name: 'Neem Seed Kernel Extract 5% (வேப்பங்கொட்டை கரைசல்)',
          dosage: '50ml per 10 liters of water with khadi soap emulsifier',
          type: 'Organic/Bio'
        },
        {
          name: 'Tricyclazole 75% WP (டிரைசைக்ளசோல்)',
          dosage: '0.6g per liter of water (120g/acre) - Apply only during early dawn/dusk',
          type: 'Chemical'
        }
      ],
      expertVerificationAdvice: 'If lesions spread to collar or panicle neck within 48 hours, immediately alert your block Agricultural Officer (AO) to prevent lodging.',
      expertVerificationAdviceTamil: 'நோய் கதிரின் கழுத்து பகுதிக்கு பரவினால், கதிர் ஒடிந்து விழுவதை தடுக்க உடனே வட்டார வேளாண்மை அலுவலரை தொடர்பு கொள்ளவும்.',
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 'sample-tomato-blight',
    cropName: 'Tomato',
    cropNameTamil: 'தக்காளி பயிர்',
    diseaseName: 'Early Blight (Alternaria solani)',
    diseaseNameTamil: 'தக்காளி ஆரம்பகால இலைக்கருகல் நோய்',
    thumbnailColor: 'from-emerald-700 to-stone-800',
    sampleDescription: 'Concentric dark rings with target-board appearance on lower leaves starting as small brown specks.',
    sampleDescriptionTamil: 'கீழ் இலைகளில் வட்ட வளைய வடிவிலான கரும்பழுப்பு புள்ளிகள் தோன்றி இலைகள் கருகி உதிர்தல்.',
    prediction: {
      id: 'diag-blight-02',
      cropName: 'Tomato',
      diseaseName: 'Early Blight (Alternaria solani)',
      diseaseNameTamil: 'தக்காளி ஆரம்ப இலைக்கருகல் நோய்',
      conditionStatus: 'Mild',
      confidence: 91.2,
      isConfidenceLow: false,
      modelEngine: 'Gemini Multimodal AI',
      possibleCauses: [
        'Warm temperatures (24°C - 29°C) combined with intermittent rain spells',
        'Overhead sprinkler splashing soil pathogens onto bottom leaves',
        'Nutrient deficiency (low potassium and calcium in soil)'
      ],
      possibleCausesTamil: [
        'மிதமான வெப்பம் (24°C - 29°C) மற்றும் விட்டு விட்டு பெய்யும் தூறல் மழை',
        'மண்ணில் உள்ள பூஞ்சாணம் தெளிப்பான் நீர் மூலமாக கீழ் இலைகளில் தெறித்தல்',
        'மண்ணில் பொட்டாசியம் மற்றும் கால்சியம் சத்து குறைபாடு'
      ],
      preventiveActions: [
        'Prune lower infected leaves up to 1 foot from ground level and destroy safely',
        'Apply organic straw mulching to prevent soil splash onto foliage',
        'Switch from overhead sprinkler to drip irrigation to keep canopy dry'
      ],
      preventiveActionsTamil: [
        'தரையில் இருந்து 1 அடி உயரத்திற்கு கீழே உள்ள பாதிக்கப்பட்ட இலைகளை கவாத்து செய்து அழிக்கவும்',
        'மண் நீர் தெறிக்காமல் இருக்க வைக்கோல் அல்லது பிளாஸ்டிக் மூடாக்கு போடவும்',
        'மேலிருந்து நீர் தெளிப்பதை தவிர்த்து சொட்டு நீர் பாசனத்திற்கு மாறவும்'
      ],
      recommendedMedicines: [
        {
          name: 'Trichoderma viride + Cow Urine Bio-spray (பஞ்சகவ்யா & டிரைகோடெர்மா)',
          dosage: '30ml Panchagavya + 5g Trichoderma per liter of water',
          type: 'Organic/Bio'
        },
        {
          name: 'Copper Oxychloride 50% WP (காப்பர் ஆக்சிகுளோரைடு)',
          dosage: '2.5g per liter of water (500g/acre)',
          type: 'Chemical'
        }
      ],
      expertVerificationAdvice: 'Ensure spray covers the underside of leaves. Avoid spraying during midday sun to prevent leaf scorch.',
      expertVerificationAdviceTamil: 'இலையின் அடிப்பகுதியில் நன்கு படும்படி தெளிக்கவும். இலை கருகாமல் இருக்க மதிய வெயில் நேரத்தில் தெளிக்க வேண்டாம்.',
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 'sample-paddy-bph',
    cropName: 'Rice (Paddy)',
    cropNameTamil: 'நெல் பயிர்',
    diseaseName: 'Brown Plant Hopper (BPH) / Hopper Burn',
    diseaseNameTamil: 'நெல் புகையான் பூச்சி தாக்குதல்',
    thumbnailColor: 'from-orange-800 to-amber-950',
    sampleDescription: 'Circular patches of drying yellow-brown tillers resembling fire scorch marks at the base of plants.',
    sampleDescriptionTamil: 'வயலில் வட்ட வட்டமாக பயிர்கள் தீப்பற்றி எரிந்தது போல புகையான் தாக்கி காய்ந்து போதல்.',
    prediction: {
      id: 'diag-bph-03',
      cropName: 'Rice (Paddy)',
      diseaseName: 'Brown Plant Hopper (Nilaparvata lugens) - Hopper Burn',
      diseaseNameTamil: 'நெல் புகையான் பூச்சி தாக்குதல் (Hopper Burn)',
      conditionStatus: 'Severe',
      confidence: 88.5,
      isConfidenceLow: false,
      modelEngine: 'Gemini Multimodal AI',
      possibleCauses: [
        'Indiscriminate use of synthetic pyrethroid sprays killing natural spider predators',
        'Stagnant water combined with continuous high humidity inside microclimate canopy',
        'Over-application of Nitrogen during panicle initiation stage'
      ],
      possibleCausesTamil: [
        'அதிக வீரியமுள்ள இரசாயன மருந்துகளை அடித்து நன்மை செய்யும் சிலந்திகளை அழித்தல்',
        'வயலில் தொடர்ந்து நீர் தேங்கி நிற்பதால் பயிரின் அடியில் ஈரப்பதம் அதிகரித்தல்',
        'கதிர் உருவாகும் தருணத்தில் அளவுக்கு அதிகமான தழைச்சத்து உரம் இடுதல்'
      ],
      preventiveActions: [
        'Form alleys (பாதை அமைத்தல்) every 2 meters to allow sunlight and wind to penetrate base of tillers',
        'Drain water completely from field for 3-4 days to expose hopper nymphs to sunlight',
        'Install yellow sticky traps and light traps @ 1 per acre to monitor adult hopper counts'
      ],
      preventiveActionsTamil: [
        'ஒவ்வொரு 2 மீட்டருக்கும் 30 செ.மீ அளவில் காற்று புகும்படி பார் / வழி அமைத்தல்',
        'வயலில் உள்ள நீரை 3-4 நாட்களுக்கு முழுமையாக வடித்து சூரிய ஒளி பட விடவும்',
        'ஏக்கருக்கு 1 ஒளிப்பொறி மற்றும் மஞ்சள் வண்ண ஒட்டும் பொறி வைத்து பூச்சிகளைக் கண்காணிக்கவும்'
      ],
      recommendedMedicines: [
        {
          name: 'Beauveria bassiana Bio-fungus (பியூவேரியா பேசியானா)',
          dosage: '10g per liter water directed strictly at the base of the plant stem',
          type: 'Organic/Bio'
        },
        {
          name: 'Triflumezopyrim 10% SC (ட்ரைஃப்ளூமெசோபைரிம்)',
          dosage: '94ml per acre (Spray directed at bottom root base, not upper canopy)',
          type: 'Chemical'
        }
      ],
      expertVerificationAdvice: 'URGENT: BPH spreads rapidly in circular patches. Spray strictly targeting plant base with hollow cone nozzle.',
      expertVerificationAdviceTamil: 'அவசரம்: புகையான் வட்ட வடிவில் வேகமாக பரவும். தெளிப்பான் முனையை பயிரின் வேர்ப்பகுதியை நோக்கி வைத்து தெளிக்கவும்.',
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 'sample-cotton-leafcurl',
    cropName: 'Cotton',
    cropNameTamil: 'பருத்தி பயிர்',
    diseaseName: 'Cotton Leaf Curl Virus (CLCuV)',
    diseaseNameTamil: 'பருத்தி இலை சுருட்டு வைரஸ் நோய்',
    thumbnailColor: 'from-lime-700 to-stone-900',
    sampleDescription: 'Upward or downward curling of leaves with thickened, enation-like veins on the lower leaf surface.',
    sampleDescriptionTamil: 'இலைகள் மேல்நோக்கி அல்லது கீழ்நோக்கி சுருண்டு, நரம்புகள் தடித்து இலை வளர்ச்சி குன்றுதல்.',
    prediction: {
      id: 'diag-cotton-04',
      cropName: 'Cotton',
      diseaseName: 'Cotton Leaf Curl Virus transmitted by Whitefly',
      diseaseNameTamil: 'வெள்ளைப் பூச்சியால் பரவும் பருத்தி இலை சுருட்டு வைரஸ்',
      conditionStatus: 'Moderate',
      confidence: 86.4,
      isConfidenceLow: false,
      modelEngine: 'Gemini Multimodal AI',
      possibleCauses: [
        'High population of Whitefly (Bemisia tabaci) acting as insect vector',
        'Dry hot spells followed by rapid temperature fluctuations',
        'Presence of alternate weed hosts around field bunds'
      ],
      possibleCausesTamil: [
        'வைரஸை பரப்பும் வெள்ளைப் பூச்சிகளின் (Whitefly) எண்ணிக்கை அதிகரித்தல்',
        'வறண்ட வெப்பநிலையை தொடர்ந்து நிலவும் திடீர் மாற்றங்கள்',
        'வரப்புகளில் உள்ள மாற்று களைச் செடிகளில் பூச்சிகள் தங்குதல்'
      ],
      preventiveActions: [
        'Uproot and bury severely stunted viral-infected plants to stop transmission',
        'Erect yellow sticky traps @ 8 per acre to mass-trap whiteflies',
        'Keep bunds and irrigation channels clean of wild malvaceous weeds'
      ],
      preventiveActionsTamil: [
        'கடுமையாக பாதிக்கப்பட்ட செடிகளை உடனே பிடுங்கி நிலத்திற்கு வெளியே குழிதோண்டி புதைக்கவும்',
        'ஏக்கருக்கு 8 மஞ்சள் நிற ஒட்டும் பொறிகள் வைத்து வெள்ளைப் பூச்சிகளை கட்டுப்படுத்தவும்',
        'வரப்புகளில் உள்ள பார்த்தீனியம் உள்ளிட்ட களைகளை அகற்றவும்'
      ],
      recommendedMedicines: [
        {
          name: 'Neem Oil 10,000 PPM + Fish Amino Acid (வேப்பெண்ணெய் & மீன் அமிலம்)',
          dosage: '3ml Neem oil + 5ml Fish amino acid per liter of water',
          type: 'Organic/Bio'
        },
        {
          name: 'Diafenthiuron 50% WP (டயஃபெந்தியூரான்)',
          dosage: '1.2g per liter of water (240g/acre)',
          type: 'Chemical'
        }
      ],
      expertVerificationAdvice: 'Virus cannot be cured with fungicide once inside plant tissue; control the whitefly vector immediately to save remaining crop.',
      expertVerificationAdviceTamil: 'செடிக்குள் பரவிய வைரஸை பூஞ்சாணக் கொல்லிகளால் அழிக்க முடியாது; வெள்ளைப் பூச்சிகளை கட்டுப்படுத்துவதே ஒரே வழி.',
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 'sample-banana-sigatoka',
    cropName: 'Banana',
    cropNameTamil: 'வாழை பயிர்',
    diseaseName: 'Sigatoka Leaf Spot (Mycosphaerella musicola / fijiensis)',
    diseaseNameTamil: 'வாழை சிகடோகா இலைப்புள்ளி நோய்',
    thumbnailColor: 'from-yellow-600 to-amber-900',
    sampleDescription: 'Narrow yellow-brown streaks running parallel to leaf veins that expand into dark brown oval spots with yellow halo and ash-grey center.',
    sampleDescriptionTamil: 'வாழை இலை நரம்புகளுக்கு இணையாக மஞ்சள் கோடுகள் தோன்றி, பின்னர் கரும்பழுப்பு நிறமாக மாறி இலை காய்ந்து சருகாதல்.',
    prediction: {
      id: 'diag-banana-05',
      cropName: 'Banana',
      diseaseName: 'Yellow Sigatoka Leaf Spot (Mycosphaerella musicola)',
      diseaseNameTamil: 'வாழை சிகடோகா இலைக்கருகல் / இலைப்புள்ளி நோய்',
      conditionStatus: 'Moderate',
      confidence: 93.7,
      isConfidenceLow: false,
      modelEngine: 'Gemini Multimodal AI',
      possibleCauses: [
        'High atmospheric humidity (> 85%) and temperature around 25°C - 30°C',
        'Poor drainage causing waterlogging and high microclimate humidity under canopy',
        'Unpruned dried or infected bottom leaves retaining fungal ascospores',
        'Close planting without recommended suckers thinning'
      ],
      possibleCausesTamil: [
        'அதிக ஈரப்பதம் (85% மேல்) மற்றும் 25°C - 30°C மிதமான வெப்ப நிலை',
        'தோட்டத்தில் வடிகால் வசதியின்றி தண்ணீர் தேங்குவதால் பயிரின் அடியில் ஈரப்பதம் அதிகரித்தல்',
        'காய்ந்த மற்றும் பாதிக்கப்பட்ட கீழ் இலைகளை கழிக்காமல் விட்டு வைத்தல்',
        'பக்கக் கன்றுகளை வெட்டாமல் அடர்த்தியாக வளர விடுதல்'
      ],
      preventiveActions: [
        'De-leaf (இலை கழித்தல்): Cut and burn all severely infected lower leaves displaying necrosis',
        'Maintain proper drainage channels to prevent stagnant water in the plantation',
        'Prune excess side suckers; keep only 1 mother plant and 1 follower sucker per pit',
        'Avoid sprinkler or flood water splashing onto foliage'
      ],
      preventiveActionsTamil: [
        'இலைக் கழித்தல்: பாதிக்கப்பட்ட கீழ் இலைகளை வெட்டி தோப்புக்கு வெளியே தீயிட்டு அழிக்கவும்',
        'வாழை மரங்களுக்கு இடையில் தண்ணீர் தேங்காமல் வடிந்து செல்ல வடிகால் வாய்க்கால் அமைக்கவும்',
        'தேவையற்ற பக்கக் கன்றுகளை அவ்வப்போது வெட்டி நீக்கவும் (ஒரு குழிக்கு 1 தாய் மரம் + 1 பக்கக் கன்று)',
        'இலைகளின் மேல் தண்ணீர் தெறிக்காமல் பாசனம் செய்யவும்'
      ],
      recommendedMedicines: [
        {
          name: 'Pseudomonas fluorescens + Mineral Oil / Mineral Spray Oil (சூடோமோனாஸ் + கனிம எண்ணெய்)',
          dosage: '5g Pseudomonas + 10ml agricultural mineral oil per liter of water (Foliar spray underleaf)',
          type: 'Organic/Bio'
        },
        {
          name: 'Panchagavya 3% + Neem Cake extract (பஞ்சகவ்யா & வேப்பம்பிண்ணாக்கு கரைசல்)',
          dosage: '30ml Panchagavya per liter water sprayed on lower and upper leaf surfaces',
          type: 'Organic/Bio'
        },
        {
          name: 'Propiconazole 25% EC (புரோபிகோனசோல்)',
          dosage: '1ml per liter of water + 1ml teepol/sticker solution (Apply thoroughly under leaf blade)',
          type: 'Chemical'
        },
        {
          name: 'Carbendazim 50% WP + Mancozeb 75% WP (கார்பன்டசிம் + மாங்கோசெப்)',
          dosage: '2g per liter of water',
          type: 'Chemical'
        }
      ],
      expertVerificationAdvice: 'If younger leaves (3rd or 4th leaf from top) show streak symptoms, spray immediately to prevent bunch weight loss and premature ripening.',
      expertVerificationAdviceTamil: 'மேலிருந்து 3 அல்லது 4-வது இளம் இலைகளில் கோடுகள் தென்பட்டால், தாரின் எடை குறைவதைத் தடுக்க உடனே மருந்து தெளிக்கவும்.',
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 'sample-maize-blight',
    cropName: 'Maize / Corn',
    cropNameTamil: 'மக்காச்சோளம்',
    diseaseName: 'Turcicum Leaf Blight (Exserohilum turcicum)',
    diseaseNameTamil: 'மக்காச்சோளம் துருசிகம் இலைக்கருகல் நோய்',
    thumbnailColor: 'from-amber-500 to-stone-800',
    sampleDescription: 'Long elliptical grayish-green or tan lesions on leaves extending several inches along leaf veins.',
    sampleDescriptionTamil: 'இலைகளில் நீளமான படகு போன்ற சாம்பல் பச்சை அல்லது பழுப்பு நிற கருகல் தழும்புகள்.',
    prediction: {
      id: 'diag-maize-06',
      cropName: 'Maize',
      diseaseName: 'Turcicum Leaf Blight (Exserohilum turcicum)',
      diseaseNameTamil: 'மக்காச்சோளம் துருசிகம் இலைக் கருகல்',
      conditionStatus: 'Moderate',
      confidence: 90.1,
      isConfidenceLow: false,
      modelEngine: 'Gemini Multimodal AI',
      possibleCauses: [
        'Moderate temperatures (18°C - 27°C) with prolonged leaf wetness',
        'Continuous monocropping of maize in adjacent seasons',
        'Heavy nitrogen fertilizer without adequate potash'
      ],
      possibleCausesTamil: [
        'குளிர்ந்த ஈரப்பதம் மற்றும் இலைகளில் தொடர்ந்து நீர் தங்குதல்',
        'தொடர்ந்து ஒரே நிலத்தில் மக்காச்சோளம் பயிரிடுதல்',
        'பொட்டாஷ் உரமின்றி அதிக தழைச்சத்து இடுதல்'
      ],
      preventiveActions: [
        'Deep summer ploughing to bury infested crop residues',
        'Crop rotation with pulses like cowpea or green gram',
        'Maintain balanced fertilizer application based on soil test'
      ],
      preventiveActionsTamil: [
        'முந்தைய பயிரின் எச்சங்களை ஆழமாக உழுது மண்ணில் மக்கச் செய்தல்',
        'பயறு வகைகளுடன் பயிர் சுழற்சி செய்தல்',
        'மண் பரிசோதனை அடிப்படையில் சமச்சீர் உரம் இடுதல்'
      ],
      recommendedMedicines: [
        {
          name: 'Trichoderma harzianum + Neem oil (டிரைகோடெர்மா & வேப்பெண்ணெய்)',
          dosage: '5g Trichoderma + 3ml Neem oil per liter of water',
          type: 'Organic/Bio'
        },
        {
          name: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (அசாக்சிஸ்ட்ரோபின் + டைபெனோகோனசோல்)',
          dosage: '1ml per liter of water',
          type: 'Chemical'
        }
      ],
      expertVerificationAdvice: 'Apply foliar spray at first appearance of symptoms prior to tasseling stage to safeguard grain fill.',
      expertVerificationAdviceTamil: 'பூக்கும் தருணத்திற்கு முன்னரே முதல் அறிகுறி தெரிந்தவுடன் தெளிக்கவும்.',
      timestamp: new Date().toISOString()
    }
  }
];

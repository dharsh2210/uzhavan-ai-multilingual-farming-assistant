import { GovernmentScheme } from '../types';

export const schemesDatabase: GovernmentScheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    nameTamil: 'பிரதம மந்திரி கிசான் சம்மான் நிதி (PM-KISAN)',
    category: 'Direct Income',
    sponsoringBody: 'Central Government',
    maxBenefit: '₹6,000 / year (in 3 equal installments of ₹2,000)',
    maxBenefitTamil: 'ஆண்டுக்கு ₹6,000 (3 தவணைகளாக தலா ₹2,000 நேரடி வங்கி பரிமாற்றம்)',
    whyRelevant: 'Direct unconditional income support for landholding small and marginal farmers to meet agricultural input expenses.',
    whyRelevantTamil: 'விவசாய இடுபொருட்கள் வாங்குவதற்கு சிறு மற்றும் குறு விவசாயிகளுக்கு நேரடியாக வங்கி கணக்கில் வழங்கப்படும் வருமான உதவி.',
    basicEligibility: [
      'Small and marginal landholder farmer families with cultivable land',
      'Valid land ownership record (Patta/Chitta) in farmer name',
      'Aadhaar-seeded active bank account'
    ],
    basicEligibilityTamil: [
      'சாகுபடி நிலம் வைத்துள்ள சிறு மற்றும் குறு உழவர் குடும்பங்கள்',
      'விவசாயி பெயரில் பட்டா / சிட்டா ஆவணம் இருக்க வேண்டும்',
      'ஆதார் இணைக்கப்பட்ட வங்கி கணக்கு'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Land Ownership document (Patta / Chitta / Land Tax receipt)',
      'Bank Passbook copy with IFSC code',
      'e-KYC completion proof'
    ],
    requiredDocumentsTamil: [
      'ஆதார் அட்டை',
      'நில உரிமை ஆவணம் (பட்டா / சிட்டா / நில வரி ரசீது)',
      'வங்கி கணக்கு புத்தக நகல் (IFSC குறியீட்டுடன்)',
      'இ-கேஒய்சி (e-KYC) சரிபார்ப்பு'
    ],
    applicationGuidance: [
      'Step 1: Visit pmkisan.gov.in or nearest e-Sevai / CSC Center.',
      'Step 2: Click on "New Farmer Registration" and enter Aadhaar number & State.',
      'Step 3: Enter land survey number, khata number, and bank account details.',
      'Step 4: Complete biometric or Aadhaar OTP e-KYC.'
    ],
    applicationGuidanceTamil: [
      'படி 1: pmkisan.gov.in இணையதளம் அல்லது அருகிலுள்ள இ-சேவை மையத்திற்கு செல்லவும்.',
      'படி 2: "New Farmer Registration" பிரிவில் ஆதார் எண் மற்றும் மாநிலத்தை உள்ளிடவும்.',
      'படி 3: நில சர்வே எண், பட்டா விவரம் மற்றும் வங்கி கணக்கை உள்ளிடவும்.',
      'படி 4: ஆதார் OTP அல்லது கைரேகை மூலம் e-KYC முடிக்கவும்.'
    ],
    officialSource: 'Ministry of Agriculture & Farmers Welfare, Govt of India',
    portalUrl: 'https://pmkisan.gov.in',
    helpline: '155261 / 011-24300606'
  },
  {
    id: 'tn-micro-irrigation',
    name: 'Tamil Nadu Micro Irrigation Scheme (PMKSY - Drip & Sprinkler)',
    nameTamil: 'தமிழ்நாடு நுண்ணீர்ப் பாசனத் திட்டம் (சொட்டு நீர் & தெளிப்பு நீர் பாசனம்)',
    category: 'Irrigation & Tech',
    sponsoringBody: 'Tamil Nadu State Govt',
    maxBenefit: '100% Subsidy for Small & Marginal Farmers; 75% for Other Farmers',
    maxBenefitTamil: 'சிறு & குறு விவசாயிகளுக்கு 100% முழு மானியம்; இதர விவசாயிகளுக்கு 75% மானியம்',
    whyRelevant: 'Save up to 60% irrigation water and increase crop yield by 40% with fully subsidized drip irrigation systems.',
    whyRelevantTamil: '60% வரை பாசன நீரை சேமித்து, பயிர் விளைச்சலை 40% வரை அதிகரிக்க உதவும் முழு மானிய திட்டம்.',
    basicEligibility: [
      'Farmers cultivating fruits, vegetables, sugarcane, cotton, or plantation crops in Tamil Nadu',
      'Small and Marginal farmers owning valid Patta (up to 5 acres)',
      'Assured irrigation source (well/borewell)'
    ],
    basicEligibilityTamil: [
      'தமிழ்நாட்டில் காய்கறிகள், பழங்கள், கரும்பு, பருத்தி அல்லது தோட்டக்கலை பயிரிடும் விவசாயிகள்',
      'செல்லுபடியாகும் பட்டா வைத்துள்ள சிறு/குறு விவசாயிகள் (5 ஏக்கர் வரை)',
      'உறுதியான நீர் ஆதாரம் (கிணறு / ஆழ்துளை கிணறு)'
    ],
    requiredDocuments: [
      'Patta, Chitta, and FMB sketch of land',
      'Small/Marginal Farmer Certificate from Tahsildar/VAO',
      'Water source certificate and Electricity service connection proof',
      'Soil & Water test report'
    ],
    requiredDocumentsTamil: [
      'பட்டா, சிட்டா மற்றும் FMB வரைபடம்',
      'கிராம நிர்வாக அலுவலர் (VAO) வழங்கிய சிறு/குறு விவசாயி சான்றிதழ்',
      'நீர் ஆதாரச் சான்று மற்றும் மின் இணைப்பு எண்',
      'மண் & நீர் பரிசோதனை அறிக்கை'
    ],
    applicationGuidance: [
      'Step 1: Register online at tnhorticulture.tn.gov.in or Uzhavan App.',
      'Step 2: Submit land documents and Small Farmer certificate to Assistant Director of Horticulture (ADH).',
      'Step 3: Field verification will be conducted by horticulture officer.',
      'Step 4: Government-empanelled drip company will install system with zero upfront cost for small farmers.'
    ],
    applicationGuidanceTamil: [
      'படி 1: tnhorticulture.tn.gov.in அல்லது உழவன் செயலி மூலம் பதிவு செய்யவும்.',
      'படி 2: நில ஆவணங்கள் மற்றும் சிறு விவசாயி சான்றிதழை வட்டார தோட்டக்கலை உதவி இயக்குநரிடம் சமர்ப்பிக்கவும்.',
      'படி 3: அலுவலரால் நிலம் கள ஆய்வு செய்யப்படும்.',
      'படி 4: அரசு அங்கீகரித்த நிறுவனம் மூலம் சொட்டு நீர் அமைப்பு இலவசமாக அமைத்துத் தரப்படும்.'
    ],
    officialSource: 'Department of Horticulture & Plantation Crops, Govt of Tamil Nadu',
    portalUrl: 'https://tnhorticulture.tn.gov.in',
    helpline: '1800-425-4444'
  },
  {
    id: 'pmfby-insurance',
    name: 'PMFBY (Pradhan Mantri Fasal Bima Yojana - Crop Insurance)',
    nameTamil: 'பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)',
    category: 'Crop Insurance',
    sponsoringBody: 'Joint Central & State',
    maxBenefit: 'Comprehensive financial compensation up to sum insured against pest outbreaks, drought & floods',
    maxBenefitTamil: 'வறட்சி, வெள்ளம், பூச்சி தாக்குதல் மற்றும் இயற்கை பேரிடரால் ஏற்படும் பயிர் சேதத்திற்கு முழு இழப்பீடு',
    whyRelevant: 'Protects investment against unpredictable weather events for nominal farmer premium (1.5% - 2%).',
    whyRelevantTamil: 'குறைந்த பிரீமியம் தொகையில் (1.5% முதல் 2%) எதிர்பாராத இயற்கை சீற்ற பயிர் இழப்பிற்கு முழு பாதுகாப்பு.',
    basicEligibility: [
      'All farmers cultivating notified crops in notified areas of Tamil Nadu',
      'Both loanee and non-loanee farmers, including tenant farmers with valid lease certificate'
    ],
    basicEligibilityTamil: [
      'அறிவிக்கப்பட்ட பகுதிகளில் அறிவிக்கப்பட்ட பயிர்களை சாகுபடி செய்யும் அனைத்து விவசாயிகள்',
      'கடன் பெற்ற மற்றும் கடன் பெறாத சிறு/குறு மற்றும் குத்தகை விவசாயிகள்'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Sowing Certificate / Adangal issued by VAO',
      'Land records (Patta / Chitta)',
      'Bank passbook copy'
    ],
    requiredDocumentsTamil: [
      'ஆதார் அட்டை',
      'VAO வழங்கிய பயிர் சாகுபடி சான்றிதழ் / அடங்கல்',
      'பட்டா / சிட்டா ஆவணங்கள்',
      'வங்கி பாஸ்புக் நகல்'
    ],
    applicationGuidance: [
      'Step 1: Obtain Crop Adangal from Village Administrative Officer (VAO).',
      'Step 2: Visit Primary Agricultural Cooperative Credit Society (PACCS), Commercial Bank, or Common Service Center (CSC).',
      'Step 3: Pay nominal 1.5% premium before the cutoff sowing cutoff date.',
      'Step 4: Track policy on pmfby.gov.in.'
    ],
    applicationGuidanceTamil: [
      'படி 1: கிராம நிர்வாக அலுவலரிடம் (VAO) சாகுபடி அடங்கல் பெறவும்.',
      'படி 2: தொடக்க வேளாண் கூட்டுறவு சங்கம் அல்லது பொது சேவை மையம் (CSC) செல்லவும்.',
      'படி 3: பயிருக்கான 1.5% முதல் 2% பிரீமியம் தொகையை காலக்கெடுவிற்குள் செலுத்தவும்.',
      'படி 4: pmfby.gov.in தளத்தில் காப்பீட்டு நிலையை கண்காணிக்கவும்.'
    ],
    officialSource: 'Ministry of Agriculture & Farmers Welfare, GoI',
    portalUrl: 'https://pmfby.gov.in',
    helpline: '14447'
  },
  {
    id: 'kalaignar-scheme-tn',
    name: 'Kalaignarin All Village Integrated Agriculture Development Programme',
    nameTamil: 'கலைஞரின் அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சித் திட்டம்',
    category: 'Input Subsidy',
    sponsoringBody: 'Tamil Nadu State Govt',
    maxBenefit: 'Free power sprayer, subsidized certified seeds, coconut saplings & soil kits',
    maxBenefitTamil: 'இலவச பேட்டரி தெளிப்பான், மானியத்தில் தரமான விதைகள், தென்னங்கன்றுகள் & நுண்ணூட்ட உரங்கள்',
    whyRelevant: 'Holistic village-level mission to bring fallow lands into cultivation and boost marginal farm revenue.',
    whyRelevantTamil: 'கிராமப்புற விவசாயிகளை மேம்படுத்தவும், தரிசு நிலங்களை சாகுபடி நிலங்களாக மாற்றவும் வழங்கப்படும் சிறப்பு தொகுப்பு.',
    basicEligibility: [
      'Farmers residing in the selected village panchayats in Tamil Nadu',
      'Priority given to Women farmers, SC/ST, and Small/Marginal farmers'
    ],
    basicEligibilityTamil: [
      'தேர்ந்தெடுக்கப்பட்ட கிராம பஞ்சாயத்தில் உள்ள விவசாயிகள்',
      'பெண் விவசாயிகள், ஆதிதிராவிடர் மற்றும் சிறு/குறு விவசாயிகளுக்கு முன்னுரிமை'
    ],
    requiredDocuments: [
      'Uzhavan App Registration / Farmer ID',
      'Aadhaar Card',
      'Patta / Land Document'
    ],
    requiredDocumentsTamil: [
      'உழவன் செயலி பதிவு எண்',
      'ஆதார் அட்டை',
      'பட்டா / நில ஆவணம்'
    ],
    applicationGuidance: [
      'Step 1: Contact Assistant Agriculture Officer (AAO) at local Agricultural Extension Center (AEC).',
      'Step 2: Apply via Uzhavan App under "Kalaignar Integrated Scheme" tab.',
      'Step 3: Collect seed kits and subsidized inputs during Grama Sabha or distribution camp.'
    ],
    applicationGuidanceTamil: [
      'படி 1: வட்டார வேளாண் விரிவாக்க மையத்தில் உள்ள உதவி வேளாண் அலுவலரை அணுகவும்.',
      'படி 2: உழவன் செயலி மூலம் விண்ணப்பிக்கவும்.',
      'படி 3: வேளாண் விரிவாக்க முகாம்களில் மானிய இடுபொருட்களை பெற்றுக்கொள்ளவும்.'
    ],
    officialSource: 'Department of Agriculture & Farmers Welfare, Govt of Tamil Nadu',
    portalUrl: 'https://agrisnet.tn.gov.in',
    helpline: '1800-180-1551'
  },
  {
    id: 'kisan-credit-card',
    name: 'Kisan Credit Card (KCC) - Low Interest Crop Loan',
    nameTamil: 'கிசான் கடன் அட்டை (KCC) - குறைந்த வட்டி சாகுபடி கடன்',
    category: 'Credit & Loan',
    sponsoringBody: 'Central Government',
    maxBenefit: 'Collateral-free loan up to ₹1.6 Lakh (up to ₹3 Lakh at effectively 4% interest per annum)',
    maxBenefitTamil: '₹1.6 லட்சம் வரை பிணையில்லா கடன் (ஆண்டுக்கு வெறும் 4% வட்டி விகிதத்தில் ₹3 லட்சம் வரை கடன்)',
    whyRelevant: 'Prevents exploitation from local private moneylenders by providing timely institutional credit for seeds, fertilizers, and diesel.',
    whyRelevantTamil: 'கந்துவட்டி கொடுமையிலிருந்து விவசாயிகளை காத்து, விதை மற்றும் உரம் வாங்க மிகக் குறைந்த 4% வட்டியில் கடன் உதவி.',
    basicEligibility: [
      'All farmers - individuals / joint borrowers who are owner cultivators',
      'Tenant farmers, oral lessees & sharecroppers',
      'Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers'
    ],
    basicEligibilityTamil: [
      'நிலம் உள்ள அனைத்து விவசாயிகள் மற்றும் குத்தகை விவசாயிகள்',
      'சுய உதவி குழுக்கள் மற்றும் கூட்டு பொறுப்பு குழுக்கள்'
    ],
    requiredDocuments: [
      'Duly filled KCC application form',
      'Identity Proof (Aadhaar / Voter ID)',
      'Address Proof & Land Records attested by VAO',
      'Cropping pattern details'
    ],
    requiredDocumentsTamil: [
      'பூர்த்தி செய்யப்பட்ட KCC விண்ணப்பப் படிவம்',
      'அடையாளச் சான்று (ஆதார் அட்டை)',
      'நில உரிமை ஆவணம் மற்றும் பயிர் விவர அடங்கல்',
      'புகைப்படம்'
    ],
    applicationGuidance: [
      'Step 1: Download KCC form from bank website or collect at nearest Nationalised/Cooperative Bank.',
      'Step 2: Attach land records and Aadhaar.',
      'Step 3: Bank processes and issues RuPay KCC card within 14 working days.'
    ],
    applicationGuidanceTamil: [
      'படி 1: அருகிலுள்ள தேசியமயமாக்கப்பட்ட அல்லது கூட்டுறவு வங்கியில் KCC படிவத்தை பெறவும்.',
      'படி 2: நில ஆவணங்கள் மற்றும் ஆதாரை இணைத்து சமர்ப்பிக்கவும்.',
      'படி 3: 14 வேலை நாட்களுக்குள் வங்கி RuPay KCC கார்டை வழங்கும்.'
    ],
    officialSource: 'Reserve Bank of India & NABARD',
    portalUrl: 'https://www.nabard.org',
    helpline: '1800-22-9090'
  },
  {
    id: 'soil-health-card',
    name: 'Soil Health Card Scheme (மண் வள அட்டை திட்டம்)',
    nameTamil: 'மண் வள அட்டை திட்டம் (Soil Health Card)',
    category: 'Input Subsidy',
    sponsoringBody: 'Joint Central & State',
    maxBenefit: 'Free comprehensive 12-parameter soil testing & customized NPK fertilizer recommendation',
    maxBenefitTamil: 'இலவச 12 காரணி மண் பரிசோதனை & பயிருக்கேற்ற துல்லியமான NPK உர பரிந்துரை',
    whyRelevant: 'Reduces excessive fertilizer expenditure by 25% and restores long-term soil fertility and yield.',
    whyRelevantTamil: 'தேவையற்ற உரச் செலவை 25% குறைத்து, நிலத்தின் வளத்தை பாதுகாத்து கூடுதல் விளைச்சல் பெற உதவுகிறது.',
    basicEligibility: [
      'All farmers cultivating any crop across India'
    ],
    basicEligibilityTamil: [
      'அனைத்து பயிர் சாகுபடி செய்யும் இந்திய விவசாயிகள்'
    ],
    requiredDocuments: [
      'Aadhaar Number',
      'Land Survey Number'
    ],
    requiredDocumentsTamil: [
      'ஆதார் எண்',
      'நில சர்வே எண்'
    ],
    applicationGuidance: [
      'Step 1: Contact local Agricultural Extension Center to collect soil sample.',
      'Step 2: Government Mobile Soil Testing Lab tests micronutrients (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC).',
      'Step 3: Receive printed Soil Health Card with tailored dosage.'
    ],
    applicationGuidanceTamil: [
      'படி 1: வேளாண் விரிவாக்க மையத்தை அணுகி மண் மாதிரி எடுக்க கோரவும்.',
      'படி 2: நடமாடும் மண் ஆய்வு ஆய்வகம் மூலம் சத்துக்கள் பரிசோதிக்கப்படும்.',
      'படி 3: உங்கள் நிலத்திற்கான உர அளவு பரிந்துரை அட்டை வழங்கப்படும்.'
    ],
    officialSource: 'Ministry of Agriculture & Farmers Welfare, GoI',
    portalUrl: 'https://soilhealth.dac.gov.in',
    helpline: '011-23381012'
  }
];

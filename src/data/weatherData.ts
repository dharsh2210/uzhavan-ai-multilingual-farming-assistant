import { WeatherData, WeatherCropRecommendation } from '../types';

export const districtWeatherDatabase: Record<string, WeatherData> = {
  Thanjavur: {
    location: 'Thanjavur (Cauvery Delta)',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    temperature: 32,
    feelsLike: 37,
    humidity: 78,
    windSpeed: 14,
    rainProbability: 70,
    rainfallExpectedMm: 38.5,
    condition: 'Thunderstorms Expected Tomorrow',
    conditionTamil: 'நாளை இடிமின்னலுடன் கூடிய கனமழை வாய்ப்பு',
    icon: 'rain-thunder',
    uvIndex: 7,
    soilMoistureEst: 'High (82%)',
    forecast: [
      { day: 'Today', dayTamil: 'இன்று', date: 'Day 1', tempMax: 33, tempMin: 25, rainProb: 35, rainfallMm: 2.0, condition: 'Partly Cloudy', conditionTamil: 'பகுதி மேகமூட்டம்', spraySuitability: 'Caution' },
      { day: 'Tomorrow', dayTamil: 'நாளை', date: 'Day 2', tempMax: 30, tempMin: 23, rainProb: 85, rainfallMm: 42.0, condition: 'Heavy Rain & Thunder', conditionTamil: 'கனமழை & இடி', spraySuitability: 'Unsafe' },
      { day: 'Thursday', dayTamil: 'வியாழன்', date: 'Day 3', tempMax: 29, tempMin: 22, rainProb: 65, rainfallMm: 18.0, condition: 'Scattered Showers', conditionTamil: 'விட்டு விட்டு மழை', spraySuitability: 'Unsafe' },
      { day: 'Friday', dayTamil: 'வெள்ளி', date: 'Day 4', tempMax: 31, tempMin: 24, rainProb: 20, rainfallMm: 0.0, condition: 'Clear Sunshine', conditionTamil: 'தெளிவான வெயில்', spraySuitability: 'Optimal' },
      { day: 'Saturday', dayTamil: 'சனி', date: 'Day 5', tempMax: 33, tempMin: 25, rainProb: 15, rainfallMm: 0.0, condition: 'Sunny & Dry', conditionTamil: 'சூரிய ஒளி & வறண்ட நிலை', spraySuitability: 'Optimal' }
    ]
  },
  Dindigul: {
    location: 'Oddanchatram / Dindigul',
    district: 'Dindigul',
    state: 'Tamil Nadu',
    temperature: 29,
    feelsLike: 31,
    humidity: 62,
    windSpeed: 11,
    rainProbability: 25,
    rainfallExpectedMm: 1.5,
    condition: 'Pleasant & Mild Breeze',
    conditionTamil: 'மிதமான காற்று & இதமான சூழல்',
    icon: 'sun-cloud',
    uvIndex: 8,
    soilMoistureEst: 'Moderate (54%)',
    forecast: [
      { day: 'Today', dayTamil: 'இன்று', date: 'Day 1', tempMax: 30, tempMin: 21, rainProb: 25, rainfallMm: 1.5, condition: 'Partly Cloudy', conditionTamil: 'பகுதி மேகமூட்டம்', spraySuitability: 'Optimal' },
      { day: 'Tomorrow', dayTamil: 'நாளை', date: 'Day 2', tempMax: 31, tempMin: 22, rainProb: 20, rainfallMm: 0.0, condition: 'Sunny', conditionTamil: 'வெயில்', spraySuitability: 'Optimal' },
      { day: 'Thursday', dayTamil: 'வியாழன்', date: 'Day 3', tempMax: 31, tempMin: 21, rainProb: 10, rainfallMm: 0.0, condition: 'Clear Sky', conditionTamil: 'தெளிவான வானம்', spraySuitability: 'Optimal' },
      { day: 'Friday', dayTamil: 'வெள்ளி', date: 'Day 4', tempMax: 32, tempMin: 22, rainProb: 15, rainfallMm: 0.0, condition: 'Sunny & Warm', conditionTamil: 'வெயில் & மிதவெப்பம்', spraySuitability: 'Optimal' },
      { day: 'Saturday', dayTamil: 'சனி', date: 'Day 5', tempMax: 30, tempMin: 20, rainProb: 40, rainfallMm: 6.0, condition: 'Evening Shower', conditionTamil: 'மாலை நேரத் தூறல்', spraySuitability: 'Caution' }
    ]
  },
  Coimbatore: {
    location: 'Pollachi / Coimbatore',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    temperature: 30,
    feelsLike: 33,
    humidity: 68,
    windSpeed: 19,
    rainProbability: 45,
    rainfallExpectedMm: 8.0,
    condition: 'Gusty Winds with Light Showers',
    conditionTamil: 'பலத்த காற்றுடன் கூடிய லேசான தூறல்',
    icon: 'wind-rain',
    uvIndex: 6,
    soilMoistureEst: 'Moderate (60%)',
    forecast: [
      { day: 'Today', dayTamil: 'இன்று', date: 'Day 1', tempMax: 30, tempMin: 22, rainProb: 45, rainfallMm: 8.0, condition: 'Windy & Showers', conditionTamil: 'காற்றுடன் மழை', spraySuitability: 'Caution' },
      { day: 'Tomorrow', dayTamil: 'நாளை', date: 'Day 2', tempMax: 31, tempMin: 23, rainProb: 30, rainfallMm: 2.0, condition: 'Breezy', conditionTamil: 'தென்றல் காற்று', spraySuitability: 'Optimal' },
      { day: 'Thursday', dayTamil: 'வியாழன்', date: 'Day 3', tempMax: 32, tempMin: 23, rainProb: 15, rainfallMm: 0.0, condition: 'Clear Sunshine', conditionTamil: 'வெயில்', spraySuitability: 'Optimal' },
      { day: 'Friday', dayTamil: 'வெள்ளி', date: 'Day 4', tempMax: 33, tempMin: 24, rainProb: 10, rainfallMm: 0.0, condition: 'Sunny', conditionTamil: 'சூரிய ஒளி', spraySuitability: 'Optimal' },
      { day: 'Saturday', dayTamil: 'சனி', date: 'Day 5', tempMax: 32, tempMin: 23, rainProb: 20, rainfallMm: 0.5, condition: 'Partly Cloudy', conditionTamil: 'பகுதி மேகமூட்டம்', spraySuitability: 'Optimal' }
    ]
  },
  Madurai: {
    location: 'Madurai Rural / Melur',
    district: 'Madurai',
    state: 'Tamil Nadu',
    temperature: 35,
    feelsLike: 39,
    humidity: 55,
    windSpeed: 12,
    rainProbability: 15,
    rainfallExpectedMm: 0.0,
    condition: 'Hot & Dry Weather',
    conditionTamil: 'அதிக வெயில் & வறண்ட வானிலை',
    icon: 'sun',
    uvIndex: 9,
    soilMoistureEst: 'Low (38%)',
    forecast: [
      { day: 'Today', dayTamil: 'இன்று', date: 'Day 1', tempMax: 36, tempMin: 26, rainProb: 15, rainfallMm: 0.0, condition: 'Sunny & Hot', conditionTamil: 'வெயில் & வெப்பம்', spraySuitability: 'Optimal' },
      { day: 'Tomorrow', dayTamil: 'நாளை', date: 'Day 2', tempMax: 37, tempMin: 26, rainProb: 10, rainfallMm: 0.0, condition: 'Clear Sky', conditionTamil: 'தெளிவான வானம்', spraySuitability: 'Optimal' },
      { day: 'Thursday', dayTamil: 'வியாழன்', date: 'Day 3', tempMax: 36, tempMin: 25, rainProb: 15, rainfallMm: 0.0, condition: 'Sunny', conditionTamil: 'சூரிய ஒளி', spraySuitability: 'Optimal' },
      { day: 'Friday', dayTamil: 'வெள்ளி', date: 'Day 4', tempMax: 35, tempMin: 25, rainProb: 25, rainfallMm: 1.0, condition: 'Partly Cloudy', conditionTamil: 'மேகமூட்டம்', spraySuitability: 'Optimal' },
      { day: 'Saturday', dayTamil: 'சனி', date: 'Day 5', tempMax: 34, tempMin: 24, rainProb: 35, rainfallMm: 4.0, condition: 'Passing Clouds', conditionTamil: 'மழை மேகங்கள்', spraySuitability: 'Caution' }
    ]
  }
};

export function generateWeatherCropRecommendation(
  districtName: string,
  cropName: string,
  cropStage: string
): WeatherCropRecommendation {
  const weather = districtWeatherDatabase[districtName] || districtWeatherDatabase['Thanjavur'];
  const hasHeavyRainSoon = weather.forecast.some(f => f.rainProb >= 60 || f.rainfallMm >= 15);

  if (districtName === 'Thanjavur' || hasHeavyRainSoon) {
    return {
      crop: cropName,
      cropStage: cropStage,
      irrigationNeeded: false,
      irrigationReason: `Heavy rain (42mm) forecast for tomorrow. Postpone canal/well irrigation immediately to avoid root rot and nutrient leaching.`,
      irrigationReasonTamil: `நாளை 42 மி.மீ கனமழை எதிர்பார்க்கப்படுவதால், வேரழுகல் மற்றும் சத்து விரயத்தை தடுக்க பாசனத்தை உடனடியாக நிறுத்தி வைக்கவும்.`,
      heavyRainExpected: true,
      rainWarningNote: `40mm+ precipitation expected in next 24-48 hours. Clear drainage channels (வடிகால்) in low-lying paddy bunds to prevent submergence.`,
      rainWarningNoteTamil: `அடுத்த 24-48 மணி நேரத்தில் 40 மி.மீ+ கனமழை பெய்யக்கூடும். நெற்பயிரில் தண்ணீர் தேங்காமல் இருக்க வடிகால் வாய்க்கால்களை உடனே தூர்வாரி வைக்கவும்.`,
      sprayingAdvisory: {
        safeToSpray: false,
        reason: `High risk of rain-washout within 24h. Wind speed at 14 km/h causes drift. Postpone all chemical & fertilizer sprays until Friday.`,
        reasonTamil: `அடுத்த 24 மணி நேரத்தில் மழை பெய்து மருந்து அடித்துச் செல்லப்படும் அபாயம் உள்ளது. வெள்ளிக்கிழமை வரை மருந்து தெளிப்பதை தள்ளிப்போடவும்.`,
        bestWindow: `Friday 7:00 AM - 10:30 AM (Sunny, dry canopy, low wind)`
      },
      cropRiskAlerts: [
        {
          level: 'High',
          riskTitle: 'Sheath Blight & Blast Outbreak Trigger',
          riskTitleTamil: 'குலை நோய் மற்றும் இலை உறை அழுகல் அபாயம்',
          riskDescription: 'Continuous canopy wetness > 14 hours and high humidity (78%) creates ideal spore germination conditions.',
          riskDescriptionTamil: 'தொடர் இலை ஈரம் மற்றும் 78% ஈரப்பதம் பூஞ்சாண வித்துக்கள் வேகமாக பரவ வழிவகுக்கும்.',
          action: 'Inspect bund perimeter for spindle lesions. Keep ready bio-control agents for post-rain spray.',
          actionTamil: 'மழை நின்ற பிறகு தெளிக்க சூடோமோனாஸ் அல்லது டிரைசைக்ளசோல் தயார் நிலையில் வைக்கவும்.'
        }
      ],
      upcomingDaysActions: [
        { day: 'Today', dayTamil: 'இன்று', action: 'Inspect and deepen drainage outlets in your field corners', actionTamil: 'வயலின் மூலைகளில் உள்ள வடிகால் வாய்க்கால்களை ஆழப்படுத்தி சீரமைக்கவும்', priority: 'Urgent' },
        { day: 'Tomorrow', dayTamil: 'நாளை', action: 'Avoid entering wet fields during thunderstorm; do not apply urea fertilizer', actionTamil: 'இடிமின்னல் போது வயலுக்கு செல்ல வேண்டாம்; யூரியா உரம் இடக்கூடாது', priority: 'Urgent' },
        { day: 'Friday', dayTamil: 'வெள்ளி', action: 'Resume foliar nutrient spray once morning dew evaporates', actionTamil: 'காலை பனி உலர்ந்ததும் இலைவழி ஊட்டச்சத்து தெளிப்பை மீண்டும் தொடங்கவும்', priority: 'Normal' }
      ]
    };
  } else if (districtName === 'Madurai' || weather.temperature >= 35) {
    return {
      crop: cropName,
      cropStage: cropStage,
      irrigationNeeded: true,
      irrigationReason: `Hot weather (36°C) with low soil moisture (38%). Provide light evening irrigation to safeguard flowering and prevent flower drop.`,
      irrigationReasonTamil: `அதிக வெப்பம் (36°C) மற்றும் குறைந்த மண் ஈரப்பதம் (38%). பூக்கள் உதிர்வதை தடுக்க மாலை வேளையில் மிதமான பாசனம் செய்யவும்.`,
      heavyRainExpected: false,
      rainWarningNote: `No heavy rain expected for the next 5 days. Dry spell continues.`,
      rainWarningNoteTamil: `அடுத்த 5 நாட்களுக்கு கனமழை வாய்ப்பில்லை. வறண்ட வானிலையே நிலவும்.`,
      sprayingAdvisory: {
        safeToSpray: true,
        reason: `Dry weather with low rain probability (15%). Ideal spray window available today during early morning hours.`,
        reasonTamil: `மழை வாய்ப்பு குறைவு. அதிகாலை வேளையில் (காலை 6:30 முதல் 9:00 வரை) மருந்து தெளிக்க மிகவும் உகந்த சூழல்.`,
        bestWindow: `Today & Tomorrow: 6:30 AM - 9:00 AM (Before sun intensity peaks)`
      },
      cropRiskAlerts: [
        {
          level: 'Medium',
          riskTitle: 'Moisture Stress & Sucking Pest Surge',
          riskTitleTamil: 'வறட்சி அழுத்தம் & சாறு உறிஞ்சும் பூச்சிகள் அதிகரிப்பு',
          riskDescription: 'Dry hot days encourage thrips and red spider mite multiplication on underside of foliage.',
          riskDescriptionTamil: 'வறண்ட வெயில் காலத்தில் இலைப்பேன் மற்றும் அசுவினி பூச்சிகளின் பெருக்கம் அதிகரிக்கும்.',
          action: 'Apply mulching to conserve moisture; install yellow/blue sticky traps.',
          actionTamil: 'ஈரப்பதத்தை காக்க மூடாக்கு இடவும்; வண்ண ஒட்டும் பொறிகளை அமைக்கவும்.'
        }
      ],
      upcomingDaysActions: [
        { day: 'Today', dayTamil: 'இன்று', action: 'Schedule drip or light furrow irrigation between 5:30 PM - 7:00 PM', actionTamil: 'மாலை 5:30 முதல் 7:00 மணிக்குள் சொட்டு நீர் பாசனம் செய்யவும்', priority: 'Urgent' },
        { day: 'Tomorrow', dayTamil: 'நாளை', action: 'Spray micronutrient mixture with bio-stimulant at 7:00 AM', actionTamil: 'காலை 7:00 மணிக்கு நுண்ணூட்ட உரக் கலவையை தெளிக்கவும்', priority: 'Normal' }
      ]
    };
  } else {
    // Default Dindigul / Coimbatore
    return {
      crop: cropName,
      cropStage: cropStage,
      irrigationNeeded: true,
      irrigationReason: `Moderate soil moisture (54%). Maintain regulated drip cycle of 45 mins every 2 days during ${cropStage} stage.`,
      irrigationReasonTamil: `மிதமான மண் ஈரப்பதம். ${cropStage} பருவத்தில் 2 நாட்களுக்கு ஒருமுறை 45 நிமிடங்கள் சொட்டு நீர் பாசனம் செய்யவும்.`,
      heavyRainExpected: false,
      rainWarningNote: `Clear skies with light evening showers (1.5mm) possible. No drainage risks.`,
      rainWarningNoteTamil: `தெளிவான வானிலை. லேசான மாலை நேரத் தூறல் மட்டுமே எதிர்பார்க்கப்படுகிறது.`,
      sprayingAdvisory: {
        safeToSpray: true,
        reason: `Wind speed is calm (11 km/h) and no rain forecast for 48h. Safe for foliar bio-fertilizer and pesticide applications.`,
        reasonTamil: `காற்றின் வேகம் குறைவாக உள்ளதால் (11 கி.மீ/மணி) இலைவழி உரம் மற்றும் பூச்சி மருந்து தெளிக்க உகந்த நேரம்.`,
        bestWindow: `Today & Tomorrow: 7:00 AM - 10:00 AM or 4:30 PM - 6:00 PM`
      },
      cropRiskAlerts: [
        {
          level: 'Low',
          riskTitle: 'Optimal Growth Conditions',
          riskTitleTamil: 'சாதகமான பயிர் வளர்ச்சி சூழல்',
          riskDescription: 'Mild temperatures and adequate sunshine support vigorous vegetative growth and bloom.',
          riskDescriptionTamil: 'மிதமான தட்பவெப்பநிலை பயிரின் ஆரோக்கியமான வளர்ச்சிக்கு சாதகமாக உள்ளது.',
          action: 'Monitor soil moisture and maintain scheduled fertigation.',
          actionTamil: 'மண் ஈரப்பதத்தை கவனித்து வழக்கமான உரப்பாசனத்தை தொடரவும்.'
        }
      ],
      upcomingDaysActions: [
        { day: 'Today', dayTamil: 'இன்று', action: 'Apply Panchagavya 3% foliar spray to boost flower set', actionTamil: 'பூக்கள் நன்கு பிடிக்க 3% பஞ்சகவ்யா தெளிக்கவும்', priority: 'Normal' },
        { day: 'Tomorrow', dayTamil: 'நாளை', action: 'De-weed row boundaries to eliminate hiding pest hosts', actionTamil: 'பயிர் வரிசைகளுக்கு இடையே உள்ள களைகளை அகற்றவும்', priority: 'Normal' }
      ]
    };
  }
}

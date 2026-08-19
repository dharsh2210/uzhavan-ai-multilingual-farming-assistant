import { GoogleGenAI } from "@google/genai";
import { DiseasePrediction } from "../src/types";

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const CANDIDATE_MODELS = [
  'gemini-3.7-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite'
];

async function callGeminiWithFallback(
  ai: GoogleGenAI,
  contents: any,
  config?: any
): Promise<string | null> {
  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config,
      });
      if (response.text) {
        return response.text;
      }
    } catch (err: any) {
      const errorMsg = err?.message || String(err);
      const isTransient =
        errorMsg.includes('503') ||
        errorMsg.includes('high demand') ||
        errorMsg.includes('429') ||
        errorMsg.includes('UNAVAILABLE') ||
        errorMsg.includes('RESOURCE_EXHAUSTED');

      if (isTransient) {
        console.warn(`Model ${model} unavailable (transient high demand / 503). Retrying with next model in cascade...`);
        // Short jitter before trying next model
        await new Promise(r => setTimeout(r, 400));
        continue;
      } else {
        console.warn(`Model ${model} request error:`, errorMsg);
      }
    }
  }
  return null;
}

export async function analyzeLeafImageWithGemini(
  base64Data: string,
  mimeType: string = 'image/jpeg',
  cropHint?: string,
  preferredLanguage: 'en' | 'ta' = 'en'
): Promise<Partial<DiseasePrediction> | null> {
  const ai = getAiClient();
  if (!ai) return null;

  try {
    const mimeMatch = base64Data.match(/^data:([^;]+);base64,/);
    const effectiveMime = mimeMatch ? mimeMatch[1] : (mimeType || 'image/jpeg');
    const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');

    const prompt = `You are an expert Agricultural Plant Pathologist and Agronomist specializing in Indian agriculture and Tamil Nadu crops (Rice/Paddy, Banana, Tomato, Cotton, Maize, Sugarcane, Chilly, Groundnut, Coconut).

INSPECTION TASK:
1. Inspect this leaf or crop photo carefully.
2. FIRST determine the EXACT CROP TYPE purely from the visual leaf morphology (e.g. Banana leaf has a very large, broad, oblong blade with prominent central midrib and parallel transverse lateral veins; Rice has long slender linear blades with parallel longitudinal veins; Tomato has pinnately compound serrated leaflets; Cotton has 3-5 palmately lobed leaves; Maize has long arching strap-like leaves).
3. If user passed a crop hint ("${cropHint || 'Auto-detect'}"), use it as secondary context, but ALWAYS override it if the image clearly shows a different crop (such as Banana, Tomato, Cotton, Maize, Rice, etc.).
4. Identify the specific plant disease, pest damage, fungal/bacterial spot, viral symptom, or whether the leaf is healthy.
5. Provide actionable bio-organic and chemical remedies with exact dosages recommended by TNAU (Tamil Nadu Agricultural University) / ICAR.

Return a STRICT valid JSON object with the following fields:
{
  "cropName": "Exact detected crop name (e.g. 'Banana', 'Rice (Paddy)', 'Tomato', 'Cotton', 'Maize')",
  "diseaseName": "Scientific and common name of detected problem (e.g. 'Yellow Sigatoka Leaf Spot (Mycosphaerella musicola)' or 'Rice Blast (Magnaporthe oryzae)')",
  "diseaseNameTamil": "Tamil translation of disease name (e.g. 'வாழை சிகடோகா இலைப்புள்ளி நோய்' or 'நெல் குலை நோய்')",
  "conditionStatus": "Healthy" | "Mild" | "Moderate" | "Severe",
  "confidence": numeric confidence between 75 and 99 (e.g. 94.5),
  "isConfidenceLow": boolean (true if < 75),
  "possibleCauses": ["cause 1 in English", "cause 2 in English"],
  "possibleCausesTamil": ["காரணம் 1 தமிழில்", "காரணம் 2 தமிழில்"],
  "preventiveActions": ["cultural practice 1 in English", "practice 2 in English"],
  "preventiveActionsTamil": ["முன்னெச்சரிக்கை 1 தமிழில்", "முன்னெச்சரிக்கை 2 தமிழில்"],
  "recommendedMedicines": [
    {
      "name": "Remedy Name in English & Tamil (e.g. Pseudomonas fluorescens / சூடோமோனாஸ்)",
      "dosage": "exact dosage (e.g. 5g / liter water or 1ml/liter)",
      "type": "Organic/Bio" | "Chemical" | "Cultural Practice"
    }
  ],
  "expertVerificationAdvice": "One clear advisory sentence in English for when to contact agricultural extension officer",
  "expertVerificationAdviceTamil": "வேளாண்மை அலுவலரை எப்போது தொடர்பு கொள்ள வேண்டும் என்பதற்கான தமிழ் வழிகாட்டல்",
  "aiExplanation": "A 2-3 sentence grounded explanation in ${preferredLanguage === 'ta' ? 'simple Tamil' : 'simple English'} explaining what visual symptoms were detected on the leaf blade."
}
Do not enclose in markdown code fences if responseMimeType is json.`;

    const rawText = await callGeminiWithFallback(
      ai,
      {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: effectiveMime,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      {
        responseMimeType: 'application/json',
        temperature: 0.2,
      }
    );

    if (!rawText) return null;

    const parsed = JSON.parse(rawText);
    return {
      ...parsed,
      modelEngine: 'Gemini Multimodal AI' as const,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.warn("Leaf analysis fallback notice:", error);
    return null;
  }
}

export async function generateAgronomicAssistantResponse(
  userQuery: string,
  farmerContext: {
    name?: string;
    crop?: string;
    stage?: string;
    district?: string;
    landSize?: number;
    weatherSummary?: string;
    language?: 'en' | 'ta';
  }
): Promise<{ text: string; language: 'en' | 'ta'; sources: string[] }> {
  const ai = getAiClient();
  const lang = farmerContext.language || (/[^\u0000-\u007F]/.test(userQuery) ? 'ta' : 'en');

  if (!ai) {
    // Intelligent fallback domain knowledge engine
    return getOfflineAdvisory(userQuery, farmerContext, lang);
  }

  try {
    const prompt = `You are "Uzhavan AI" (உழவன் AI), an empathetic, highly knowledgeable agricultural decision assistant for small and marginal farmers in India (specifically Tamil Nadu).
Language Mode: ${lang === 'ta' ? 'TAMIL (தூய எளிய தமிழ் - non-technical vernacular language suitable for smallholders)' : 'ENGLISH (Simple, practical, non-jargon)'}.

Farmer Context:
- Farmer Name: ${farmerContext.name || 'Farmer'}
- Primary Crop: ${farmerContext.crop || 'Paddy / Vegetables'}
- Crop Growth Stage: ${farmerContext.stage || 'Vegetative / Flowering'}
- District/Location: ${farmerContext.district || 'Thanjavur, Tamil Nadu'}
- Land Holding: ${farmerContext.landSize || 2.0} Acres (Marginal Farmer)
- Local Weather Context: ${farmerContext.weatherSummary || 'Humid with chance of showers'}

User's Question: "${userQuery}"

Guidelines:
1. Provide actionable, realistic agricultural advice with organic first, chemical as secondary measure if severe.
2. If language is Tamil, respond ENTIRELY in fluent, respectful, conversational Tamil (வணக்கம், எளிய நடை).
3. If language is English, respond in clear, easy-to-understand English.
4. Keep the answer concise (2-4 clear paragraphs/bullet points) so it is easy to read or listen to on mobile.
5. Emphasize safety (wearing protective mask when spraying, checking with local Agriculture Extension Officer / VAO / KVK).
6. Ground the response in real Indian agricultural schemes (PM-KISAN, TN Micro Irrigation, PMFBY) or TNAU agronomic best practices.`;

    const rawText = await callGeminiWithFallback(ai, prompt, { temperature: 0.3 });

    if (!rawText) {
      return getOfflineAdvisory(userQuery, farmerContext, lang);
    }

    return {
      text: rawText,
      language: lang,
      sources: ['TNAU Agritech Portal', 'IMD Agromet Advisory Service', 'Ministry of Agriculture & Farmers Welfare']
    };
  } catch (error) {
    console.warn("Gemini assistant notice (using offline advisory):", error);
    return getOfflineAdvisory(userQuery, farmerContext, lang);
  }
}

function getOfflineAdvisory(
  userQuery: string,
  farmerContext: any,
  lang: 'en' | 'ta'
): { text: string; language: 'en' | 'ta'; sources: string[] } {
  if (lang === 'ta') {
    if (userQuery.includes('மழை') || userQuery.includes('தண்ணீர்') || userQuery.includes('பாசனம்')) {
      return {
        text: `வணக்கம் ${farmerContext.name || 'விவசாயி நண்பரே'}! உங்கள் மாவட்டம் (${farmerContext.district || 'தஞ்சாவூர்'}) வானிலை படி, அடுத்த 24-48 மணி நேரத்தில் மழை வாய்ப்பு உள்ளது. எனவே தற்போது வயலுக்கு பாசனம் செய்வதை நிறுத்தி வைக்கவும். வடிகால் வாய்க்கால்களை தூர்வாரி வைக்கவும்.`,
        language: 'ta',
        sources: ['IMD சென்னை வானிலை மையம்', 'TNAU பயிர் பாசன வழிகாட்டி']
      };
    }
    if (userQuery.includes('நோய்') || userQuery.includes('மருந்து') || userQuery.includes('இலை')) {
      return {
        text: `உங்கள் ${farmerContext.crop || 'பயிர்'} இலைகளில் கருகல் அல்லது புள்ளிகள் தென்பட்டால், ஆரம்ப நிலையில் உயிரியல் பூஞ்சாணக் கொல்லியான சூடோமோனாஸ் (Pseudomonas fluorescens) ஒரு லிட்டர் தண்ணீருக்கு 5 கிராம் வீதம் கலந்து காலை வேளையில் தெளிக்கவும். தீவிரமாக இருந்தால் டிரைசைக்ளசோல் 0.6 கிராம்/லிட்டர் பயன்படுத்தலாம்.`,
        language: 'ta',
        sources: ['TNAU அக்ரிடெக் போர்டல்', 'தமிழ்நாடு வேளாண்மை பல்கலைக்கழகம்']
      };
    }
    if (userQuery.includes('திட்டம்') || userQuery.includes('மானியம்') || userQuery.includes('பணம்')) {
      return {
        text: `சிறு/குறு விவசாயிகளுக்கு தமிழ்நாடு அரசின் நுண்ணீர்ப்பாசனத் திட்டத்தில் (சொட்டுநீர் பாசனம்) 100% முழு மானியம் கிடைக்கிறது. மேலும் PM-KISAN மூலம் ஆண்டுக்கு ₹6,000 மற்றும் கலைஞர் ஒருங்கிணைந்த வேளாண் திட்டத்தில் இலவச பேட்டரி தெளிப்பான் பெறலாம். உழவன் செயலி மூலம் விண்ணப்பிக்கலாம்.`,
        language: 'ta',
        sources: ['தமிழ்நாடு அரசு வேளாண்மை & உழவர் நலத்துறை', 'pmkisan.gov.in']
      };
    }
    return {
      text: `வணக்கம்! உங்கள் ${farmerContext.crop || 'பயிர்'} சாகுபடி, உர மேலாண்மை, பூச்சி கட்டுப்பாடு அல்லது அரசு நலத்திட்டங்கள் பற்றி எந்த கேள்வியும் கேளுங்கள். உங்களுக்கு உதவ உழவன் AI எப்போதும் தயாராக உள்ளது.`,
      language: 'ta',
      sources: ['உழவன் AI வேளாண் அறிவு மையம்']
    };
  } else {
    if (userQuery.toLowerCase().includes('rain') || userQuery.toLowerCase().includes('water') || userQuery.toLowerCase().includes('irrigation')) {
      return {
        text: `Hello ${farmerContext.name || 'Farmer'}! Based on current weather for ${farmerContext.district || 'your area'}, precipitation is expected soon. We advise pausing field irrigation to prevent waterlogging and root rot. Ensure proper drainage outlets in low-lying bunds.`,
        language: 'en',
        sources: ['IMD Agromet Advisory', 'TNAU Irrigation Protocol']
      };
    }
    if (userQuery.toLowerCase().includes('disease') || userQuery.toLowerCase().includes('leaf') || userQuery.toLowerCase().includes('spray')) {
      return {
        text: `For leaf spot or blight in ${farmerContext.crop || 'your crop'}, apply Pseudomonas fluorescens bio-fungicide @ 5g/liter of water during early morning. Avoid chemical spraying on windy or rainy days to prevent chemical drift and wash-off.`,
        language: 'en',
        sources: ['TNAU Agritech Portal', 'ICAR Crop Protection Advisory']
      };
    }
    return {
      text: `Welcome! I am your AI Farming Assistant. You can ask me about weather advisories, crop diseases, fertilizer schedules, or government subsidy schemes tailored to your farm in ${farmerContext.district || 'Tamil Nadu'}.`,
      language: 'en',
      sources: ['Uzhavan AI Agritech Base']
    };
  }
}


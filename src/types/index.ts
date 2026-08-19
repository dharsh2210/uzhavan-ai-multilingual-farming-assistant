export type Language = 'en' | 'ta';

export interface User {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  village: string;
  landSizeAcres: number;
  farmerCategory: 'Marginal (< 2.5 acres)' | 'Small (2.5 - 5 acres)' | 'Medium (5 - 10 acres)' | 'Large (> 10 acres)' | 'Tenant Farmer';
  primaryCrop: string;
  cropStage: 'Sowing' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvest';
  irrigationType: 'Borewell' | 'Canal' | 'Drip/Sprinkler' | 'Rainfed';
  soilType: 'Clayey Loam' | 'Red Soil' | 'Black Cotton Soil' | 'Alluvial Soil' | 'Sandy Loam';
  preferredLanguage: Language;
}

export interface DiseasePrediction {
  id: string;
  cropName: string;
  diseaseName: string;
  diseaseNameTamil: string;
  conditionStatus: 'Healthy' | 'Mild' | 'Moderate' | 'Severe';
  confidence: number; // 0 - 100
  isConfidenceLow: boolean;
  possibleCauses: string[];
  possibleCausesTamil: string[];
  preventiveActions: string[];
  preventiveActionsTamil: string[];
  recommendedMedicines: {
    name: string;
    dosage: string;
    type: 'Organic/Bio' | 'Chemical' | 'Cultural Practice';
  }[];
  expertVerificationAdvice: string;
  expertVerificationAdviceTamil: string;
  timestamp: string;
  imageUrl?: string;
  aiExplanation?: string;
  modelEngine: 'Gemini Multimodal AI' | 'Edge Computer Vision Pipeline';
}

export interface WeatherData {
  location: string;
  district: string;
  state: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number; // km/h
  rainProbability: number; // %
  rainfallExpectedMm: number;
  condition: string;
  conditionTamil: string;
  icon: string;
  uvIndex: number;
  soilMoistureEst: string;
  forecast: {
    day: string;
    dayTamil: string;
    date: string;
    tempMax: number;
    tempMin: number;
    rainProb: number;
    rainfallMm: number;
    condition: string;
    conditionTamil: string;
    spraySuitability: 'Optimal' | 'Caution' | 'Unsafe';
  }[];
}

export interface WeatherCropRecommendation {
  crop: string;
  cropStage: string;
  irrigationNeeded: boolean;
  irrigationReason: string;
  irrigationReasonTamil: string;
  heavyRainExpected: boolean;
  rainWarningNote: string;
  rainWarningNoteTamil: string;
  sprayingAdvisory: {
    safeToSpray: boolean;
    reason: string;
    reasonTamil: string;
    bestWindow: string;
  };
  cropRiskAlerts: {
    level: 'Low' | 'Medium' | 'High' | 'Critical';
    riskTitle: string;
    riskTitleTamil: string;
    riskDescription: string;
    riskDescriptionTamil: string;
    action: string;
    actionTamil: string;
  }[];
  upcomingDaysActions: {
    day: string;
    dayTamil: string;
    action: string;
    actionTamil: string;
    priority: 'Normal' | 'Urgent';
  }[];
}

export interface GovernmentScheme {
  id: string;
  name: string;
  nameTamil: string;
  category: 'Direct Income' | 'Crop Insurance' | 'Irrigation & Tech' | 'Input Subsidy' | 'Credit & Loan' | 'Organic Farming';
  sponsoringBody: 'Central Government' | 'Tamil Nadu State Govt' | 'Joint Central & State';
  maxBenefit: string;
  maxBenefitTamil: string;
  whyRelevant: string;
  whyRelevantTamil: string;
  basicEligibility: string[];
  basicEligibilityTamil: string[];
  requiredDocuments: string[];
  requiredDocumentsTamil: string[];
  applicationGuidance: string[];
  applicationGuidanceTamil: string[];
  officialSource: string;
  portalUrl: string;
  helpline: string;
  deadline?: string;
  criteriaMatchScore?: number;
  matchedCriteria?: string[];
}

export interface AgriAlert {
  id: string;
  title: string;
  titleTamil: string;
  type: 'Weather' | 'Pest Outbreak' | 'Scheme Deadline' | 'Market Price' | 'Advisory';
  severity: 'Info' | 'Warning' | 'Urgent' | 'Emergency';
  date: string;
  district: string;
  message: string;
  messageTamil: string;
  recommendedAction: string;
  recommendedActionTamil: string;
  read?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: Language;
  audioAvailable?: boolean;
  groundedSources?: string[];
  quickActions?: {
    label: string;
    query: string;
  }[];
}

export interface ImpactStats {
  farmersSupported: number;
  cropYieldProtectedLakhs: number;
  waterSavedMillionLiters: number;
  schemesMatchedCount: number;
  tamilQueriesResolved: number;
  diseaseInterventions: number;
  activeVillages: number;
  districtsCovered: number;
}

import { User, WeatherData, WeatherCropRecommendation, DiseasePrediction, GovernmentScheme, AgriAlert, ImpactStats } from '../types';

export const api = {
  async getHealth() {
    const res = await fetch('/api/health');
    return res.json();
  },

  async getCurrentUser(): Promise<{ user: User; token: string }> {
    const res = await fetch('/api/auth/me');
    return res.json();
  },

  async login(payload: { phone?: string; name?: string; farmerId?: string }): Promise<{ success: boolean; user: User; token: string }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async switchDemoUser(farmerId: string): Promise<{ success: boolean; user: User }> {
    const res = await fetch('/api/auth/demo-switch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ farmerId })
    });
    return res.json();
  },

  async updateProfile(updates: Partial<User>): Promise<{ success: boolean; user: User }> {
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return res.json();
  },

  async getWeather(district?: string): Promise<{ success: boolean; weather: WeatherData }> {
    const url = district ? `/api/weather?district=${encodeURIComponent(district)}` : '/api/weather';
    const res = await fetch(url);
    return res.json();
  },

  async getWeatherCropRecommendation(params: { district?: string; crop?: string; stage?: string }): Promise<{ success: boolean; recommendation: WeatherCropRecommendation; engine: string }> {
    const query = new URLSearchParams();
    if (params.district) query.set('district', params.district);
    if (params.crop) query.set('crop', params.crop);
    if (params.stage) query.set('stage', params.stage);
    const res = await fetch(`/api/recommendations/weather-crop?${query.toString()}`);
    return res.json();
  },

  async analyzeLeaf(payload: { image?: string; cropHint?: string; preferredLanguage?: 'en' | 'ta'; sampleId?: string }): Promise<{ success: boolean; prediction: DiseasePrediction; source: string }> {
    const res = await fetch('/api/disease/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async getMatchedSchemes(customProfile?: Partial<User>): Promise<{ success: boolean; schemes: GovernmentScheme[]; totalMatched: number; topRecommendation: GovernmentScheme }> {
    if (customProfile) {
      const res = await fetch('/api/schemes/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customProfile)
      });
      return res.json();
    }
    const res = await fetch('/api/schemes/match');
    return res.json();
  },

  async askAssistant(query: string, language?: 'en' | 'ta'): Promise<{ success: boolean; response: string; language: 'en' | 'ta'; groundedSources: string[]; quickFollowUps: { label: string; query: string }[] }> {
    const res = await fetch('/api/assistant/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, language })
    });
    return res.json();
  },

  async getAlerts(): Promise<{ success: boolean; alerts: AgriAlert[] }> {
    const res = await fetch('/api/alerts');
    return res.json();
  },

  async getImpactStats(): Promise<{ success: boolean; stats: ImpactStats; chartData: any[]; districtCoverage: any[] }> {
    const res = await fetch('/api/impact');
    return res.json();
  },

  async resetDemo(): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/demo/reset', { method: 'POST' });
    return res.json();
  }
};

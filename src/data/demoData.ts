import { User, ImpactStats } from '../types';

export const demoFarmers: User[] = [
  {
    id: 'farmer-1',
    name: 'Murugan Palanisamy (முருகன்)',
    phone: '98421 54321',
    state: 'Tamil Nadu',
    district: 'Thanjavur',
    village: 'Thiruvaiyaru',
    landSizeAcres: 1.8,
    farmerCategory: 'Marginal (< 2.5 acres)',
    primaryCrop: 'Rice (Paddy - CR 1009 Sub 1)',
    cropStage: 'Vegetative',
    irrigationType: 'Canal',
    soilType: 'Alluvial Soil',
    preferredLanguage: 'ta'
  },
  {
    id: 'farmer-2',
    name: 'Selvi Muthukrishnan (செல்வி)',
    phone: '94432 87654',
    state: 'Tamil Nadu',
    district: 'Dindigul',
    village: 'Oddanchatram',
    landSizeAcres: 2.2,
    farmerCategory: 'Marginal (< 2.5 acres)',
    primaryCrop: 'Tomato (PKM-1 Variety)',
    cropStage: 'Flowering',
    irrigationType: 'Drip/Sprinkler',
    soilType: 'Red Soil',
    preferredLanguage: 'ta'
  },
  {
    id: 'farmer-3',
    name: 'Ramesh Sundaram (ரமேஷ்)',
    phone: '97890 12345',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    village: 'Pollachi',
    landSizeAcres: 3.5,
    farmerCategory: 'Small (2.5 - 5 acres)',
    primaryCrop: 'Cotton (BT Cotton & Maize)',
    cropStage: 'Vegetative',
    irrigationType: 'Borewell',
    soilType: 'Black Cotton Soil',
    preferredLanguage: 'en'
  }
];

export const initialImpactStats: ImpactStats = {
  farmersSupported: 14850,
  cropYieldProtectedLakhs: 342.5,
  waterSavedMillionLiters: 184.2,
  schemesMatchedCount: 8920,
  tamilQueriesResolved: 42190,
  diseaseInterventions: 11430,
  activeVillages: 218,
  districtsCovered: 38
};

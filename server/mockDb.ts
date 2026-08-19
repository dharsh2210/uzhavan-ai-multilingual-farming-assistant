import { User, DiseasePrediction, GovernmentScheme, AgriAlert, ImpactStats } from '../src/types';
import { demoFarmers, initialImpactStats } from '../src/data/demoData';
import { schemesDatabase } from '../src/data/schemesData';
import { sampleLeafGallery } from '../src/data/sampleDiseases';
import { initialAlerts } from '../src/data/alertsData';

class MockDatabase {
  users: User[] = [...demoFarmers];
  currentUser: User = demoFarmers[0];
  diseasePredictions: DiseasePrediction[] = sampleLeafGallery.map(s => s.prediction);
  schemes: GovernmentScheme[] = [...schemesDatabase];
  alerts: AgriAlert[] = [...initialAlerts];
  impactStats: ImpactStats = { ...initialImpactStats };
  conversations: { id: string; userId: string; query: string; response: string; timestamp: string; language: string }[] = [];

  resetToDefaults() {
    this.users = [...demoFarmers];
    this.currentUser = demoFarmers[0];
    this.diseasePredictions = sampleLeafGallery.map(s => s.prediction);
    this.schemes = [...schemesDatabase];
    this.alerts = [...initialAlerts];
    this.impactStats = { ...initialImpactStats };
    this.conversations = [];
    return true;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  switchDemoUser(farmerId: string): User {
    const found = this.users.find(u => u.id === farmerId);
    if (found) {
      this.currentUser = found;
      return this.currentUser;
    }
    return this.currentUser;
  }

  updateProfile(updates: Partial<User>): User {
    this.currentUser = { ...this.currentUser, ...updates };
    const index = this.users.findIndex(u => u.id === this.currentUser.id);
    if (index >= 0) {
      this.users[index] = this.currentUser;
    }
    return this.currentUser;
  }

  savePrediction(prediction: DiseasePrediction) {
    this.diseasePredictions.unshift(prediction);
    this.impactStats.diseaseInterventions += 1;
    this.impactStats.cropYieldProtectedLakhs = Number((this.impactStats.cropYieldProtectedLakhs + 0.45).toFixed(1));
    return prediction;
  }

  logQuery(userId: string, query: string, response: string, language: string) {
    this.conversations.unshift({
      id: 'conv-' + Date.now(),
      userId,
      query,
      response,
      timestamp: new Date().toISOString(),
      language
    });
    if (language === 'ta') {
      this.impactStats.tamilQueriesResolved += 1;
    }
  }

  matchSchemes(farmer: User): GovernmentScheme[] {
    return this.schemes.map(scheme => {
      let score = 70;
      const matched: string[] = [];

      // Land size check
      if (farmer.landSizeAcres <= 2.5) {
        score += 20;
        matched.push('Landholding is Marginal (< 2.5 acres) - Priority Beneficiary');
      } else if (farmer.landSizeAcres <= 5.0) {
        score += 15;
        matched.push('Landholding is Small (2.5 - 5 acres)');
      }

      // Scheme specific matching
      if (scheme.id === 'tn-micro-irrigation') {
        if (farmer.state === 'Tamil Nadu') {
          score += 10;
          matched.push('Tamil Nadu Resident Farmer (Eligible for 100% subsidy)');
        }
        if (farmer.landSizeAcres <= 5.0) {
          score = Math.min(score, 98);
        }
      }

      if (scheme.id === 'pm-kisan') {
        score = 96;
        matched.push('Cultivable land ownership meets PM-KISAN guidelines');
      }

      if (scheme.id === 'pmfby-insurance') {
        score = 92;
        matched.push(`${farmer.primaryCrop} is notified for PMFBY subsidy coverage in ${farmer.district}`);
      }

      if (scheme.id === 'kalaignar-scheme-tn') {
        if (farmer.state === 'Tamil Nadu') {
          score = 90;
          matched.push('Eligible for Tamil Nadu village seed and power sprayer distribution');
        }
      }

      return {
        ...scheme,
        criteriaMatchScore: Math.min(score, 99),
        matchedCriteria: matched
      };
    }).sort((a, b) => (b.criteriaMatchScore || 0) - (a.criteriaMatchScore || 0));
  }
}

export const db = new MockDatabase();

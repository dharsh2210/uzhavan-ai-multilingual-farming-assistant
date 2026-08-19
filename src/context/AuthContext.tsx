import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';
import { demoFarmers } from '../data/demoData';

interface AuthContextType {
  user: User;
  isLoading: boolean;
  demoFarmersList: User[];
  switchFarmer: (farmerId: string) => Promise<void>;
  updateFarmerProfile: (updates: Partial<User>) => Promise<void>;
  resetDemoData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(demoFarmers[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initial fetch
    api.getCurrentUser()
      .then(res => {
        if (res.user) setUser(res.user);
      })
      .catch(err => console.error("Could not fetch user:", err));
  }, []);

  const switchFarmer = async (farmerId: string) => {
    setIsLoading(true);
    try {
      const res = await api.switchDemoUser(farmerId);
      if (res.user) {
        setUser(res.user);
      }
    } catch (err) {
      console.error("Failed to switch farmer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFarmerProfile = async (updates: Partial<User>) => {
    setIsLoading(true);
    try {
      const res = await api.updateProfile(updates);
      if (res.user) {
        setUser(res.user);
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetDemoData = async () => {
    setIsLoading(true);
    try {
      await api.resetDemo();
      const res = await api.getCurrentUser();
      if (res.user) setUser(res.user);
    } catch (err) {
      console.error("Failed to reset demo data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      demoFarmersList: demoFarmers,
      switchFarmer,
      updateFarmerProfile,
      resetDemoData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

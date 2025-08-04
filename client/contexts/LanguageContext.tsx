import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  isArabic: boolean;
  setIsArabic: (isArabic: boolean) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Initialize from localStorage or default to Arabic
  const [isArabic, setIsArabicState] = useState(() => {
    const saved = localStorage.getItem('preferredLanguage');
    return saved === 'en' ? false : true; // Default to Arabic if not set
  });

  // Save to localStorage whenever language changes
  const setIsArabic = (newIsArabic: boolean) => {
    setIsArabicState(newIsArabic);
    localStorage.setItem('preferredLanguage', newIsArabic ? 'ar' : 'en');
  };

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  // Set document direction and lang attribute
  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = isArabic ? 'ar' : 'en';
  }, [isArabic]);

  return (
    <LanguageContext.Provider value={{ isArabic, setIsArabic, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

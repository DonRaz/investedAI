import { Language } from './index';

export interface CommonTranslation {
  // Header
  portfolio: string;
  compound: string;
  tax: string;
  pension: string;
  changeLanguage: string;
  changeTheme: string;
  light: string;
  dark: string;
  system: string;
  
  // Footer
  allRightsReserved: string;
  terms: string;
  privacy: string;
  contact: string;
}

export const commonTranslations: Record<Language, CommonTranslation> = {
  en: {
    // Header
    portfolio: "Portfolio Loan",
    compound: "Compound Interest",
    tax: "Tax Efficiency",
    pension: "Pension Planning",
    changeLanguage: "Change language",
    changeTheme: "Toggle theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    
    // Footer
    allRightsReserved: "All rights reserved",
    terms: "Terms",
    privacy: "Privacy",
    contact: "Contact",
  },
  he: {
    // Header
    portfolio: "הלוואת תיק",
    compound: "ריבית דריבית",
    tax: "יעילות מס",
    pension: "תכנון פנסיה",
    changeLanguage: "שנה שפה",
    changeTheme: "שנה ערכת נושא",
    light: "בהיר",
    dark: "כהה",
    system: "מערכת",
    
    // Footer
    allRightsReserved: "כל הזכויות שמורות",
    terms: "תנאי שימוש",
    privacy: "פרטיות",
    contact: "צור קשר",
  },
};
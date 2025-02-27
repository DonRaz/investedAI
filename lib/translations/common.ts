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
  madeWith: string;
  
  // 404 Page
  pageNotFound: string;
  pageNotFoundDesc: string;
  goBack: string;
  goHome: string;
  oopsGotLost: string;
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
    madeWith: "Made with ❤️ by Shahar Raz",
    
    // 404 Page
    pageNotFound: "Page Not Found",
    pageNotFoundDesc: "The page you're looking for doesn't exist or has been moved.",
    goBack: "Go Back",
    goHome: "Go to Home",
    oopsGotLost: "Oops! We got lost",
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
    madeWith: "נוצר באהבה ע״י שחר רז",
    
    // 404 Page
    pageNotFound: "הדף לא נמצא",
    pageNotFoundDesc: "הדף שאתה מחפש אינו קיים או הועבר.",
    goBack: "חזור",
    goHome: "עבור לדף הבית",
    oopsGotLost: "אופס! הלכנו לאיבוד",
  },
};
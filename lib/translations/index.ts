import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { landingTranslations, LandingTranslation } from './landing';

export type Language = 'en' | 'he';

interface TranslationStore {
  language: Language;
  setLanguage: (language: Language) => void;
  direction: () => 'ltr' | 'rtl';
  formatCurrency: (value: number) => string;
}

export const useTranslationStore = create<TranslationStore>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
      direction: () => get().language === 'he' ? 'rtl' : 'ltr',
      formatCurrency: (value) => {
        // Use a simple default format for SSR to prevent hydration errors
        // This will be replaced on the client side
        if (typeof window === 'undefined') {
          return `$${value.toLocaleString()}`;
        }
        
        const language = get().language;
        return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'he-IL', {
          style: 'currency',
          currency: language === 'en' ? 'USD' : 'ILS',
          minimumFractionDigits: 0,
        }).format(value);
      },
    }),
    {
      name: 'language-storage',
    }
  )
);

// Export translations
export { landingTranslations };
export type { LandingTranslation };
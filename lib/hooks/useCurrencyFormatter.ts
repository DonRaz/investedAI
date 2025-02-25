import { useState, useEffect, useCallback } from 'react';
import { useTranslationStore } from '@/lib/translations';

export function useCurrencyFormatter() {
  const { language, formatCurrency } = useTranslationStore();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const formatCurrencySafe = (value: number): string => {
    if (!isMounted) {
      // Return a simple format for SSR
      return `$${value.toLocaleString()}`;
    }
    
    return formatCurrency(value);
  };
  
  const abbreviateNumber = useCallback((value: number, isCurrency: boolean = false): string => {
    const suffix = isCurrency ? (language === 'he' ? '₪' : '$') : '';
    // const suffix = language === 'he' ? '₪' : '$';
    
    if (value >= 1000000000) {
      return `${suffix}${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `${suffix}${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${suffix}${(value / 1000).toFixed(0)}K`;
    }
    return `${suffix}${value}`;
  }, [language]);
  
  return { formatCurrencySafe, abbreviateNumber };
} 
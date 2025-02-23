"use client";

import { Card, CardContent } from '@/components/ui/card';
import { useTranslationStore } from '@/lib/translations';
import { useEffect } from 'react';
import { Language } from '@/lib/translations';
// import PortfolioLoanCalculator from '@/components/calculators/PortfolioLoanCalculator_V2';
// import { PortfolioLoanCalculator } from '@/components/calculators/PortfolioLoanCalculator';
import { PortfolioLoanCalculator_V3 } from '@/components/calculators/PortfolioLoanCalculator_V3';

export default function CompoundPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const { setLanguage } = useTranslationStore();

  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);

  return (
    <div className="container mx-auto">
      <PortfolioLoanCalculator_V3 />
    </div>
  );
}

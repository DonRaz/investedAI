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
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Portfolio Tax Calculator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare different portfolio strategies and their tax implications
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {/* <PortfolioLoanCalculator /> */}
            <PortfolioLoanCalculator_V3 />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

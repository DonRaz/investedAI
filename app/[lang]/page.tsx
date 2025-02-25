"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { PortfolioLoanCalculator } from "@/components/calculators/PortfolioLoanCalculator";
import { Info } from "lucide-react";
import { useTranslationStore } from "@/lib/translations";
import { useEffect } from "react";
import { Language } from "@/lib/translations";
import { PensionPlanningCalculator } from "@/components/calculators/PensionPlanningCalculator";

export default function Home({ params: { lang } }: { params: { lang: Language } }) {
  const { setLanguage } = useTranslationStore();

  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Investment Calculator Suite</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fund today's needs while growing tomorrow's wealth.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-2 mb-6">
              <Info className="w-5 h-5 mt-1 text-blue-500" />
              <p className="text-sm text-muted-foreground">
                Compare the benefits of borrowing against your portfolio versus selling stocks.
                This calculator helps you understand the long-term impact of each strategy on your wealth.
              </p>
            </div>
            <PensionPlanningCalculator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
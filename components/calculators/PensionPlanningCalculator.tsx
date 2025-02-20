'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CustomInterestSlider } from '@/components/ui/slider-w-landmarks';
import { SliderWithInput } from '@/components/ui/slider-w-input';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTranslationStore } from '@/lib/translations';
import { pensionTranslations } from '@/lib/translations/pension';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface CalculatorInputs {
  initialPortfolio: number;
  monthlyWithdrawal: number;
  portfolioReturn: number;
}

export function PensionPlanningCalculator() {
  const { language, direction, formatCurrency } = useTranslationStore();
  const t = pensionTranslations[language];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [inputs, setInputs] = useState<CalculatorInputs>({
    initialPortfolio: 1000000,
    monthlyWithdrawal: 5000,
    portfolioReturn: 7,
  });

  const parseInputValue = useCallback((value: string): number => {
    const parsed = Number(value.replace(/[^0-9.-]+/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  const abbreviateNumber = useCallback((value: number): string => {
    if (value >= 10000000) {
      return `${(value / 1000000).toFixed(0)}M`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  }, []);

  const calculateProjections = () => {
    const data = [];
    const years = 50; // Extended to 50-year projection
    let currentPortfolio = inputs.initialPortfolio;
    let depletionYear = -1;

    for (let year = 0; year <= years; year++) {
      data.push({
        year,
        portfolioValue: Math.max(0, currentPortfolio),
      });

      // Update for next year
      const annualWithdrawal = inputs.monthlyWithdrawal * 12;
      currentPortfolio = Math.max(
        0,
        (currentPortfolio - annualWithdrawal) *
          (1 + inputs.portfolioReturn / 100)
      );

      // Check for depletion
      if (currentPortfolio === 0 && depletionYear === -1) {
        depletionYear = year;
      }
    }

    return {
      data,
      depletionYear,
      finalValue: data[data.length - 1].portfolioValue,
    };
  };

  const {
    data: projectionData,
    depletionYear,
    finalValue,
  } = calculateProjections();
  const isSustainable = depletionYear === -1;

  // Calculate annual withdrawal rate
  const annualWithdrawalRate =
    ((inputs.monthlyWithdrawal * 12) / inputs.initialPortfolio) * 100;

  if (!mounted) {
    return (
      <div suppressHydrationWarning className="space-y-8" dir={direction()} />
    );
  }

  return (
    <div suppressHydrationWarning className="space-y-8" dir={direction()}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t.initialPortfolio}</Label>
            <SliderWithInput
              value={inputs.initialPortfolio}
              onValueChange={(value) =>
                setInputs({ ...inputs, initialPortfolio: value })
              }
              min={100000}
              max={10000000}
              step={50000}
              formatValue={formatCurrency}
            />
          </div>

          <div className="space-y-2">
            <Label>{t.monthlyWithdrawal}</Label>
            <SliderWithInput
              value={inputs.monthlyWithdrawal}
              onValueChange={(value) =>
                setInputs({ ...inputs, monthlyWithdrawal: value })
              }
              min={1000}
              max={50000}
              step={500}
              formatValue={formatCurrency}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex" dir='ltr'>
              <Label>{t.portfolioReturn}</Label>
              <div className="text-sm text-muted-foreground ml-auto">
                {inputs.portfolioReturn.toFixed(1)}%
              </div>
            </div>
            <CustomInterestSlider
              value={inputs.portfolioReturn}
              onValueChange={(value) =>
                setInputs({ ...inputs, portfolioReturn: value })
              }
              min={0}
              max={20}
              step={0.1}
            />
          </div>

          <div className="text-sm text-muted-foreground mt-4">
            {t.withdrawalRate}: {annualWithdrawalRate.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">
              {t.portfolioProjection}
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData.slice(0,30)}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="year"
                    label={{
                      value: t.years,
                      position: 'bottom',
                      className: 'fill-foreground',
                    }}
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <YAxis
                    tickFormatter={abbreviateNumber}
                    label={{
                      value: t.portfolioValue,
                      angle: -90,
                      position: 'insideLeft',
                      className: 'fill-foreground',
                    }}
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), '']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      color: 'hsl(var(--foreground))',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="portfolioValue"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">
              {t.portfolioDepletion}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {isSustainable ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
                <span className="font-medium">
                  {isSustainable
                    ? `${t.indefinitelySustainable} ${formatCurrency(
                        finalValue
                      )}`
                    : `${t.depleteInYear} ${depletionYear}`}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
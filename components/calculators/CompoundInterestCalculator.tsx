'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  calculateMonthlyGrowth,
  calculateContributionsGrowth,
  calculateRequiredMonthly,
} from '@/lib/utils/calculations';
import { useTranslationStore } from '@/lib/translations';
import { compoundTranslations } from '@/lib/translations/compound';
import { CustomInterestSlider } from '../ui/slider-w-landmarks';

interface ChartDataPoint {
  month: number;
  label: string;
  totalValue: number;
  initialGrowth: number;
  contributionsValue: number;
  pureMonthlyInvestment: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const useWindowSize = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 768
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export function CompoundInterestCalculator() {
  const { language, direction, formatCurrency } = useTranslationStore();
  const t = compoundTranslations[language];
  const [mounted, setMounted] = useState(false);
  const [isTargetMode, setIsTargetMode] = useState(true);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [initialAmountInput, setInitialAmountInput] = useState('600000');
  const [targetAmountInput, setTargetAmountInput] = useState('8000000');
  const [monthlyInvestmentInput, setMonthlyInvestmentInput] = useState('3000');
  const [initialAmount, setInitialAmount] = useState(600000);
  const [targetAmount, setTargetAmount] = useState(8000000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(3000);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [annualReturnInput, setAnnualReturnInput] = useState('10');
  const [periodInput, setPeriodInput] = useState('10');

  useEffect(() => {
    setMounted(true);
  }, []);

  const windowWidth = useWindowSize();

  const formatMonthYear = useCallback((month: number, year: number): string => {
    const monthNum = (month % 12) + 1;
    return `${year}.${monthNum < 10 ? '0' : ''}${monthNum}`;
  }, []);

  const formatAxisLabel = useCallback(
    (label: string): string => {
      if (windowWidth < 768) {
        return label.split('.')[0];
      }
      return label;
    },
    [windowWidth]
  );

  const parseInputValue = useCallback((value: string): number => {
    const parsed = Number(value.replace(/[^0-9.-]+/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  const abbreviateNumber = useCallback((value: number): string => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(0)}B`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  }, []);

  const handleInputChange = useCallback(
    (
      value: string,
      setInputState: (value: string) => void,
      setValidatedState: (value: number) => void
    ) => {
      setInputState(value);
      const parsedValue = parseInputValue(value);
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        setValidatedState(parsedValue);
      }
    },
    [parseInputValue]
  );

  const validateNumberInput = (
    value: string,
    min: number,
    max: number
  ): number => {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return min;
    return Math.min(max, Math.max(min, parsed));
  };

  const chartData = useMemo(() => {
    const data: ChartDataPoint[] = [];
    const totalMonths = investmentPeriod * 12;
    const actualMonthlyInvestment = isTargetMode
      ? calculateRequiredMonthly(
          targetAmount,
          initialAmount,
          annualReturn,
          totalMonths
        )
      : monthlyInvestment;

    for (let month = 0; month <= totalMonths; month++) {
      const initialGrowth = calculateMonthlyGrowth(
        initialAmount,
        annualReturn,
        month
      );
      const contributionsGrowth = calculateContributionsGrowth(
        actualMonthlyInvestment,
        annualReturn,
        month
      );
      const totalValue = initialGrowth + contributionsGrowth;
      const pureMonthlyInvestment = actualMonthlyInvestment * month;

      data.push({
        month,
        label: formatMonthYear(month % 12, Math.floor(month / 12)),
        totalValue,
        initialGrowth,
        contributionsValue: contributionsGrowth,
        pureMonthlyInvestment,
      });
    }
    return data;
  }, [
    initialAmount,
    targetAmount,
    monthlyInvestment,
    annualReturn,
    investmentPeriod,
    isTargetMode,
    formatMonthYear,
  ]);

  const summary = useMemo(() => {
    const totalMonths = investmentPeriod * 12;
    const lastDataPoint = chartData[chartData.length - 1];
    const actualMonthlyInvestment = isTargetMode
      ? calculateRequiredMonthly(
          targetAmount,
          initialAmount,
          annualReturn,
          totalMonths
        )
      : monthlyInvestment;
    const totalContributions = actualMonthlyInvestment * totalMonths;

    return {
      monthlyInvestment: actualMonthlyInvestment,
      finalValue: lastDataPoint.totalValue,
      totalContributions,
      initialGrowth: lastDataPoint.initialGrowth,
      contibutionsGrowth: lastDataPoint.contributionsValue,
      pureAccumulatedMonthlyInvestment: lastDataPoint.pureMonthlyInvestment,
    };
  }, [
    chartData,
    initialAmount,
    targetAmount,
    monthlyInvestment,
    annualReturn,
    isTargetMode,
    investmentPeriod,
  ]);

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded shadow p-4">
          <p className="text-sm font-medium">
            {t.month}: {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6" dir={direction()}>
      {/* Mode Switch - Force LTR for the toggle section */}
      <div className="flex items-center justify-center gap-4" dir="ltr">
        <span className={`text-sm ${!isTargetMode ? 'font-bold' : ''}`}>
          {t.setMonthly}
        </span>
        <div className="relative">
          <Switch
            checked={isTargetMode}
            onCheckedChange={setIsTargetMode}
            className="!m-0" // Override any margin that might affect positioning
          />
        </div>
        <span className={`text-sm ${isTargetMode ? 'font-bold' : ''}`}>
          {t.setTarget}
        </span>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4`">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="targetAmount">
                {isTargetMode ? t.targetAmount : t.monthlyInvestment}
              </Label>
              <Input
                id="targetAmount"
                className="font-bold"
                type="text"
                value={
                  isTargetMode ? targetAmountInput : monthlyInvestmentInput
                }
                onChange={(e) => {
                  if (isTargetMode) {
                    handleInputChange(
                      e.target.value,
                      setTargetAmountInput,
                      setTargetAmount
                    );
                  } else {
                    handleInputChange(
                      e.target.value,
                      setMonthlyInvestmentInput,
                      setMonthlyInvestment
                    );
                  }
                }}
                onBlur={() => {
                  if (isTargetMode) {
                    setTargetAmountInput(formatCurrency(targetAmount));
                  } else {
                    setMonthlyInvestmentInput(
                      formatCurrency(monthlyInvestment)
                    );
                  }
                }}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="initialInvestment">{t.initialInvestment}</Label>
              <Input
                id="initialInvestment"
                type="text"
                value={initialAmountInput}
                onChange={(e) =>
                  handleInputChange(
                    e.target.value,
                    setInitialAmountInput,
                    setInitialAmount
                  )
                }
                onBlur={() =>
                  setInitialAmountInput(formatCurrency(initialAmount))
                }
                onFocus={(e) => e.target.select()}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="period">{t.period}</Label>
              <Input
                id="period"
                type="text"
                value={periodInput}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/[^\d]/g, '');
                  setPeriodInput(newValue);
                  const validated = validateNumberInput(newValue, 1, 50);
                  if (!isNaN(validated)) {
                    setInvestmentPeriod(validated);
                  }
                }}
                onBlur={() => {
                  const validated = validateNumberInput(periodInput, 1, 50);
                  setInvestmentPeriod(validated);
                  setPeriodInput(validated.toString());
                }}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="annualReturn">{t.annualReturn}</Label>
              {windowWidth > 768 ? (
                <>
                  <Input
                    id="annualReturn"
                    type="text"
                    value={annualReturnInput}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[^\d.]/g, '');
                      setAnnualReturnInput(newValue);
                      const validated = validateNumberInput(newValue, 0, 100);
                      if (!isNaN(validated)) {
                        setAnnualReturn(validated);
                      }
                    }}
                    onBlur={() => {
                      const validated = validateNumberInput(
                        annualReturnInput,
                        0,
                        100
                      );
                      setAnnualReturn(validated);
                      setAnnualReturnInput(validated.toString());
                    }}
                    onFocus={(e) => e.target.select()}
                  />
                </>
              ) : (
                <>
                  <CustomInterestSlider
                    value={annualReturn}
                    onValueChange={(value) => setAnnualReturn(value)}
                    min={0}
                    max={20}
                    step={0.1}
                    isShowingHeader
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {isTargetMode ? t.monthlyRequired : t.pureContributions}
            </h3>
            <p className="text-2xl font-bold">
              {isTargetMode
                ? formatCurrency(summary.monthlyInvestment)
                : formatCurrency(summary.pureAccumulatedMonthlyInvestment)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {t.initialGrowth}
            </h3>
            <p className="text-2xl font-bold">
              {formatCurrency(summary.initialGrowth)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {t.contributionsGrowth}
            </h3>
            <p className="text-2xl font-bold">
              {formatCurrency(summary.contibutionsGrowth)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {t.finalValue}
            </h3>
            <p className="text-2xl font-bold">
              {formatCurrency(summary.finalValue)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Growth Chart */}
      <Card>
        <CardContent className="p-2 md:p-6">
          <div className="h-[450px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 20,
                  right: windowWidth < 768 ? 10 : 30,
                  left: windowWidth < 768 ? -35 : 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="label"
                  tickFormatter={formatAxisLabel}
                  label={{
                    value: t.yearMonth,
                    position: 'bottom',
                    offset: -20,
                    className: 'fill-foreground',
                  }}
                  interval={
                    windowWidth < 768
                      ? Math.floor(chartData.length / 5)
                      : Math.floor(chartData.length / 10)
                  }
                  height={windowWidth < 768 ? 30 : 60}
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <YAxis
                  tickFormatter={(value) => abbreviateNumber(value)}
                  label={
                    windowWidth >= 768
                      ? {
                          value: t.portfolioValue,
                          angle: -90,
                          position: 'left',
                          offset: -10,
                          className: 'fill-foreground',
                        }
                      : undefined
                  }
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => (
                    <span className="text-foreground">{value}</span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="totalValue"
                  name={t.totalPortfolio}
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="initialGrowth"
                  name={t.initialInvestment}
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="contributionsValue"
                  name={t.contributions}
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="pureMonthlyInvestment"
                  name={t.pureContributions}
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

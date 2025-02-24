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
import { SliderWithInput } from '@/components/ui/slider-w-input';

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
    <div className="font-sans p-4 md:p-8 min-h-screen flex flex-col justify-center items-center" dir={direction()}>
      <Card className="w-full max-w-4xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 rounded-3xl mb-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100/30 via-transparent to-emerald-100/30 dark:from-zinc-900/20 dark:to-emerald-900/20 rounded-3xl"></div>
        <CardContent className="space-y-8 p-8 relative z-10">
          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <h1 className="text-3xl font-light tracking-tight bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">{t.subtitle}</p>
          </div>

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
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4 border-r border-zinc-200/30 dark:border-zinc-700/30 md:pr-6 pr-0">
              <div className="space-y-2 bg-gradient-to-br from-white/70 to-zinc-50/70 dark:from-zinc-800/70 dark:to-zinc-900/50 backdrop-blur-md p-4 rounded-xl border border-white/50 dark:border-zinc-700/30 shadow-md">
                <Label className="text-gray-700 dark:text-gray-300">
                  {isTargetMode ? t.targetAmount : t.monthlyInvestment}
                </Label>
                <div className="pt-2">
                  <SliderWithInput
                    value={isTargetMode ? targetAmount : monthlyInvestment}
                    onValueChange={(value) => {
                      if (isTargetMode) {
                        setTargetAmount(value);
                        setTargetAmountInput(formatCurrency(value));
                      } else {
                        setMonthlyInvestment(value);
                        setMonthlyInvestmentInput(formatCurrency(value));
                      }
                    }}
                    min={isTargetMode ? 100000 : 0}
                    max={isTargetMode ? 10000000 : 50000}
                    step={isTargetMode ? 50000 : 500}
                    formatValue={formatCurrency}
                  />
                </div>
              </div>

              <div className="space-y-2 bg-gradient-to-br from-white/70 to-zinc-50/70 dark:from-zinc-800/70 dark:to-zinc-900/50 backdrop-blur-md p-4 rounded-xl border border-white/50 dark:border-zinc-700/30 shadow-md">
                <Label className="text-gray-700 dark:text-gray-300">{t.initialInvestment}</Label>
                <div className="pt-2">
                  <SliderWithInput
                    value={initialAmount}
                    onValueChange={(value) => {
                      setInitialAmount(value);
                      setInitialAmountInput(formatCurrency(value));
                    }}
                    min={0}
                    max={1000000}
                    step={10000}
                    formatValue={formatCurrency}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2 bg-gradient-to-br from-white/70 to-zinc-50/70 dark:from-zinc-800/70 dark:to-zinc-900/50 backdrop-blur-md p-4 rounded-xl border border-white/50 dark:border-zinc-700/30 shadow-md">
                <Label className="text-gray-700 dark:text-gray-300">{t.period}</Label>
                <div className="pt-2">
                  <SliderWithInput
                    value={investmentPeriod}
                    onValueChange={(value) => {
                      setInvestmentPeriod(value);
                      setPeriodInput(value.toString());
                    }}
                    min={1}
                    max={35}
                    step={1}
                    formatValue={(value) => `${value} ${value === 1 ? t.yearLabel : t.yearsLabel}`}
                  />
                </div>
              </div>

              <div className="space-y-2 bg-gradient-to-br from-white/70 to-zinc-50/70 dark:from-zinc-800/70 dark:to-zinc-900/50 backdrop-blur-md p-4 rounded-xl border border-white/50 dark:border-zinc-700/30 shadow-md">
                <div className="flex" dir='ltr'>
                  <Label className="text-gray-700 dark:text-gray-300">{t.annualReturn}</Label>
                  <div className="text-sm text-gray-600 dark:text-gray-400 ml-auto">
                    {annualReturn.toFixed(1)}%
                  </div>
                </div>
                <div className="pt-2">
                  {windowWidth < 768 ? (
                    <CustomInterestSlider
                      value={annualReturn}
                      onValueChange={(value) => {
                        setAnnualReturn(value);
                        setAnnualReturnInput(value.toString());
                      }}
                      min={0}
                      max={20}
                      step={0.1}
                      isShowingHeader={false}
                    />
                  ) : (
                    <SliderWithInput
                      value={annualReturn}
                      onValueChange={(value) => {
                        setAnnualReturn(value);
                        setAnnualReturnInput(value.toString());
                      }}
                      min={0}
                      max={20}
                      step={0.1}
                      formatValue={(value) => `${value.toFixed(1)}%`}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            <Card className="bg-gradient-to-br from-white/70 to-zinc-200/70 dark:from-zinc-800/70 dark:to-zinc-900/50 backdrop-blur-md border border-white/50 dark:border-zinc-700/30 shadow-md h-[140px] flex flex-col">
              <CardContent className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isTargetMode ? t.monthlyRequired : t.pureContributions}
                </h3>
                <div className="mt-auto flex flex-col gap-2">
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {isTargetMode
                      ? formatCurrency(summary.monthlyInvestment)
                      : formatCurrency(summary.pureAccumulatedMonthlyInvestment)}
                  </p>
                  <div className="h-[20px]" /> {/*Placeholder for consistent height*/}

                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/70 to-zinc-200/70 dark:from-zinc-800/70 dark:to-zinc-900/50 backdrop-blur-md border border-white/50 dark:border-zinc-700/30 shadow-md h-[140px] flex flex-col">
              <CardContent className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t.initialGrowth}
                </h3>
                <div className="mt-auto flex flex-col gap-2">
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {formatCurrency(summary.initialGrowth)}
                  </p>
                  {initialAmount > 0 && (
                    <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 self-start">
                      +{((summary.initialGrowth / initialAmount - 1) * 100).toFixed(1)}%
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/70 to-zinc-200/70 dark:from-zinc-800/70 dark:to-zinc-900/50 backdrop-blur-md border border-white/50 dark:border-zinc-700/30 shadow-md h-[140px] flex flex-col">
              <CardContent className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t.contributionsGrowth}
                </h3>
                <div className="mt-auto flex flex-col gap-2">
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {formatCurrency(summary.contibutionsGrowth)}
                  </p>
                  {summary.pureAccumulatedMonthlyInvestment > 0 && (
                    <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 self-start">
                      +{((summary.contibutionsGrowth / summary.pureAccumulatedMonthlyInvestment - 1) * 100).toFixed(1)}%
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/70 to-zinc-200/70 dark:from-zinc-800/70 dark:to-zinc-900/50 backdrop-blur-md border border-white/50 dark:border-zinc-700/30 shadow-md h-[140px] flex flex-col">
              <CardContent className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t.finalValue}
                </h3>
                <div className="mt-auto flex flex-col gap-2">
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {formatCurrency(summary.finalValue)}
                  </p>
                  {(initialAmount + summary.pureAccumulatedMonthlyInvestment) > 0 && (
                    <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 self-start">
                      +{((summary.finalValue / (initialAmount + summary.pureAccumulatedMonthlyInvestment) - 1) * 100).toFixed(1)}%
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Growth Chart */}
          <Card className="overflow-hidden border border-white/20 dark:border-white/10 shadow-lg backdrop-blur-md bg-white/90 dark:bg-zinc-900/80 rounded-2xl">
            <CardContent className="p-2 md:p-6">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
                {t.portfolioValue}
              </h3>
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
                    <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                    <XAxis
                      dataKey="label"
                      tickFormatter={formatAxisLabel}
                      tickLine={false}
                      axisLine={{ stroke: '#eaeaea' }}
                      tick={{ fill: '#888', fontSize: 12 }}
                      label={{
                        value: t.yearMonth,
                        position: 'insideBottom',
                        offset: -5,
                        fill: '#888',
                        fontSize: 12,
                      }}
                      interval={
                        windowWidth < 768
                          ? Math.floor(chartData.length / 5)
                          : Math.floor(chartData.length / 10)
                      }
                      height={windowWidth < 768 ? 30 : 60}
                    />
                    <YAxis
                      tickFormatter={(value) => abbreviateNumber(value)}
                      tickLine={false}
                      axisLine={{ stroke: '#eaeaea' }}
                      tick={{ fill: '#888', fontSize: 12 }}
                      width={60}
                      label={
                        windowWidth >= 768
                          ? {
                              value: t.portfolioValue,
                              angle: -90,
                              position: 'left',
                              offset: -10,
                              fill: '#888',
                              fontSize: 12,
                            }
                          : undefined
                      }
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background) / 0.95)',
                        borderRadius: '8px',
                        border: '1px solid hsl(var(--border) / 0.2)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        padding: '8px 12px',
                        color: 'hsl(var(--foreground))',
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => (
                        <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">{value}</span>
                      )}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalValue"
                      name={t.totalPortfolio}
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={3}
                      dot={{ r: 1 }}
                      activeDot={{ r: 5, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="initialGrowth"
                      name={t.initialInvestment}
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={3}
                      dot={{ r: 1 }}
                      activeDot={{ r: 5, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="contributionsValue"
                      name={t.contributions}
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={3}
                      dot={{ r: 1 }}
                      activeDot={{ r: 5, strokeWidth: 0 }}
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

          {/* Attribution footer */}
          <div className="w-full text-center pb-4">
            <p className="bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent font-medium text-xs">
              {t.madeWith}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Language } from './index';

export interface CompoundTranslation {
  title: string;
  subtitle: string;
  setMonthly: string;
  setTarget: string;
  initialInvestment: string;
  targetAmount: string;
  monthlyInvestment: string;
  annualReturn: string;
  monthlyRequired: string;
  initialGrowth: string;
  totalContributions: string;
  finalValue: string;
  years: string;
  portfolioValue: string;
  yearMonth: string;
  month: string;
  totalPortfolio: string;
  contributions: string;
  period: string;
  pureInvestment: string;
  pureContributions: string;
  contributionsGrowth: string;
  madeWith: string;
  yearLabel: string;
  yearsLabel: string;
}

export const compoundTranslations: Record<Language, CompoundTranslation> = {
  en: {
    title: "Investment Calculator",
    subtitle: "Plan your investment strategy",
    setMonthly: "Set Monthly Investment",
    setTarget: "Set Target Amount",
    initialInvestment: "Initial Investment",
    targetAmount: "Target Amount",
    monthlyInvestment: "Monthly Investment",
    annualReturn: "Annual Return Rate (%)",
    monthlyRequired: "Monthly Investment",
    initialGrowth: "Initial Investment Growth",
    totalContributions: "Total Contributions",
    finalValue: "Final Portfolio Value",
    years: "Years",
    portfolioValue: "Portfolio Value",
    yearMonth: "Year.Month",
    month: "Month",
    totalPortfolio: "Total Portfolio",
    contributions: "Contributions",
    period: "Investment Period (Years)",
    pureInvestment: "Pure Investment (No Interest)",
    pureContributions: "Pure contributions (No Interest)",
    contributionsGrowth: "Contributions Growth",
    madeWith: "Investment Calculator • Made with 💙",
    yearLabel: "year",
    yearsLabel: "years"
  },
  he: {
    title: "מחשבון השקעות",
    subtitle: "תכנון אסטרטגיית ההשקעות שלך",
    setMonthly: "הגדר השקעה חודשית",
    setTarget: "הגדר סכום יעד",
    initialInvestment: "השקעה התחלתית",
    targetAmount: "סכום יעד",
    monthlyInvestment: "השקעה חודשית",
    annualReturn: "תשואה שנתית (%)",
    monthlyRequired: "השקעה חודשית נדרשת",
    initialGrowth: "צמיחת השקעה התחלתית",
    totalContributions: "סך הפקדות",
    finalValue: "שווי תיק סופי",
    years: "שנים",
    portfolioValue: "שווי תיק",
    yearMonth: "שנה.חודש",
    month: "חודש",
    totalPortfolio: "סך הכל תיק",
    contributions: "הפקדות",
    period: "תקופת השקעה (שנים)",
    pureInvestment: "השקעה נטו (ללא ריבית)",
    pureContributions: "הפקדות נטו (ללא ריבית)",
    contributionsGrowth: "צמיחת השקעה חודשית",
    madeWith: "מחשבון השקעות • נוצר עם 💙",
    yearLabel: "שנה",
    yearsLabel: "שנים"
  },
};
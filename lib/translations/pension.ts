import { Language } from './index';

export interface PensionTranslation {
  title: string;
  subtitle: string;
  initialPortfolio: string;
  monthlyWithdrawal: string;
  portfolioReturn: string;
  years: string;
  portfolioValue: string;
  portfolioProjection: string;
  portfolioDepletion: string;
  indefinitelySustainable: string;
  depleteInYear: string;
  withdrawalRate: string;
}

export const pensionTranslations: Record<Language, PensionTranslation> = {
  en: {
    title: "Portfolio Withdrawal Calculator",
    subtitle: "See how your portfolio value changes over time with regular withdrawals",
    initialPortfolio: "Initial Portfolio Value",
    monthlyWithdrawal: "Monthly Withdrawal",
    portfolioReturn: "Annual Return (%)",
    years: "Years",
    portfolioValue: "Portfolio Value",
    portfolioProjection: "Portfolio Value Projection",
    portfolioDepletion: "Portfolio Depletion Analysis",
    indefinitelySustainable: "Portfolio is indefinitely sustainable. Value after 50 years:",
    depleteInYear: "Portfolio will deplete in year",
    withdrawalRate: "Annual Withdrawal Rate",
  },
  he: {
    title: "מחשבון משיכה מתיק השקעות",
    subtitle: "ראה כיצד שווי התיק שלך משתנה לאורך זמן עם משיכות קבועות",
    initialPortfolio: "שווי תיק התחלתי",
    monthlyWithdrawal: "משיכה חודשית",
    portfolioReturn: "תשואה שנתית (%)",
    years: "שנים",
    portfolioValue: "שווי תיק",
    portfolioProjection: "תחזית שווי תיק",
    portfolioDepletion: "ניתוח דלדול תיק",
    indefinitelySustainable: "התיק בר-קיימא. שווי לאחר 50 שנה:",
    depleteInYear: "התיק יתרוקן בשנה",
    withdrawalRate: "שיעור משיכה שנתי",
  },
};
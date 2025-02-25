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
  pensionPlanning: string;
  planYourRetirement: string;
  madeWith: string;
  
  // Help button translations
  close: string;
  
  // Slider info titles and descriptions
  initialPortfolio_info: string;
  initialPortfolio_desc: string;
  monthlyWithdrawal_info: string;
  monthlyWithdrawal_desc: string;
  portfolioReturn_info: string;
  portfolioReturn_desc: string;
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
    pensionPlanning: "Pension Planning Calculator",
    planYourRetirement: "Plan your retirement withdrawals and see how long your portfolio will last",
    madeWith: "Pension Planning Calculator • Made with 💙",
    
    // Help button translations
    close: "Close",
    
    // Slider info titles and descriptions
    initialPortfolio_info: "Initial Portfolio Value",
    initialPortfolio_desc: "The total value of your investment portfolio at the start of your retirement. This is the amount you've accumulated through your working years and will be drawing from during retirement.",
    
    monthlyWithdrawal_info: "Monthly Withdrawal",
    monthlyWithdrawal_desc: "The amount you plan to withdraw from your portfolio each month to cover your living expenses during retirement. This is a key factor in determining how long your portfolio will last.",
    
    portfolioReturn_info: "Annual Return Rate",
    portfolioReturn_desc: "The expected yearly percentage growth of your investments during retirement. A conservative estimate is recommended for retirement planning, as returns may be more volatile than during accumulation years."
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
    pensionPlanning: "מחשבון תכנון פנסיה",
    planYourRetirement: "תכנן את משיכות הפנסיה שלך וראה כמה זמן התיק שלך יחזיק מעמד",
    madeWith: "מחשבון תכנון פנסיה • נוצר עם 💙",
    
    // Help button translations
    close: "סגור",
    
    // Slider info titles and descriptions
    initialPortfolio_info: "שווי תיק התחלתי",
    initialPortfolio_desc: "הערך הכולל של תיק ההשקעות שלך בתחילת הפרישה שלך. זהו הסכום שצברת במהלך שנות העבודה שלך ותמשוך ממנו במהלך הפרישה.",
    
    monthlyWithdrawal_info: "משיכה חודשית",
    monthlyWithdrawal_desc: "הסכום שאתה מתכנן למשוך מהתיק שלך בכל חודש כדי לכסות את הוצאות המחיה שלך במהלך הפרישה. זהו גורם מפתח בקביעת כמה זמן התיק שלך יחזיק מעמד.",
    
    portfolioReturn_info: "שיעור תשואה שנתי",
    portfolioReturn_desc: "הצמיחה השנתית הצפויה באחוזים של ההשקעות שלך במהלך הפרישה. מומלץ להשתמש באומדן שמרני לתכנון פרישה, מכיוון שהתשואות עשויות להיות תנודתיות יותר מאשר בשנות הצבירה."
  },
};
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
  months: string;
  totalPortfolio: string;
  contributions: string;
  period: string;
  pureInvestment: string;
  pureContributions: string;
  contributionsGrowth: string;
  madeWith: string;
  yearLabel: string;
  yearsLabel: string;
  
  // Help button translations
  close: string;
  
  // Slider info titles and descriptions
  targetAmount_info: string;
  targetAmount_desc: string;
  monthlyInvestment_info: string;
  monthlyInvestment_desc: string;
  initialInvestment_info: string;
  initialInvestment_desc: string;
  period_info: string;
  period_desc: string;
  annualReturn_info: string;
  annualReturn_desc: string;

  // Storyline translations
  ifYouStart: string;
  andInvest: string;
  andWithdraw: string;
  monthly: string;
  for: string;
  withReturn: string;
  youWillReach: string;
  youWillHave: string;
  atTheEnd: string;
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
    months: "Months",
    totalPortfolio: "Total Portfolio",
    contributions: "Contributions",
    period: "Investment Period (Years)",
    pureInvestment: "Pure Investment (No Interest)",
    pureContributions: "Pure contributions (No Interest)",
    contributionsGrowth: "Contributions Growth",
    madeWith: "Investment Calculator • Made with 💙",
    yearLabel: "year",
    yearsLabel: "years",
    
    // Help button translations
    close: "Close",
    
    // Slider info titles and descriptions
    targetAmount_info: "Target Amount",
    targetAmount_desc: "The final portfolio value you aim to achieve. The calculator will determine how much you need to invest monthly to reach this target, based on your initial investment, time period, and expected return rate.",
    
    monthlyInvestment_info: "Monthly Investment",
    monthlyInvestment_desc: "The amount you plan to invest each month. Regular contributions are key to building wealth through compound interest, especially over longer time periods.",
    
    initialInvestment_info: "Initial Investment",
    initialInvestment_desc: "The amount you start with at the beginning of your investment journey. A larger initial investment gives compound interest more to work with from the start.",
    
    period_info: "Investment Period",
    period_desc: "The length of time you plan to invest. Longer investment periods dramatically increase the effects of compound interest, as your returns generate their own returns over time.",
    
    annualReturn_info: "Annual Return Rate",
    annualReturn_desc: "The expected yearly percentage growth of your investments. This rate varies by investment type. Historical average for the S&P 500 is around 10%. The Nasdaq100 returned 19.7% between 2020 and 2025, while bonds and savings accounts typically offer lower returns with less risk.",

    // Storyline translations
    ifYouStart: "If you start with",
    andInvest: "and invest",
    andWithdraw: "and withdraw",
    monthly: "monthly",
    for: "for",
    withReturn: "with an annual return of",
    youWillReach: "you will reach your target of",
    youWillHave: "you will have",
    atTheEnd: "at the end of your investment period."
  },
  he: {
    title: "מחשבון השקעות - ריבית דריבית",
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
    months: "חודשים",
    totalPortfolio: "סך הכל תיק",
    contributions: "הפקדות",
    period: "תקופת השקעה (שנים)",
    pureInvestment: "השקעה נטו (ללא ריבית)",
    pureContributions: "הפקדות נטו (ללא ריבית)",
    contributionsGrowth: "צמיחת השקעה חודשית",
    madeWith: "מחשבון השקעות • נוצר עם 💙",
    yearLabel: "שנה",
    yearsLabel: "שנים",
    
    // Help button translations
    close: "סגור",
    
    // Slider info titles and descriptions
    targetAmount_info: "סכום יעד",
    targetAmount_desc: "ערך התיק הסופי שאתה שואף להשיג. המחשבון יקבע כמה עליך להשקיע מדי חודש כדי להגיע ליעד זה, בהתבסס על ההשקעה הראשונית שלך, תקופת הזמן ושיעור התשואה הצפוי.",
    
    monthlyInvestment_info: "השקעה חודשית",
    monthlyInvestment_desc: "הסכום שאתה מתכנן להשקיע בכל חודש. הפקדות קבועות הן מפתח לבניית עושר באמצעות ריבית דריבית, במיוחד לאורך תקופות זמן ארוכות יותר.",
    
    initialInvestment_info: "השקעה התחלתית",
    initialInvestment_desc: "הסכום שאיתו אתה מתחיל בתחילת מסע ההשקעות שלך. השקעה ראשונית גדולה יותר נותנת לריבית דריבית יותר לעבוד איתה מההתחלה.",
    
    period_info: "תקופת השקעה",
    period_desc: "משך הזמן שאתה מתכנן להשקיע. תקופות השקעה ארוכות יותר מגדילות באופן דרמטי את ההשפעות של ריבית דריבית, כאשר התשואות שלך מייצרות את התשואות שלהן עצמן לאורך זמן.",
    
    annualReturn_info: "שיעור תשואה שנתי",
    annualReturn_desc: "צמיחת האחוזים השנתית הצפויה של ההשקעות שלך. שיעור זה משתנה לפי סוג ההשקעה. מדד ה-S&P 500 מניב בממוצע כ-10% בשנה. מדד הנאסדק 100 השיג תשואה של 19.7% בין השנים 2020 ל-2025, בעוד שאגרות חוב וחשבונות חיסכון בדרך כלל מציעים תשואות נמוכות יותר עם פחות סיכון.",

    // Storyline translations
    ifYouStart: "אם תתחיל עם",
    andInvest: "ותשקיע",
    andWithdraw: "ותמשוך",
    monthly: "מדי חודש",
    for: "למשך",
    withReturn: "עם תשואה שנתית של",
    youWillReach: "תגיע ליעד של",
    youWillHave: "יהיה לך",
    atTheEnd: "בסוף תקופת ההשקעה שלך."
  },
};
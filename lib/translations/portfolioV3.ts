import { Language } from './index';

export interface PortfolioV3Translation {
  // Header
  financialPlanningTool: string;
  portfolioTaxStrategy: string;
  compareOutcomes: string;

  // Strategy Options
  sellPortfolioAssets: string;
  payTaxNow: string;
  portfolioBackedLoan: string;
  payInterestOverTime: string;

  // Rates and Percentages
  marketReturnRate: string;
  loanInterestRate: string;
  profitPercentage: string;

  // Loan Strategy Results
  loanStrategyResults: string;
  requiredLoan: string;
  monthlyPayment: string;
  prepaidInterest: string;
  totalInterestPaid: string;
  finalPortfolioValue: string;
  netWorth: string;

  // Sell Strategy Results
  sellStrategyResults: string;
  amountToSell: string;
  taxPaid: string;
  remainingPortfolio: string;

  // Details Section
  hideDetails: string;
  showDetails: string;
  strategyComparison: string;
  loanStrategy: string;
  keepInvestments: string;
  sellStrategy: string;
  realizeGains: string;
  netWorthDesc: string;

  // Loan Payment Strategy
  loanPaymentStrategy: string;
  upfrontInterest: string;
  borrowExtra: string;
  monthlyPayments: string;
  payInterestMonthly: string;

  // Parameters
  parameters: string;
  portfolioValue: string;
  targetCash: string;
  investmentPeriod: string;
  years: string;
  year: string;
  taxRate: string;
  formulas: string;

  // UI Elements
  close: string;
  madeWith: string;

  // Explanatory Text
  ifYouHave: string;
  with: string;
  inProfits: string;
  andTaxRate: string;
  taxRateOn: string;
  andYouNeed: string;
  inCash: string;

  entries: string; // Used for Object.entries mapping
  title: string;   // Used in drawer content
  description: string; // Used in drawer content
  upfrontInterestTitle: string; // For loan strategy option
  monthlyPaymentsTitle: string; // For loan strategy option
  yearsLabel: string; // Label for years
  formulasTitle: string; // Title for formulas section
  yearLabel: string; // Label for singular year
}

export const portfolioV3Translations: Record<Language, PortfolioV3Translation> = {
  en: {
    financialPlanningTool: 'Financial Planning Tool',
    portfolioTaxStrategy: 'Portfolio Tax Strategy',
    compareOutcomes: 'Compare the financial outcomes of selling assets versus borrowing against your portfolio',
    sellPortfolioAssets: 'Sell Portfolio Assets',
    payTaxNow: 'Pay capital gains tax now',
    portfolioBackedLoan: 'Portfolio-Backed Loan',
    payInterestOverTime: 'Pay interest over time',
    marketReturnRate: 'Market Return Rate (%)',
    loanInterestRate: 'Loan Interest Rate (%)',
    profitPercentage: "Portfolio's Profit Percentage (%)",
    loanStrategyResults: 'Loan Strategy Results',
    requiredLoan: 'Required Loan:',
    monthlyPayment: 'Monthly Payment:',
    prepaidInterest: 'Prepaid Interest:',
    totalInterestPaid: 'Total Interest Paid:',
    finalPortfolioValue: 'Final Portfolio Value:',
    netWorth: 'Net Worth:',
    sellStrategyResults: 'Sell Strategy Results',
    amountToSell: 'Amount to Sell:',
    taxPaid: 'Tax Paid:',
    remainingPortfolio: 'Remaining Portfolio:',
    hideDetails: 'Hide Details',
    showDetails: 'Show Details',
    strategyComparison: 'Strategy Comparison',
    loanStrategy: 'Loan Strategy',
    keepInvestments: 'Keep investments growing while accessing cash without triggering capital gains',
    sellStrategy: 'Sell Strategy',
    realizeGains: 'Realize gains, pay taxes, and reduce your market exposure',
    netWorthDesc: 'Portfolio value minus outstanding loan balance',
    loanPaymentStrategy: 'Loan Payment Strategy',
    upfrontInterest: 'Upfront Interest',
    borrowExtra: 'Borrow extra initially to cover future interest',
    monthlyPayments: 'Monthly Payments',
    payInterestMonthly: 'Pay interest monthly from portfolio returns',
    parameters: 'Parameters',
    portfolioValue: 'Portfolio Value',
    targetCash: 'Target Cash',
    investmentPeriod: 'Investment Period',
    years: 'years',
    year: 'year',
    taxRate: 'Tax Rate',
    formulas: 'Formulas',
    close: 'Close',
    madeWith: 'Portfolio Tax Optimizer • Made with 💙',
    ifYouHave: 'If you have a stock portfolio of',
    with: 'with',
    inProfits: 'in profits,',
    andTaxRate: 'and a',
    taxRateOn: 'tax rate on those profits,',
    andYouNeed: 'and you need',
    inCash: 'in cash - you have two options:',

    // Added new translations
    entries: 'Entries',
    title: 'Title',
    description: 'Description',
    upfrontInterestTitle: 'Upfront Interest',
    monthlyPaymentsTitle: 'Monthly Payments',
    yearsLabel: 'years',
    formulasTitle: 'Formulas Used',
    yearLabel: 'year'

  },
  he: {
    financialPlanningTool: 'כלי לתכנון פיננסי',
    portfolioTaxStrategy: 'אסטרטגיית מס לתיק השקעות',
    compareOutcomes: 'השווה בין התוצאות הפיננסיות של מכירת נכסים לעומת הלוואה כנגד תיק ההשקעות שלך',
    sellPortfolioAssets: 'מכירת נכסים מהתיק',
    payTaxNow: 'תשלום מס רווח הון עכשיו',
    portfolioBackedLoan: 'הלוואה בגיבוי תיק השקעות',
    payInterestOverTime: 'תשלום ריבית לאורך זמן',
    marketReturnRate: 'שיעור תשואת השוק (%)',
    loanInterestRate: 'שיעור ריבית ההלוואה (%)',
    profitPercentage: 'אחוז הרווח בתיק (%)',
    loanStrategyResults: 'תוצאות אסטרטגיית ההלוואה',
    requiredLoan: 'הלוואה נדרשת:',
    monthlyPayment: 'תשלום חודשי:',
    prepaidInterest: 'ריבית משולמת מראש:',
    totalInterestPaid: 'סך הריבית ששולמה:',
    finalPortfolioValue: 'ערך סופי של התיק:',
    netWorth: 'שווי נקי:',
    sellStrategyResults: 'תוצאות אסטרטגיית המכירה',
    amountToSell: 'סכום למכירה:',
    taxPaid: 'מס ששולם:',
    remainingPortfolio: 'יתרת התיק:',
    hideDetails: 'הסתר פרטים',
    showDetails: 'הצג פרטים',
    strategyComparison: 'השוואת אסטרטגיות',
    loanStrategy: 'אסטרטגיית הלוואה',
    keepInvestments: 'שמור על צמיחת ההשקעות תוך גישה למזומנים ללא הפעלת מס רווח הון',
    sellStrategy: 'אסטרטגיית מכירה',
    realizeGains: 'מימוש רווחים, תשלום מסים והפחתת החשיפה לשוק',
    netWorthDesc: 'ערך התיק פחות יתרת ההלוואה',
    loanPaymentStrategy: 'אסטרטגיית תשלום הלוואה',
    upfrontInterest: 'ריבית מראש',
    borrowExtra: 'לווה סכום נוסף בהתחלה לכיסוי ריבית עתידית',
    monthlyPayments: 'תשלומים חודשיים',
    payInterestMonthly: 'שלם ריבית חודשית מתשואות התיק',
    parameters: 'פרמטרים',
    portfolioValue: 'ערך התיק',
    targetCash: 'מזומן נדרש',
    investmentPeriod: 'תקופת השקעה',
    years: 'שנים',
    year: 'שנה',
    taxRate: 'שיעור המס',
    formulas: 'נוסחאות',
    close: 'סגור',
    madeWith: 'אופטימיזטור מס לתיק השקעות • נוצר עם 💙',
    ifYouHave: 'אם יש לך תיק מניות בשווי',
    with: 'עם',
    inProfits: 'ברווחים,',
    andTaxRate: 'ושיעור מס של',
    taxRateOn: 'על רווחים אלה,',
    andYouNeed: 'ואתה צריך',
    inCash: 'במזומן - יש לך שתי אפשרויות:',

    entries: 'ערכים',
    title: 'כותרת',
    description: 'תיאור',
    upfrontInterestTitle: 'ריבית מראש',
    monthlyPaymentsTitle: 'תשלומים חודשיים',
    yearsLabel: 'שנים',
    formulasTitle: 'נוסחאות בשימוש',
    yearLabel: 'שנה'
    
  }
}; 
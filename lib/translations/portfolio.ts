import { Language } from './index';

export interface PortfolioTranslation {
  title: string;
  subtitle: string;
  initialPortfolio: string;
  loanAmount: string;
  interestRate: string;
  marketReturn: string;
  taxRate: string;
  portfolioValue: string;
  years: string;
  loanStrategy: string;
  sellStrategy: string;
  loanStrategySummary: string;
  sellStrategySummary: string;
  finalPortfolioValue: string;
  netWorthAfterLoan: string;
  totalInterestPaid: string;
  initialTaxPaid: string;
  taxOpportunityCost: string;
  // New translations
  chooseLoanStrategy: string;
  upfrontInterest: string;
  monthlyPayments: string;
  upfrontInterestDesc: string;
  monthlyPaymentsDesc: string;
  currentValue: string;
  targetCash: string;
  monthlyPayment: string;
  prepaidInterest: string;
  amountToSell: string;
  showDetails: string;
  hideDetails: string;
  constants: string;
  assumptions: string;
  investmentPeriod: string;
  profitPercentage: string;
  formulas: string;
}

export const portfolioTranslations: Record<Language, PortfolioTranslation> = {
  en: {
    title: 'Portfolio Loan Calculator',
    subtitle: 'Compare borrowing against your portfolio versus selling assets',
    initialPortfolio: 'Initial Portfolio Value',
    loanAmount: 'Loan Amount',
    interestRate: 'Interest Rate (%)',
    marketReturn: 'Expected Market Return (%)',
    taxRate: 'Capital Gains Tax Rate (%)',
    portfolioValue: 'Portfolio Value',
    years: 'Years',
    loanStrategy: 'Loan Strategy',
    sellStrategy: 'Sell Strategy',
    loanStrategySummary: 'Loan Strategy Summary',
    sellStrategySummary: 'Sell Strategy Summary',
    finalPortfolioValue: 'Final Portfolio Value',
    netWorthAfterLoan: 'Net Worth (After Loan)',
    totalInterestPaid: 'Total Interest Paid',
    initialTaxPaid: 'Initial Tax Paid',
    taxOpportunityCost: 'Tax Opportunity Cost',
    // New translations
    chooseLoanStrategy: 'Choose Loan Payment Strategy',
    upfrontInterest: 'Upfront Interest',
    monthlyPayments: 'Monthly Payments',
    upfrontInterestDesc: 'Borrow extra initially to cover future interest',
    monthlyPaymentsDesc: 'Pay interest monthly from portfolio returns',
    currentValue: 'Current Value',
    targetCash: 'Target Cash',
    monthlyPayment: 'Monthly Payment',
    prepaidInterest: 'Prepaid Interest',
    amountToSell: 'Amount to Sell',
    showDetails: 'Show Details',
    hideDetails: 'Hide Details',
    constants: 'Constants',
    assumptions: 'Assumptions',
    investmentPeriod: 'Investment Period (Years)',
    profitPercentage: 'Profit Percentage (%)',
    formulas: 'Formulas',
  },
  he: {
    title: 'מחשבון הלוואה כנגד תיק',
    subtitle: 'השוואה בין לקיחת הלוואה כנגד התיק לבין מכירת נכסים',
    initialPortfolio: 'שווי תיק התחלתי',
    loanAmount: 'סכום ההלוואה',
    interestRate: 'שיעור ריבית (%)',
    marketReturn: 'תשואת שוק צפויה (%)',
    taxRate: 'שיעור מס רווחי הון (%)',
    portfolioValue: 'שווי תיק',
    years: 'שנים',
    loanStrategy: 'אסטרטגיית הלוואה',
    sellStrategy: 'אסטרטגיית מכירה',
    loanStrategySummary: 'סיכום אסטרטגיית הלוואה',
    sellStrategySummary: 'סיכום אסטרטגיית מכירה',
    finalPortfolioValue: 'שווי תיק סופי',
    netWorthAfterLoan: 'שווי נטו (אחרי הלוואה)',
    totalInterestPaid: 'סך ריבית ששולמה',
    initialTaxPaid: 'מס ששולם בהתחלה',
    taxOpportunityCost: 'עלות הזדמנות של המס',
    // New translations
    chooseLoanStrategy: 'בחר אסטרטגיית תשלום הלוואה',
    upfrontInterest: 'ריבית מראש',
    monthlyPayments: 'תשלומים חודשיים',
    upfrontInterestDesc: 'לווה סכום נוסף מראש לכיסוי ריבית עתידית',
    monthlyPaymentsDesc: 'שלם ריבית חודשית מתשואות התיק',
    currentValue: 'שווי נוכחי',
    targetCash: 'מזומן נדרש',
    monthlyPayment: 'תשלום חודשי',
    prepaidInterest: 'ריבית ששולמה מראש',
    amountToSell: 'סכום למכירה',
    showDetails: 'הצג פרטים',
    hideDetails: 'הסתר פרטים',
    constants: 'קבועים',
    assumptions: 'הנחות',
    investmentPeriod: 'תקופת השקעה (שנים)',
    profitPercentage: 'אחוז רווח (%)',
    formulas: 'נוסחאות',
  },
};

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

  // Slider Info
  marketReturn: string;
  marketReturnDesc: string;
  interestRate_2: string;
  interestRateDesc: string;
  currentValue: string;
  currentValueDesc: string;
  targetCash_2: string;
  targetCashDesc: string;
  years_2: string;
  yearsDesc: string;
  taxRate_2: string;
  taxRateDesc: string;
  profitPercentage_2: string;
  profitPercentageDesc: string;

  // Chart labels
  loanStrategyChart: string;
  sellStrategyChart: string;
  netWorthChart: string;

  // Tooltip labels
  tooltipLoanStrategy: string;
  tooltipSellStrategy: string;
  tooltipNetWorth: string;
  tooltipYear: string;

  // Summary Section
  summaryLoanStrategy: string;
  summarySellStrategy: string;
  summaryRequiredLoan: string;
  summaryMonthlyPayment: string;
  summaryPrepaidInterest: string;
  summaryTotalInterest: string;
  summaryFinalValue: string;
  summaryNetWorth: string;
  summaryAmountToSell: string;
  summaryTaxPaid: string;
  summaryRemainingPortfolio: string;
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
    yearLabel: 'year',

    // Slider Info
    marketReturn: "Market Return Rate",
    marketReturnDesc: "The expected annual percentage growth of your investment portfolio. Historical average for the S&P 500 is around 10%. The Nasdaq100 averaged 19.7% between 2020 and 2025. Higher returns mean your portfolio grows faster, potentially offsetting interest costs in the loan strategy.",
    interestRate_2: "Loan Interest Rate",
    interestRateDesc: "The annual interest rate charged on your portfolio-backed loan. These rates are typically lower than unsecured loans because your portfolio serves as collateral. Lower rates make the loan strategy more attractive compared to selling assets.",
    currentValue: "Portfolio Value",
    currentValueDesc: "The current total market value of your investment portfolio. This is the combined value of all your investments before any taxes or fees.",
    targetCash_2: "Target Cash",
    targetCashDesc: "The amount of money you need to access from your portfolio. This is the cash you're trying to obtain either by selling assets or by taking a loan against your portfolio.",
    years_2: "Investment Period",
    yearsDesc: "The number of years you plan to maintain your investment strategy before potentially selling or paying back loans. Longer periods typically favor the loan strategy as it gives your investments more time to compound.",
    taxRate_2: "Tax Rate",
    taxRateDesc: "The percentage of your investment profits that will be paid as taxes when you sell. This includes federal, state, and local capital gains taxes. Higher tax rates make the loan strategy more attractive as it defers these taxes.",
    profitPercentage_2: "Portfolio's Profit Percentage",
    profitPercentageDesc: "The percentage of your portfolio that consists of profits (capital gains). You only pay capital gains taxes on this portion. For example, if you invested $25,000 and now have $100,000, your profit percentage would be 75%.",

    // Chart labels
    loanStrategyChart: "Loan Strategy",
    sellStrategyChart: "Sell Strategy",
    netWorthChart: "Net Worth (Loan)",

    // Tooltip labels
    tooltipLoanStrategy: "Loan Strategy",
    tooltipSellStrategy: "Sell Strategy",
    tooltipNetWorth: "Net Worth (Loan)",
    tooltipYear: "Year",

    // Summary Section
    summaryLoanStrategy: "Loan Strategy Results",
    summarySellStrategy: "Sell Strategy Results",
    summaryRequiredLoan: "Required Loan:",
    summaryMonthlyPayment: "Monthly Payment:",
    summaryPrepaidInterest: "Prepaid Interest:",
    summaryTotalInterest: "Total Interest Paid:",
    summaryFinalValue: "Final Portfolio Value:",
    summaryNetWorth: "Net Worth:",
    summaryAmountToSell: "Amount to Sell:",
    summaryTaxPaid: "Tax Paid:",
    summaryRemainingPortfolio: "Remaining Portfolio:",
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
    yearLabel: 'שנה',

    // Slider Info
    marketReturn: "שיעור תשואת שוק",
    marketReturnDesc: "התשואה השנתית הצפויה באחוזים של תיק ההשקעות שלך. הממוצע ההיסטורי עבור S&P 500 הוא סביב 10%. מדד הנאסדק 100 השיג תשואה של 19.7% בין השנים 2020 ל-2025. תשואות גבוהות יותר משמעותן שתיק ההשקעות שלך גדל מהר יותר, מה שעשוי לקזז את עלויות הריבית באסטרטגיית ההלוואה.",
    interestRate_2: "שיעור ריבית ההלוואה",
    interestRateDesc: "שיעור הריבית השנתי שנגבה על ההלוואה המגובה בתיק ההשקעות שלך. שיעורים אלה נמוכים בדרך כלל מהלוואות לא מובטחות מכיוון שתיק ההשקעות שלך משמש כבטוחה. שיעורים נמוכים יותר הופכים את אסטרטגיית ההלוואה לאטרקטיבית יותר בהשוואה למכירת נכסים.",
    currentValue: "ערך תיק",
    currentValueDesc: "הערך הכולל הנוכחי בשוק של תיק ההשקעות שלך. זהו הערך המשולב של כל ההשקעות שלך לפני מיסים או עמלות.",
    targetCash_2: "מזומן נדרש",
    targetCashDesc: "סכום הכסף שאתה צריך לגשת אליו מתיק ההשקעות שלך. זהו המזומן שאתה מנסה להשיג על ידי מכירת נכסים או על ידי לקיחת הלוואה כנגד תיק ההשקעות שלך.",
    years_2: "תקופת השקעה",
    yearsDesc: "מספר השנים שבהן אתה מתכנן לשמור על אסטרטגיית ההשקעה שלך לפני מכירה פוטנציאלית או החזר הלוואות. תקופות ארוכות יותר בדרך כלל מעדיפות את אסטרטגיית ההלוואה מכיוון שהיא נותנת להשקעות שלך יותר זמן לצבור ריבית דריבית.",
    taxRate_2: "שיעור מס",
    taxRateDesc: "אחוז הרווחים מההשקעות שלך שישולמו כמסים בעת המכירה. בישראל המס על רווחי הון עומד על 25%. שיעורי מס גבוהים יותר הופכים את אסטרטגיית ההלוואה לאטרקטיבית יותר מכיוון שהיא דוחה את תשלום המסים הללו.״",
    profitPercentage_2: "אחוז הרווח בתיק",
    profitPercentageDesc: "אחוז תיק ההשקעות שלך שמורכב מרווחים (רווחי הון). אתה משלם מס רווחי הון רק על חלק זה. לדוגמה, אם השקעת 25,000 ש\"ח ועכשיו יש לך 100,000 ש\"ח, אחוז הרווח שלך יהיה 75%.",

    // Chart labels
    loanStrategyChart: "אסטרטגיית הלוואה",
    sellStrategyChart: "אסטרטגיית מכירה",
    netWorthChart: "שווי נקי (הלוואה)",

    // Tooltip labels
    tooltipLoanStrategy: "אסטרטגיית הלוואה",
    tooltipSellStrategy: "אסטרטגיית מכירה",
    tooltipNetWorth: "שווי נקי (הלוואה)",
    tooltipYear: "שנה",

    // Summary Section
    summaryLoanStrategy: "תוצאות אסטרטגיית ההלוואה",
    summarySellStrategy: "תוצאות אסטרטגיית המכירה",
    summaryRequiredLoan: "הלוואה נדרשת:",
    summaryMonthlyPayment: "תשלום חודשי:",
    summaryPrepaidInterest: "ריבית מראש:",
    summaryTotalInterest: "סך ריבית ששולמה:",
    summaryFinalValue: "ערך סופי של התיק:",
    summaryNetWorth: "שווי נקי:",
    summaryAmountToSell: "סכום למכירה:",
    summaryTaxPaid: "מס ששולם:",
    summaryRemainingPortfolio: "יתרת התיק:",
  },
}; 
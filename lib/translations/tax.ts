import { Language } from './index';

export interface TaxTranslation {
  title: string;
  subtitle: string;
  initialInvestment: string;
  annualContribution: string;
  returnRate: string;
  taxRate: string;
  investmentPeriod: string;
  years: string;
  accountValue: string;
  traditionalIRA: string;
  rothIRA: string;
  taxableAccount: string;
  finalValue: string;
  traditionalDescription: string;
  rothDescription: string;
  taxableDescription: string;
  dividendYield: string;
  dividendTaxRate: string;
  capitalGainsTaxRate: string;
  inflationRate: string;
  retirementTaxRate: string;
  totalContributions: string;
  totalTaxesPaid: string;
  afterTaxValue: string;
  taxSavings: string;
  effectiveTaxRate: string;
}

export const taxTranslations: Record<Language, TaxTranslation> = {
  en: {
    title: "Tax Efficiency Calculator",
    subtitle: "Compare different investment account types and understand their tax implications on your long-term returns",
    initialInvestment: "Initial Investment",
    annualContribution: "Annual Contribution",
    returnRate: "Expected Return Rate (%)",
    taxRate: "Current Tax Rate (%)",
    investmentPeriod: "Investment Period (Years)",
    years: "Years",
    accountValue: "Account Value",
    traditionalIRA: "Traditional IRA/401k",
    rothIRA: "Roth IRA",
    taxableAccount: "Taxable Account",
    finalValue: "Final Value",
    traditionalDescription: "• Pre-tax contributions\n• Tax-deferred growth\n• Taxed on withdrawal at retirement tax rate\n• Good if you expect lower taxes in retirement",
    rothDescription: "• Post-tax contributions\n• Tax-free growth\n• Tax-free withdrawals\n• Good if you expect higher taxes in retirement",
    taxableDescription: "• Post-tax contributions\n• Taxed on dividends yearly\n• Capital gains tax on sale\n• Most flexible but least tax-efficient",
    dividendYield: "Dividend Yield (%)",
    dividendTaxRate: "Dividend Tax Rate (%)",
    capitalGainsTaxRate: "Capital Gains Tax Rate (%)",
    inflationRate: "Inflation Rate (%)",
    retirementTaxRate: "Expected Retirement Tax Rate (%)",
    totalContributions: "Total Contributions",
    totalTaxesPaid: "Total Taxes Paid",
    afterTaxValue: "After-Tax Value",
    taxSavings: "Tax Savings vs Taxable",
    effectiveTaxRate: "Effective Tax Rate",
  },
  he: {
    title: "מחשבון יעילות מס",
    subtitle: "השווה בין סוגי חשבונות השקעה שונים והבן את השלכות המס שלהם על התשואות ארוכות הטווח",
    initialInvestment: "השקעה התחלתית",
    annualContribution: "הפקדה שנתית",
    returnRate: "תשואה צפויה (%)",
    taxRate: "שיעור מס נוכחי (%)",
    investmentPeriod: "תקופת השקעה (שנים)",
    years: "שנים",
    accountValue: "שווי חשבון",
    traditionalIRA: "IRA/401k מסורתי",
    rothIRA: "Roth IRA",
    taxableAccount: "חשבון חייב במס",
    finalValue: "שווי סופי",
    traditionalDescription: "• הפקדות לפני מס\n• צמיחה נדחית מס\n• מיסוי במשיכה לפי שיעור מס בפרישה\n• מתאים אם צפוי שיעור מס נמוך יותר בפרישה",
    rothDescription: "• הפקדות אחרי מס\n• צמיחה פטורה ממס\n• משיכות פטורות ממס\n• מתאים אם צפוי שיעור מס גבוה יותר בפרישה",
    taxableDescription: "• הפקדות אחרי מס\n• מיסוי שנתי על דיבידנדים\n• מס רווחי הון במכירה\n• הכי גמיש אך הכי פחות יעיל מבחינת מס",
    dividendYield: "תשואת דיבידנד (%)",
    dividendTaxRate: "שיעור מס על דיבידנדים (%)",
    capitalGainsTaxRate: "שיעור מס רווחי הון (%)",
    inflationRate: "שיעור אינפלציה (%)",
    retirementTaxRate: "שיעור מס צפוי בפרישה (%)",
    totalContributions: "סך הפקדות",
    totalTaxesPaid: "סך מיסים ששולמו",
    afterTaxValue: "שווי אחרי מס",
    taxSavings: "חיסכון במס לעומת חשבון רגיל",
    effectiveTaxRate: "שיעור מס אפקטיבי",
  },
};
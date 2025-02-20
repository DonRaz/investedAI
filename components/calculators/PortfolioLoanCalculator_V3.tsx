'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Info, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { useTranslationStore } from '@/lib/translations';
import { portfolioV3Translations } from '@/lib/translations/portfolioV3';

// Add these type definitions at the top of the file
type RefNames = 'profitPercentage' | 'taxRate' | 'currentValue' | 'targetCash';
type SliderInfoKeys =
	| 'marketReturn'
	| 'interestRate'
	| 'currentValue'
	| 'targetCash'
	| 'years'
	| 'taxRate'
	| 'profitPercentage';

interface Inputs {
	initialInvestment: number;
	currentValue: number;
	targetCash: number;
	taxRate: number;
	interestRate: number;
	marketReturn: number;
	years: number;
	profitPercentage: number;
}

interface DrawerContent {
	title: string;
	description: string;
}

interface ChartData {
	year: number;
	loanStrategy: number;
	sellStrategy: number;
	loanBalance: number;
	yearlyInterest: number;
	totalInterestPaid: number;
	monthlyPayment: number;
	netWorth: number;
}

interface CalculationSummary {
	amountToSell: number;
	taxPaid: number;
	yearlyInterest: number;
	totalLoanNeeded: number;
	totalInterest: number;
}

interface ClickableValueProps {
	value: number;
	refName: RefNames;
	formatter?: (value: number) => string;
}

interface HelpButtonProps {
	sliderKey: SliderInfoKeys;
}

const PortfolioTaxCalculator = () => {
	// Add translation hooks
	const { language, direction } = useTranslationStore();
	const t = portfolioV3Translations[language];

	const [showDetails, setShowDetails] = useState(false);
	const [loanStrategy, setLoanStrategy] = useState('monthly');
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [drawerContent, setDrawerContent] = useState({
		title: '',
		description: '',
	});
	const [inputs, setInputs] = useState({
		initialInvestment: 100000,
		currentValue: 200000,
		targetCash: 100000,
		taxRate: 25,
		interestRate: 5,
		marketReturn: 10,
		years: 5,
		profitPercentage: 75,
	});
	const [animatingRef, setAnimatingRef] = useState<RefNames | null>(null);

	// References for scrolling
	const profitPercentageRef = useRef<HTMLDivElement>(null);
	const taxRateRef = useRef<HTMLDivElement>(null);
	const portfolioValueRef = useRef<HTMLDivElement>(null);
	const targetCashRef = useRef<HTMLDivElement>(null);

	// Define refs object outside of handleValueClick
	const refs = {
		profitPercentage: profitPercentageRef,
		taxRate: taxRateRef,
		currentValue: portfolioValueRef,
		targetCash: targetCashRef,
	} as const;

	// Update handleValueClick
	const handleValueClick = (refName: RefNames): void => {
		setShowDetails(true);
		setAnimatingRef(refName);

		setTimeout(() => {
			if (refs[refName]?.current) {
				refs[refName].current?.scrollIntoView({ behavior: 'smooth' });
			}
		}, 100);

		setTimeout(() => {
			setAnimatingRef(null);
		}, 1500);
	};

	// Helper functions for opening the info drawer
	const openInfoDrawer = (title: string, description: string): void => {
		setDrawerContent({
			title,
			description,
		});
		setDrawerOpen(true);
	};

	// Info descriptions for each slider
	const sliderInfo: Record<SliderInfoKeys, { title: string; description: string }> = {
		marketReturn: {
			title: t.marketReturn,
			description: t.marketReturnDesc,
		},
		interestRate: {
			title: t.interestRate_2,
			description: t.interestRateDesc,
		},
		currentValue: {
			title: t.currentValue,
			description: t.currentValueDesc,
		},
		targetCash: {
			title: t.targetCash_2,
			description: t.targetCashDesc,
		},
		years: {
			title: t.years_2,
			description: t.yearsDesc,
		},
		taxRate: {
			title: t.taxRate_2,
			description: t.taxRateDesc,
		},
		profitPercentage: {
			title: t.profitPercentage_2,
			description: t.profitPercentageDesc,
		},
	};

	const formulas = {
		upfrontLoan: 'Upfront Loan = Target Cash / (1 - (interest_rate * years))',
		monthlyPayment: 'Monthly Interest = (Loan Amount * interest_rate) / 12',
		requiredLoan: 'Required Loan = Target Cash / (1 - (interest_rate * years))',
		amountToSell: 'Amount to Sell = Target Cash / (1 - (profit_percentage * tax_rate))',
		portfolioGrowth: 'Portfolio(year) = Portfolio(year-1) * (1 + market_return) - yearly_interest',
	};

	const calculateRequiredLoan = (principal: number, rate: number, years: number): number => {
		const annualRate = rate / 100;
		if (annualRate * years >= 1) return principal * 2;
		return principal / (1 - annualRate * years);
	};

	const calculateUpfrontLoan = (targetCash: number, rate: number, years: number): number => {
		const annualRate = rate / 100;
		if (annualRate * years >= 1) return targetCash * 2;
		return targetCash / (1 - annualRate * years);
	};

	const calculateMonthlyInterest = (loanAmount: number, rate: number): number => {
		return (loanAmount * (rate / 100)) / 12;
	};

	const calculateValues = () => {
		const data = [];
		const taxPerDollarSold = (inputs.profitPercentage / 100) * (inputs.taxRate / 100);

		const amountToSell = inputs.targetCash / (1 - taxPerDollarSold);
		const taxPaid = amountToSell * taxPerDollarSold;
		let sellPortfolioValue = inputs.currentValue - amountToSell;

		let totalLoanNeeded,
			yearlyInterest,
			monthlyInterest,
			accumulatedInterest = 0;
		let loanPortfolioValue = inputs.currentValue;

		totalLoanNeeded = inputs.targetCash;
		yearlyInterest = totalLoanNeeded * (inputs.interestRate / 100);
		monthlyInterest = calculateMonthlyInterest(totalLoanNeeded, inputs.interestRate);

		if (loanStrategy === 'upfront') {
			totalLoanNeeded = calculateUpfrontLoan(inputs.targetCash, inputs.interestRate, inputs.years);
			accumulatedInterest = totalLoanNeeded - inputs.targetCash;
		}

		for (let year = 0; year <= inputs.years; year++) {
			if (year > 0) {
				sellPortfolioValue = sellPortfolioValue * (1 + inputs.marketReturn / 100);
				if (loanStrategy === 'upfront') {
					loanPortfolioValue = loanPortfolioValue * (1 + inputs.marketReturn / 100);
				} else {
					let monthlyPortfolioValue = loanPortfolioValue;
					const monthlyReturn = inputs.marketReturn / 1200;

					for (let month = 0; month < 12; month++) {
						monthlyPortfolioValue = monthlyPortfolioValue * (1 + monthlyReturn) - monthlyInterest;
						accumulatedInterest += monthlyInterest;
					}
					loanPortfolioValue = monthlyPortfolioValue;
				}
			}

			data.push({
				year,
				loanStrategy: Math.round(loanPortfolioValue),
				sellStrategy: Math.round(sellPortfolioValue),
				loanBalance: totalLoanNeeded,
				yearlyInterest: Math.round(yearlyInterest),
				totalInterestPaid: Math.round(accumulatedInterest),
				monthlyPayment: loanStrategy === 'monthly' ? Math.round(monthlyInterest) : 0,
				netWorth: Math.round(loanPortfolioValue - totalLoanNeeded),
			});
		}

		return {
			data,
			summary: {
				amountToSell,
				taxPaid,
				yearlyInterest,
				totalLoanNeeded,
				totalInterest: totalLoanNeeded - inputs.targetCash,
			},
		};
	};

	const { data, summary } = calculateValues();
	const finalYear = data[data.length - 1];

	// Update ClickableValue component
	const ClickableValue: React.FC<ClickableValueProps> = ({
		value,
		refName,
		formatter = (v: number) => v.toString(),
	}) => (
		<span
			onClick={() => handleValueClick(refName)}
			className="underline decoration-dotted cursor-pointer hover:text-blue-500 transition-colors font-medium"
		>
			{formatter(value)}
		</span>
	);

	// Update HelpButton component
	const HelpButton: React.FC<HelpButtonProps> = ({ sliderKey }) => (
		<Button
			variant="ghost"
			size="icon"
			className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-100/60 dark:border-blue-800/30 shadow-sm backdrop-blur-sm p-0"
			onClick={(e) => {
				e.stopPropagation();
				openInfoDrawer(sliderInfo[sliderKey].title, sliderInfo[sliderKey].description);
			}}
		>
			<HelpCircle className="h-3.5 w-3.5 text-blue-500/90 dark:text-blue-400/90 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
		</Button>
	);

	return (
		<div
			className={`font-sans bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-blue-950 dark:via-gray-950 dark:to-indigo-950 p-8 min-h-screen flex flex-col justify-center items-center 
                
                `}
		>
			<Card className="w-full max-w-4xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 rounded-3xl mb-8">
				<div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-purple-100/30 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl"></div>
				<CardContent className="space-y-8 p-8 relative z-10">
					{/* Header */}
					<div className="text-center space-y-3 mb-10">
						<div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm mb-2">
							<span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
								{t.financialPlanningTool}
							</span>
						</div>
						<h1 className="text-3xl font-light tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
							{t.portfolioTaxStrategy}
						</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">{t.compareOutcomes}</p>
					</div>

					{/* Explanatory section */}
					<div className="p-6 backdrop-blur-md bg-gradient-to-r from-blue-50/90 to-blue-100/90 dark:from-blue-950/60 dark:to-blue-900/60 rounded-2xl border border-blue-200/50 dark:border-blue-800/30 shadow-lg">
						<p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
							{t.ifYouHave}{' '}
							<ClickableValue
								value={inputs.currentValue}
								refName="currentValue"
								formatter={(v) => '$' + v.toLocaleString()}
							/>
							,{t.with}{' '}
							<ClickableValue
								value={inputs.profitPercentage}
								refName="profitPercentage"
								formatter={(v) => v + '%'}
							/>{' '}
							{t.inProfits}
							{t.andTaxRate}{' '}
							<ClickableValue value={inputs.taxRate} refName="taxRate" formatter={(v) => v + '%'} />{' '}
							{t.taxRateOn}
							{t.andYouNeed}{' '}
							<ClickableValue
								value={inputs.targetCash}
								refName="targetCash"
								formatter={(v) => '$' + v.toLocaleString()}
							/>{' '}
							{t.inCash}
						</p>
						<div className="mt-4 grid grid-cols-2 gap-8 text-sm">
							<div className="flex flex-col space-y-2 items-center p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-xl shadow-sm border border-white/50 dark:border-gray-700/30">
								<div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-500 mb-2 shadow-inner"></div>
								<span className="font-medium text-center">{t.sellPortfolioAssets}</span>
								<span className="text-xs text-center text-gray-500">{t.payTaxNow}</span>
							</div>
							<div className="flex flex-col space-y-2 items-center p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-xl shadow-sm border border-white/50 dark:border-gray-700/30">
								<div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 mb-2 shadow-inner"></div>
								<span className="font-medium text-center">{t.portfolioBackedLoan}</span>
								<span className="text-xs text-center text-gray-500">{t.payInterestOverTime}</span>
							</div>
						</div>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						<div className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center gap-2">
									<Label className="text-sm font-normal">{t.marketReturnRate}</Label>
									<HelpButton sliderKey="marketReturn" />
								</div>
								<Slider
									value={[inputs.marketReturn]}
									onValueChange={(value) => setInputs({ ...inputs, marketReturn: value[0] })}
									min={1}
									max={20}
									step={0.5}
									className="py-2"
								/>
								<div className="flex justify-between text-xs text-gray-500">
									<span>1%</span>
									<span className="font-medium text-gray-800 dark:text-gray-200">
										{inputs.marketReturn}%
									</span>
									<span>20%</span>
								</div>
							</div>
						</div>

						<div className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center gap-2">
									<Label className="text-sm font-normal">{t.loanInterestRate}</Label>
									<HelpButton sliderKey="interestRate" />
								</div>
								<Slider
									value={[inputs.interestRate]}
									onValueChange={(value) => setInputs({ ...inputs, interestRate: value[0] })}
									min={1}
									max={10}
									step={0.25}
									className="py-2"
								/>
								<div className="flex justify-between text-xs text-gray-500">
									<span>1%</span>
									<span className="font-medium text-gray-800 dark:text-gray-200">
										{inputs.interestRate}%
									</span>
									<span>10%</span>
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<Label className="text-sm font-normal">{t.profitPercentage}</Label>
							<HelpButton sliderKey="profitPercentage" />
						</div>
						<Slider
							value={[inputs.profitPercentage]}
							onValueChange={(value) => setInputs({ ...inputs, profitPercentage: value[0] })}
							min={0}
							max={100}
							step={1}
							className="py-2"
						/>
						<div className="flex justify-between text-xs text-gray-500">
							<span>0%</span>
							<span className="font-medium text-gray-800 dark:text-gray-200">
								{inputs.profitPercentage}%
							</span>
							<span>100%</span>
						</div>
					</div>

					<div className="h-80 mt-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/50 dark:border-gray-700/30 shadow-lg">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
								<XAxis
									dataKey="year"
									tickLine={false}
									axisLine={{ stroke: '#eaeaea' }}
									tick={{ fill: '#888', fontSize: 12 }}
									label={{
										value: 'Years',
										position: 'insideBottom',
										offset: -5,
										fill: '#888',
										fontSize: 12,
									}}
								/>
								<YAxis
									tickFormatter={(value) => `$${value / 1000}k`}
									tickLine={false}
									axisLine={{ stroke: '#eaeaea' }}
									tick={{ fill: '#888', fontSize: 12 }}
									width={60}
								/>
								<RechartsTooltip
									contentStyle={{
										backgroundColor: 'rgba(255, 255, 255, 0.9)',
										borderRadius: '8px',
										border: 'none',
										boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
										padding: '8px 12px',
									}}
									formatter={(value, name) => {
										const strategyName = {
											loanStrategy: 'Loan Strategy',
											sellStrategy: 'Sell Strategy',
											netWorth: 'Net Worth (Loan)',
										}[name];
										return [`$${value.toLocaleString()}`, strategyName];
									}}
									labelFormatter={(year) => `Year ${year}`}
								/>
								<Legend
									verticalAlign="top"
									height={36}
									iconType="circle"
									iconSize={8}
									formatter={(value) => (
										<span style={{ color: '#666', fontSize: 12, marginLeft: 8 }}>{value}</span>
									)}
								/>
								<Line
									type="monotone"
									dataKey="loanStrategy"
									name="Loan Strategy"
									stroke="#60a5fa"
									strokeWidth={3}
									dot={{ r: 1 }}
									activeDot={{ r: 5, strokeWidth: 0 }}
								/>
								<Line
									type="monotone"
									dataKey="sellStrategy"
									name="Sell Strategy"
									stroke="#f87171"
									strokeWidth={3}
									dot={{ r: 1 }}
									activeDot={{ r: 5, strokeWidth: 0 }}
								/>
								<Line
									type="monotone"
									dataKey="netWorth"
									name="Net Worth (Loan)"
									stroke="#bfdbfe"
									strokeWidth={2}
									dot={{ r: 0 }}
									activeDot={{ r: 4, strokeWidth: 0 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>

					{/* Loan Strategy Results (Updated to use translations) */}
					<div className="grid gap-6 md:grid-cols-2">
						<div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/90 dark:from-blue-950/60 dark:to-indigo-950/60 backdrop-blur-md rounded-2xl p-6 shadow-md border border-blue-100/50 dark:border-blue-800/20">
							<h3 className="font-medium text-md mb-4 text-blue-800 dark:text-blue-300">
								{t.summaryLoanStrategy}
							</h3>
							<div className="space-y-3">
								<div className="flex justify-between text-sm">
									<span className="text-gray-600 dark:text-gray-400">{t.summaryRequiredLoan}:</span>
									<span className="font-medium">
										${Math.round(summary.totalLoanNeeded).toLocaleString()}
									</span>
								</div>
								{loanStrategy === 'monthly' && (
									<div className="flex justify-between text-sm">
										<span className="text-gray-600 dark:text-gray-400">
											{t.summaryMonthlyPayment}:
										</span>
										<span className="font-medium">
											${Math.round(finalYear.monthlyPayment).toLocaleString()}
										</span>
									</div>
								)}
								<div className="flex justify-between text-sm">
									<span className="text-gray-600 dark:text-gray-400">
										{loanStrategy === 'upfront' ? t.summaryPrepaidInterest : t.summaryTotalInterest}
										:
									</span>
									<span className="font-medium">
										${Math.round(finalYear.totalInterestPaid).toLocaleString()}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-600 dark:text-gray-400">{t.summaryFinalValue}:</span>
									<span className="font-medium">${finalYear.loanStrategy.toLocaleString()}</span>
								</div>
								<div className="flex justify-between bg-gradient-to-r from-blue-100/90 to-indigo-100/90 dark:from-blue-900/70 dark:to-indigo-900/70 backdrop-blur-sm px-0 py-3 rounded-lg mt-4 text-sm border border-blue-200/50 dark:border-blue-700/30">
									<span className="font-medium text-blue-800 dark:text-blue-200 pl-3">
										{t.summaryNetWorth}:
									</span>
									<span className="font-medium text-blue-800 dark:text-blue-200 pr-3">
										${(finalYear.loanStrategy - summary.totalLoanNeeded).toLocaleString()}
									</span>
								</div>
							</div>
						</div>

						<div className="bg-gradient-to-br from-red-50/90 to-rose-50/90 dark:from-red-950/60 dark:to-rose-950/60 backdrop-blur-md rounded-2xl p-6 shadow-md border border-red-100/50 dark:border-red-800/20">
							<h3 className="font-medium text-md mb-4 text-red-800 dark:text-red-300">
								{t.summarySellStrategy}
							</h3>
							<div className="space-y-3">
								<div className="flex justify-between text-sm">
									<span className="text-gray-600 dark:text-gray-400">{t.summaryAmountToSell}:</span>
									<span className="font-medium">
										${Math.round(summary.amountToSell).toLocaleString()}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-600 dark:text-gray-400">{t.summaryTaxPaid}:</span>
									<span className="font-medium">${Math.round(summary.taxPaid).toLocaleString()}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-600 dark:text-gray-400">
										{t.summaryRemainingPortfolio}:
									</span>
									<span className="font-medium">
										${Math.round(inputs.currentValue - summary.amountToSell).toLocaleString()}
									</span>
								</div>
								<div className="flex justify-between bg-gradient-to-r from-red-100/90 to-rose-100/90 dark:from-red-900/70 dark:to-rose-900/70 backdrop-blur-sm px-0 py-3 rounded-lg mt-4 text-sm border border-red-200/50 dark:border-red-700/30">
									<span className="font-medium text-red-800 dark:text-red-200 pl-3">
										{t.summaryFinalValue}:
									</span>
									<span className="font-medium text-red-800 dark:text-red-200 pr-3">
										${finalYear.sellStrategy.toLocaleString()}
									</span>
								</div>
							</div>
						</div>
					</div>

					<Button
						variant="ghost"
						onClick={() => setShowDetails(!showDetails)}
						className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-100/80 to-gray-50/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-md rounded-xl py-4 hover:from-gray-200/80 hover:to-gray-100/80 dark:hover:from-gray-700/50 dark:hover:to-gray-800/50 transition-all border border-white/50 dark:border-gray-700/30 shadow-sm"
					>
						{showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
						<span className="font-medium text-sm text-gray-600 dark:text-gray-400">
							{showDetails ? 'Hide Details' : 'Show Details'}
						</span>
					</Button>

					{showDetails && (
						<div className="mt-6 space-y-8 bg-gradient-to-br from-gray-50/90 via-white/80 to-gray-50/90 dark:from-gray-900/70 dark:via-gray-800/60 dark:to-gray-900/70 backdrop-blur-md rounded-2xl p-8 border border-white/50 dark:border-gray-700/30 shadow-lg">
							{/* Loan Strategy selector */}
							<div>
								<h4 className="font-medium text-md mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
									Strategy Comparison
								</h4>
								<div className="p-6 bg-gradient-to-b from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/30 shadow-lg mb-6">
									<div className="grid grid-cols-1 gap-y-6 text-sm">
										<div className="flex items-start">
											<div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 mt-1 mr-3 flex-shrink-0 shadow-inner"></div>
											<div>
												<div className="font-medium">{t.loanStrategy}</div>
												<div className="text-xs text-gray-500 mt-1">{t.keepInvestments}</div>
											</div>
										</div>
										<div className="flex items-start">
											<div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500 mt-1 mr-3 flex-shrink-0 shadow-inner"></div>
											<div>
												<div className="font-medium">{t.sellStrategy}</div>
												<div className="text-xs text-gray-500 mt-1">{t.realizeGains}</div>
											</div>
										</div>
										<div className="flex items-start">
											<div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 mt-1 mr-3 flex-shrink-0 shadow-inner"></div>
											<div>
												<div className="font-medium">{t.netWorth}</div>
												<div className="text-xs text-gray-500 mt-1">{t.netWorthDesc}</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div>
								<h4 className="font-medium text-md mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
									Loan Payment Strategy
								</h4>
								<div className="grid md:grid-cols-2 gap-6">
									<Button
										variant={loanStrategy === 'upfront' ? 'default' : 'outline'}
										onClick={() => setLoanStrategy('upfront')}
										className={`p-4 h-auto flex flex-col items-center text-center rounded-xl shadow-sm ${
											loanStrategy === 'upfront'
												? 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 border-0'
												: 'bg-white dark:bg-gray-800'
										}`}
									>
										<span
											className={`font-medium mb-2 ${
												loanStrategy === 'upfront' ? 'text-blue-800 dark:text-blue-200' : ''
											}`}
										>
											{t.upfrontInterestTitle}
										</span>
										<span className="text-xs text-gray-500 max-w-[200px]">{t.borrowExtra}</span>
									</Button>
									<Button
										variant={loanStrategy === 'monthly' ? 'default' : 'outline'}
										onClick={() => setLoanStrategy('monthly')}
										className={`p-4 h-auto flex flex-col items-center text-center rounded-xl shadow-sm ${
											loanStrategy === 'monthly'
												? 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 border-0'
												: 'bg-white dark:bg-gray-800'
										}`}
									>
										<span
											className={`font-medium mb-2 ${
												loanStrategy === 'monthly' ? 'text-blue-800 dark:text-blue-200' : ''
											}`}
										>
											{t.monthlyPaymentsTitle}
										</span>
										<span className="text-xs text-gray-500 max-w-[200px]">
											{t.payInterestMonthly}
										</span>
									</Button>
								</div>
							</div>

							<div>
								<h4 className="font-medium text-md mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
									Parameters
								</h4>
								<div className="space-y-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/50 dark:border-gray-700/30">
									<div className="grid md:grid-cols-2 gap-8">
										<div
											ref={portfolioValueRef}
											className={`space-y-4 ${
												animatingRef === 'currentValue' ? 'animate-bounce [animation-duration:2s]' : ''
											}`}
										>
											<div className="flex items-center gap-2">
												<Label className="text-sm font-normal">{t.portfolioValue}</Label>
												<HelpButton sliderKey="currentValue" />
												<span className="ml-auto font-medium">
													${inputs.currentValue.toLocaleString()}
												</span>
											</div>
											<Slider
												value={[inputs.currentValue]}
												onValueChange={(value) =>
													setInputs({ ...inputs, currentValue: value[0] })
												}
												min={50000}
												max={500000}
												step={10000}
												className="py-2"
											/>
											<div className="flex justify-between text-xs text-gray-500">
												<span>$50k</span>
												<span>$500k</span>
											</div>
										</div>
										<div
											ref={targetCashRef}
											className={`space-y-4 ${
												animatingRef === 'targetCash' ? 'animate-bounce [animation-duration:2s]' : ''
											}`}
										>
											<div className="flex items-center gap-2">
												<Label className="text-sm font-normal">{t.targetCash}</Label>
												<HelpButton sliderKey="targetCash" />
												<span className="ml-auto font-medium">
													${inputs.targetCash.toLocaleString()}
												</span>
											</div>
											<Slider
												value={[inputs.targetCash]}
												onValueChange={(value) =>
													setInputs({ ...inputs, targetCash: value[0] })
												}
												min={10000}
												max={300000}
												step={10000}
												className="py-2"
											/>
											<div className="flex justify-between text-xs text-gray-500">
												<span>$10k</span>
												<span>$300k</span>
											</div>
										</div>
									</div>

									<div className="grid md:grid-cols-2 gap-8">
										<div className="space-y-4">
											<div className="flex items-center gap-2">
												<Label className="text-sm font-normal">{t.investmentPeriod}</Label>
												<HelpButton sliderKey="years" />
												<span className="ml-auto font-medium">
													{inputs.years} {inputs.years === 1 ? t.yearLabel : t.yearsLabel}
												</span>
											</div>
											<Slider
												value={[inputs.years]}
												onValueChange={(value) => setInputs({ ...inputs, years: value[0] })}
												min={1}
												max={10}
												step={1}
												className="py-2"
											/>
											<div className="flex justify-between text-xs text-gray-500">
												<span>1 {t.yearLabel}</span>
												<span>10 {t.yearsLabel}</span>
											</div>
										</div>

										<div
											ref={taxRateRef}
											className={`space-y-4 ${animatingRef === 'taxRate' ? 'animate-bounce [animation-duration:2s]' : ''}`}
										>
											<div className="flex items-center gap-2">
												<Label className="text-sm font-normal">{t.taxRate}</Label>
												<HelpButton sliderKey="taxRate" />
												<span className="ml-auto font-medium">{inputs.taxRate}%</span>
											</div>
											<Slider
												value={[inputs.taxRate]}
												onValueChange={(value) => setInputs({ ...inputs, taxRate: value[0] })}
												min={0}
												max={50}
												step={1}
												className="py-2"
											/>
											<div className="flex justify-between text-xs text-gray-500">
												<span>0%</span>
												<span>50%</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div>
								<h4 className="font-medium text-md mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
									Formulas
								</h4>
								<div className="grid gap-3">
									{Object.entries(formulas).map(([key, formula]) => (
										<div
											key={key}
											className="p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg shadow-sm border border-white/50 dark:border-gray-700/30"
										>
											<p className="font-mono text-xs text-gray-600 dark:text-gray-400">
												{formula}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Attribution footer - now positioned below everything */}
			<div className="w-full text-center pb-4">
				<p className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent font-medium text-xs">
					{t.madeWith}
				</p>
			</div>

			{/* Info Drawer */}
			<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
				<DrawerContent className="max-h-[30vh] rounded-t-3xl overflow-hidden backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-t border-white/20 dark:border-white/10 shadow-2xl">
					<div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-t-3xl pointer-events-none"></div>

					<div className="w-12 h-1.5 bg-gray-300/50 dark:bg-gray-600/50 rounded-full mx-auto mt-2.5 mb-1"></div>

					<DrawerHeader className="border-b border-blue-100/50 dark:border-blue-800/30 relative z-10 px-8">
						<DrawerTitle className="text-xl font-light tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
							{drawerContent.title}
						</DrawerTitle>
					</DrawerHeader>

					<div className="relative z-10 px-8 py-6">
						<div className="bg-gradient-to-br from-white/70 to-blue-50/70 dark:from-gray-800/70 dark:to-blue-900/50 backdrop-blur-md p-5 rounded-2xl border border-white/50 dark:border-blue-800/20 shadow-lg">
							<DrawerDescription className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
								{drawerContent.description}
							</DrawerDescription>
						</div>
					</div>

					<DrawerFooter className="relative z-10 px-8 pb-6 pt-0">
						<DrawerClose asChild>
							<Button
								variant="outline"
								className="w-full py-3 bg-gradient-to-r from-blue-50/90 to-indigo-50/90 dark:from-blue-900/40 dark:to-indigo-900/40 backdrop-blur-md rounded-xl border border-blue-100/50 dark:border-blue-700/30 shadow-sm hover:from-blue-100/90 hover:to-indigo-100/90 dark:hover:from-blue-800/40 dark:hover:to-indigo-800/40 transition-all"
							>
								<span className="font-medium text-sm bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
									{t.close}
								</span>
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export const PortfolioLoanCalculator_V3 = PortfolioTaxCalculator;

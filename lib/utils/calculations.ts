export function calculateMonthlyGrowth(
  principal: number,
  annualRate: number,
  months: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  return principal * Math.pow(1 + monthlyRate, months);
}

export function calculateContributionsGrowth(
  monthlyAmount: number,
  annualRate: number,
  months: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return monthlyAmount * months;
  return (monthlyAmount * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;
}

export function calculateRequiredMonthly(
  target: number,
  initial: number,
  annualRate: number,
  months: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const futureValueOfInitial = calculateMonthlyGrowth(initial, annualRate, months);
  const remaining = target - futureValueOfInitial;

  if (monthlyRate === 0) return remaining / months;
  return (remaining * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
}
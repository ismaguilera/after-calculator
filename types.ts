export interface InputState {
  monthlyFee: number;
  registrationFee: number;
  targetChildren: number;
  assistantRatio: number;
  monthlyGrowth: number;
  rent: number;
  utilities: number;
  insurance: number;
  otherFixedCosts: number;
  assistantSalary: number;
  materialsPerChild: number;
  snacksPerChild: number;
  birthdaysPerMonth: number;
  revenuePerBirthday: number;
  adultWorkshopFee: number;
  adultAttendees: number;
  merchandiseSales: number;
  merchandiseProfitMargin: number;
  startupCosts: number;
}

export interface BreakEvenDataPoint {
  children: number;
  revenue: number;
  costs: number;
  profit: number;
}

export interface ProjectionDataPoint {
  month: string;
  monthlyProfit: number;
  cumulativeProfit: number;
}

export interface KeyMetrics {
  breakEvenPoint: number | null;
  monthlyProfit: number;
  annualProfit: number;
  profitMargin: number;
  paybackPeriod: string | null;
  returnOnInvestment: number;
}

export interface CalculationResults {
  breakEvenData: BreakEvenDataPoint[];
  projectionData: ProjectionDataPoint[];
  keyMetrics: KeyMetrics;
}
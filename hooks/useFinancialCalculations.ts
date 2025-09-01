
import { useMemo } from 'react';
import type { InputState, BreakEvenDataPoint, ProjectionDataPoint, KeyMetrics, CalculationResults } from '../types';

const MAX_CHILDREN_FOR_BREAKEVEN_CHART = 60;

export const useFinancialCalculations = (inputs: InputState): CalculationResults => {
    const { 
        monthlyFee, registrationFee, targetChildren, assistantRatio, monthlyGrowth,
        rent, utilities, insurance, otherFixedCosts,
        assistantSalary, materialsPerChild, snacksPerChild
    } = inputs;

    const breakEvenData = useMemo<BreakEvenDataPoint[]>(() => {
        const data: BreakEvenDataPoint[] = [];
        const fixedCosts = rent + utilities + insurance + otherFixedCosts;

        for (let i = 0; i <= MAX_CHILDREN_FOR_BREAKEVEN_CHART; i++) {
            const numChildren = i;
            const variableCostsPerChild = materialsPerChild + snacksPerChild;
            
            const numAssistants = assistantRatio > 0 ? Math.ceil(numChildren / assistantRatio) : 0;
            const assistantCosts = numAssistants * assistantSalary;

            const totalVariableCosts = (numChildren * variableCostsPerChild) + assistantCosts;
            const totalCosts = fixedCosts + totalVariableCosts;
            const totalRevenue = numChildren * monthlyFee;
            const profit = totalRevenue - totalCosts;
            
            data.push({
                children: numChildren,
                revenue: totalRevenue,
                costs: totalCosts,
                profit: profit
            });
        }
        return data;
    }, [rent, utilities, insurance, otherFixedCosts, materialsPerChild, snacksPerChild, assistantRatio, assistantSalary, monthlyFee]);

    const projectionData = useMemo<ProjectionDataPoint[]>(() => {
        const data: ProjectionDataPoint[] = [];
        let cumulativeProfit = 0;
        let currentChildren = targetChildren;
        const fixedCosts = rent + utilities + insurance + otherFixedCosts;

        for (let month = 1; month <= 12; month++) {
            const newChildren = month === 1 ? 0 : Math.round(currentChildren * (monthlyGrowth / 100));
            const totalChildren = month === 1 ? currentChildren : Math.round(currentChildren + newChildren);
            
            const revenueFromMonthlyFees = totalChildren * monthlyFee;
            const revenueFromRegFees = (month === 1 ? totalChildren : newChildren) * registrationFee;
            const totalRevenue = revenueFromMonthlyFees + revenueFromRegFees;

            const variableCostsPerChild = materialsPerChild + snacksPerChild;
            const numAssistants = assistantRatio > 0 ? Math.ceil(totalChildren / assistantRatio) : 0;
            const assistantCosts = numAssistants * assistantSalary;
            const totalVariableCosts = (totalChildren * variableCostsPerChild) + assistantCosts;
            const totalCosts = fixedCosts + totalVariableCosts;

            const monthlyProfit = totalRevenue - totalCosts;
            cumulativeProfit += monthlyProfit;
            
            data.push({
                month: `M${month}`,
                monthlyProfit: Math.round(monthlyProfit),
                cumulativeProfit: Math.round(cumulativeProfit),
            });
            
            currentChildren = totalChildren;
        }

        return data;
    }, [targetChildren, monthlyGrowth, monthlyFee, registrationFee, materialsPerChild, snacksPerChild, assistantRatio, assistantSalary, rent, utilities, insurance, otherFixedCosts]);

    const keyMetrics = useMemo<KeyMetrics>(() => {
        const breakEvenPoint = breakEvenData.find(d => d.profit >= 0)?.children ?? null;
        
        const targetDataPoint = breakEvenData[targetChildren] || { revenue: 0, profit: 0 };
        const monthlyProfit = targetDataPoint.profit;
        const profitMargin = targetDataPoint.revenue > 0 ? (monthlyProfit / targetDataPoint.revenue) * 100 : 0;

        const annualProfit = projectionData[11]?.cumulativeProfit ?? 0;

        return {
            breakEvenPoint,
            monthlyProfit,
            annualProfit,
            profitMargin,
        };
    }, [breakEvenData, projectionData, targetChildren]);

    return { breakEvenData, projectionData, keyMetrics };
};

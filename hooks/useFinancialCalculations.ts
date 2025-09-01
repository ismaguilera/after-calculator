import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { InputState, BreakEvenDataPoint, ProjectionDataPoint, KeyMetrics, CalculationResults } from '../types';

const MAX_CHILDREN_FOR_BREAKEVEN_CHART = 60;

export const useFinancialCalculations = (inputs: InputState): CalculationResults => {
    const { t } = useTranslation();
    const { 
        monthlyFee, registrationFee, targetChildren, assistantRatio, monthlyGrowth,
        rent, utilities, insurance, otherFixedCosts,
        assistantSalary, materialsPerChild, snacksPerChild,
        birthdaysPerMonth, revenuePerBirthday, adultWorkshopFee, adultAttendees,
        merchandiseSales, merchandiseProfitMargin, startupCosts
    } = inputs;

    const breakEvenData = useMemo<BreakEvenDataPoint[]>(() => {
        const data: BreakEvenDataPoint[] = [];
        
        const merchandiseCost = merchandiseSales * (1 - (merchandiseProfitMargin / 100));
        const fixedCosts = rent + utilities + insurance + otherFixedCosts;
        const additionalMonthlyRevenue = (birthdaysPerMonth * revenuePerBirthday) + (adultWorkshopFee * adultAttendees) + merchandiseSales;

        for (let i = 0; i <= MAX_CHILDREN_FOR_BREAKEVEN_CHART; i++) {
            const numChildren = i;
            const variableCostsPerChild = materialsPerChild + snacksPerChild;
            
            const numAssistants = assistantRatio > 0 ? Math.ceil(numChildren / assistantRatio) : 0;
            const assistantCosts = numAssistants * assistantSalary;

            const totalVariableCosts = (numChildren * variableCostsPerChild) + assistantCosts;
            const totalCosts = fixedCosts + totalVariableCosts + merchandiseCost;
            const totalRevenue = (numChildren * monthlyFee) + additionalMonthlyRevenue;
            const profit = totalRevenue - totalCosts;
            
            data.push({
                children: numChildren,
                revenue: totalRevenue,
                costs: totalCosts,
                profit: profit
            });
        }
        return data;
    }, [
        rent, utilities, insurance, otherFixedCosts, materialsPerChild, snacksPerChild, 
        assistantRatio, assistantSalary, monthlyFee,
        birthdaysPerMonth, revenuePerBirthday, adultWorkshopFee, adultAttendees,
        merchandiseSales, merchandiseProfitMargin
    ]);

    const projectionData = useMemo<ProjectionDataPoint[]>(() => {
        const data: ProjectionDataPoint[] = [];
        let cumulativeProfit = -startupCosts;
        let currentChildren = targetChildren;
        
        const merchandiseCost = merchandiseSales * (1 - (merchandiseProfitMargin / 100));
        const monthlyFixedCosts = rent + utilities + insurance + otherFixedCosts;
        const additionalMonthlyRevenue = (birthdaysPerMonth * revenuePerBirthday) + (adultWorkshopFee * adultAttendees) + merchandiseSales;

        for (let month = 1; month <= 12; month++) {
            const newChildren = month === 1 ? 0 : Math.round(currentChildren * (monthlyGrowth / 100));
            const totalChildren = month === 1 ? currentChildren : Math.round(currentChildren + newChildren);
            
            const revenueFromMonthlyFees = totalChildren * monthlyFee;
            const revenueFromRegFees = (month === 1 ? totalChildren : newChildren) * registrationFee;
            const totalRevenue = revenueFromMonthlyFees + revenueFromRegFees + additionalMonthlyRevenue;

            const variableCostsPerChild = materialsPerChild + snacksPerChild;
            const numAssistants = assistantRatio > 0 ? Math.ceil(totalChildren / assistantRatio) : 0;
            const assistantCosts = numAssistants * assistantSalary;
            const totalVariableCosts = (totalChildren * variableCostsPerChild) + assistantCosts;
            
            const totalCosts = monthlyFixedCosts + totalVariableCosts + merchandiseCost;

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
    }, [
        targetChildren, monthlyGrowth, monthlyFee, registrationFee, materialsPerChild, 
        snacksPerChild, assistantRatio, assistantSalary, rent, utilities, insurance, 
        otherFixedCosts, startupCosts,
        birthdaysPerMonth, revenuePerBirthday, adultWorkshopFee, adultAttendees,
        merchandiseSales, merchandiseProfitMargin
    ]);

    const keyMetrics = useMemo<KeyMetrics>(() => {
        const breakEvenPoint = breakEvenData.find(d => d.profit >= 0)?.children ?? null;
        
        const targetDataPoint = breakEvenData[targetChildren] || { revenue: 0, profit: 0 };
        const monthlyProfit = targetDataPoint.profit;
        const profitMargin = targetDataPoint.revenue > 0 ? (monthlyProfit / targetDataPoint.revenue) * 100 : 0;

        const annualProfit = projectionData[11] ? projectionData[11].cumulativeProfit + startupCosts : 0;
        
        const paybackMonthIndex = projectionData.findIndex(d => d.cumulativeProfit >= 0);
        const paybackPeriod = paybackMonthIndex !== -1 ? t('dashboard.metrics.paybackPeriod.value', { count: paybackMonthIndex + 1 }) : null;

        const returnOnInvestment = startupCosts > 0 ? (annualProfit / startupCosts) * 100 : 0;

        return {
            breakEvenPoint,
            monthlyProfit,
            annualProfit,
            profitMargin,
            paybackPeriod,
            returnOnInvestment,
        };
    }, [breakEvenData, projectionData, targetChildren, startupCosts, t]);

    return { breakEvenData, projectionData, keyMetrics };
};

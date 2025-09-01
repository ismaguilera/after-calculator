import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { CalculationResults } from '../types';
import MetricCard from './MetricCard';
import BreakEvenChart from './BreakEvenChart';
import ProjectionChart from './ProjectionChart';

interface DashboardProps {
  calculations: CalculationResults;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const Dashboard: React.FC<DashboardProps> = ({ calculations }) => {
  const { t } = useTranslation();
  const { keyMetrics, breakEvenData, projectionData } = calculations;
  const [activeTab, setActiveTab] = useState<'metrics' | 'graphs'>('metrics');

  const getTabClass = (tabName: 'metrics' | 'graphs') => {
    const baseClass = "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ease-in-out";
    if (activeTab === tabName) {
      return `${baseClass} border-blue-500 text-blue-600 dark:text-blue-400`;
    }
    return `${baseClass} border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-300`;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg">
      <div className="border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs" role="tablist">
          <button
            id="tab-metrics"
            role="tab"
            aria-controls="tabpanel-metrics"
            aria-selected={activeTab === 'metrics'}
            onClick={() => setActiveTab('metrics')}
            className={getTabClass('metrics')}
          >
            {t('dashboard.tabs.metrics')}
          </button>
          <button
            id="tab-graphs"
            role="tab"
            aria-controls="tabpanel-graphs"
            aria-selected={activeTab === 'graphs'}
            onClick={() => setActiveTab('graphs')}
            className={getTabClass('graphs')}
          >
            {t('dashboard.tabs.graphs')}
          </button>
        </nav>
      </div>
      
      <div className="p-4 sm:p-6">
        {activeTab === 'metrics' && (
          <div role="tabpanel" id="tabpanel-metrics" aria-labelledby="tab-metrics">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard 
                title={t('dashboard.metrics.breakEven.title')}
                value={keyMetrics.breakEvenPoint ? t('dashboard.metrics.breakEven.value', { count: keyMetrics.breakEvenPoint }) : t('common.na')}
                description={t('dashboard.metrics.breakEven.description')}
              />
              <MetricCard 
                title={t('dashboard.metrics.monthlyProfit.title')}
                value={formatCurrency(keyMetrics.monthlyProfit)}
                description={t('dashboard.metrics.monthlyProfit.description')}
                isPositive={keyMetrics.monthlyProfit >= 0}
              />
              <MetricCard 
                title={t('dashboard.metrics.annualProfit.title')}
                value={formatCurrency(keyMetrics.annualProfit)}
                description={t('dashboard.metrics.annualProfit.description')}
                isPositive={keyMetrics.annualProfit >= 0}
              />
              <MetricCard 
                title={t('dashboard.metrics.profitMargin.title')}
                value={`${keyMetrics.profitMargin.toFixed(1)}%`}
                description={t('dashboard.metrics.profitMargin.description')}
                isPositive={keyMetrics.profitMargin >= 0}
              />
               <MetricCard 
                title={t('dashboard.metrics.paybackPeriod.title')}
                value={keyMetrics.paybackPeriod ?? t('common.na')}
                description={t('dashboard.metrics.paybackPeriod.description')}
              />
              <MetricCard 
                title={t('dashboard.metrics.roi.title')}
                value={`${keyMetrics.returnOnInvestment.toFixed(1)}%`}
                description={t('dashboard.metrics.roi.description')}
                isPositive={keyMetrics.returnOnInvestment >= 0}
              />
            </div>
          </div>
        )}

        {activeTab === 'graphs' && (
          <div role="tabpanel" id="tabpanel-graphs" aria-labelledby="tab-graphs">
            <div className="grid grid-cols-1 gap-6 lg:gap-8">
              <section>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('dashboard.charts.breakEven')}</h2>
                <BreakEvenChart data={breakEvenData} breakEvenPoint={keyMetrics.breakEvenPoint} />
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('dashboard.charts.projection')}</h2>
                <ProjectionChart data={projectionData} />
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
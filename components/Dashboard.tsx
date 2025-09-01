
import React, { useState } from 'react';
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
            Key Metrics
          </button>
          <button
            id="tab-graphs"
            role="tab"
            aria-controls="tabpanel-graphs"
            aria-selected={activeTab === 'graphs'}
            onClick={() => setActiveTab('graphs')}
            className={getTabClass('graphs')}
          >
            Graphs
          </button>
        </nav>
      </div>
      
      <div className="p-4 sm:p-6">
        {activeTab === 'metrics' && (
          <div role="tabpanel" id="tabpanel-metrics" aria-labelledby="tab-metrics">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard 
                title="Break-Even Point" 
                value={keyMetrics.breakEvenPoint ? `${keyMetrics.breakEvenPoint} Children` : 'N/A'}
                description="Children needed to cover all costs."
              />
              <MetricCard 
                title="Monthly Profit/Loss" 
                value={formatCurrency(keyMetrics.monthlyProfit)}
                description="At target enrollment."
                isPositive={keyMetrics.monthlyProfit >= 0}
              />
              <MetricCard 
                title="Annual Projected Profit" 
                value={formatCurrency(keyMetrics.annualProfit)}
                description="Total profit after 12 months."
                isPositive={keyMetrics.annualProfit >= 0}
              />
              <MetricCard 
                title="Profit Margin" 
                value={`${keyMetrics.profitMargin.toFixed(1)}%`}
                description="Monthly profit as % of revenue."
                isPositive={keyMetrics.profitMargin >= 0}
              />
            </div>
          </div>
        )}

        {activeTab === 'graphs' && (
          <div role="tabpanel" id="tabpanel-graphs" aria-labelledby="tab-graphs">
            <div className="grid grid-cols-1 gap-6 lg:gap-8">
              <section>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Break-Even Analysis</h2>
                <BreakEvenChart data={breakEvenData} breakEvenPoint={keyMetrics.breakEvenPoint} />
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">12-Month Profitability Projection</h2>
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

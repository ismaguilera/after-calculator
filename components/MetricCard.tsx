
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  isPositive?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, isPositive }) => {
  const valueColorClass = isPositive === undefined 
    ? 'text-slate-900 dark:text-white'
    : isPositive
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-600 dark:text-red-400';

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg shadow">
      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{title}</h4>
      <p className={`text-2xl font-bold mt-1 ${valueColorClass}`}>{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{description}</p>
    </div>
  );
};

export default MetricCard;

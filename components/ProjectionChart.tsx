import React from 'react';
import { useTranslation } from 'react-i18next';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { ProjectionDataPoint } from '../types';

interface ProjectionChartProps {
  data: ProjectionDataPoint[];
}

const ProjectionChart: React.FC<ProjectionChartProps> = ({ data }) => {
  const { t } = useTranslation();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const monthNum = label.substring(1);
      return (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="font-bold">{t('charts.monthLabel', { monthNum })}</p>
          <p className="text-indigo-500">{`${t('charts.monthlyProfit')}: $${payload[0].value.toLocaleString()}`}</p>
          <p className="text-lime-500">{`${t('charts.cumulativeProfit')}: $${payload[1].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
          <XAxis dataKey="month" label={{ value: t('charts.month'), position: 'insideBottom', offset: -10 }}/>
          <YAxis tickFormatter={(value) => `$${Number(value / 1000).toLocaleString()}k` } label={{ value: t('charts.amount'), angle: -90, position: 'insideLeft' }}/>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />
          <Bar dataKey="monthlyProfit" name={t('charts.monthlyProfit')} fill="#6366f1" >
             {data.map((entry, index) => (
              <rect key={`bar-${index}`} {...entry} fill={entry.monthlyProfit >= 0 ? '#6366f1' : '#f43f5e'} />
            ))}
          </Bar>
          <Line type="monotone" dataKey="cumulativeProfit" name={t('charts.cumulativeProfit')} stroke="#84cc16" strokeWidth={3} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectionChart;
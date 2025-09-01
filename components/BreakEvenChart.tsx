import React from 'react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { BreakEvenDataPoint } from '../types';

interface BreakEvenChartProps {
  data: BreakEvenDataPoint[];
  breakEvenPoint: number | null;
}

const BreakEvenChart: React.FC<BreakEvenChartProps> = ({ data, breakEvenPoint }) => {
  const { t } = useTranslation();

  const profitValues = data.map(d => d.profit);
  const yMax = Math.max(...profitValues);
  const yMin = Math.min(...profitValues);
  const off = yMax > 0 && yMin < 0 ? yMax / (yMax - yMin) : (yMax > 0 ? 0 : 1);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const revenue = payload.find((p: any) => p.dataKey === 'revenue')?.value;
      const costs = payload.find((p: any) => p.dataKey === 'costs')?.value;
      const profit = payload.find((p: any) => p.dataKey === 'profit')?.value;

      return (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="font-bold">{`${label} ${t('charts.children')}`}</p>
          {revenue !== undefined && <p className="text-sky-500">{`${t('charts.revenue')}: $${revenue.toLocaleString()}`}</p>}
          {costs !== undefined && <p className="text-amber-500">{`${t('charts.costs')}: $${costs.toLocaleString()}`}</p>}
          {profit !== undefined && <p className={`${profit >=0 ? 'text-green-500' : 'text-red-500'}`}>{`${t('charts.profit')}: $${profit.toLocaleString()}`}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="rgb(34 197 94 / 0.5)" stopOpacity={1}/>
              <stop offset={off} stopColor="rgb(239 68 68 / 0.5)" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="children" label={{ value: t('charts.numChildren'), position: 'insideBottom', offset: -15 }} />
          <YAxis tickFormatter={(value) => `$${Number(value).toLocaleString()}`} label={{ value: t('charts.amount'), angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="profit" stroke="#94a3b8" fill="url(#splitColor)" name={t('charts.profit')} />
          <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} name={t('charts.revenue')} dot={false}/>
          <Line type="stepAfter" dataKey="costs" stroke="#f59e0b" strokeWidth={2} name={t('charts.costs')} dot={false}/>
          
          {breakEvenPoint !== null && (
            <ReferenceLine x={breakEvenPoint} stroke="#10b981" strokeDasharray="4 4" label={{ value: t('charts.bep', { count: breakEvenPoint }), position: 'insideTopRight', fill: '#10b981' }} />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BreakEvenChart;

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { BreakEvenDataPoint } from '../types';

interface BreakEvenChartProps {
  data: BreakEvenDataPoint[];
  breakEvenPoint: number | null;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="font-bold">{`${label} Children`}</p>
        <p className="text-sky-500">{`Revenue: $${payload[0].value.toLocaleString()}`}</p>
        <p className="text-amber-500">{`Costs: $${payload[1].value.toLocaleString()}`}</p>
        <p className="text-rose-500">{`Profit: $${payload[2].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};


const BreakEvenChart: React.FC<BreakEvenChartProps> = ({ data, breakEvenPoint }) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="children" label={{ value: 'Number of Children', position: 'insideBottom', offset: -15 }} />
          <YAxis tickFormatter={(value) => `$${Number(value).toLocaleString()}`} label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} name="Total Revenue" dot={false}/>
          <Line type="stepAfter" dataKey="costs" stroke="#f59e0b" strokeWidth={2} name="Total Costs" dot={false}/>
          <Line type="monotone" dataKey="profit" stroke="#f43f5e" strokeWidth={2} name="Profit/Loss" dot={false}/>
          {breakEvenPoint !== null && (
            <ReferenceLine x={breakEvenPoint} stroke="#10b981" strokeDasharray="4 4" label={{ value: `BEP: ${breakEvenPoint}`, position: 'insideTopRight', fill: '#10b981' }} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BreakEvenChart;

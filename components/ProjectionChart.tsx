
import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ProjectionDataPoint } from '../types';

interface ProjectionChartProps {
  data: ProjectionDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="font-bold">{`Month ${label.substring(1)}`}</p>
        <p className="text-indigo-500">{`Monthly Profit: $${payload[0].value.toLocaleString()}`}</p>
        <p className="text-lime-500">{`Cumulative Profit: $${payload[1].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const ProjectionChart: React.FC<ProjectionChartProps> = ({ data }) => {
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
          <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -10 }}/>
          <YAxis tickFormatter={(value) => `$${Number(value / 1000).toLocaleString()}k` } label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}/>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="monthlyProfit" name="Monthly Profit" fill="#6366f1" />
          <Line type="monotone" dataKey="cumulativeProfit" name="Cumulative Profit" stroke="#84cc16" strokeWidth={3} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectionChart;

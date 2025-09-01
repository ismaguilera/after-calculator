
import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange, unit = '' }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</label>
      <div className="relative">
        {unit === '$' && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">$</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 ${unit === '$' ? 'pl-7' : 'px-3'}`}
          min={0}
        />
      </div>
    </div>
  );
};

export default NumberInput;

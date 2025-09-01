import React from 'react';
import Tooltip from './Tooltip';
import InfoIcon from './icons/InfoIcon';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  tooltipText?: string;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, value, onChange, min, max, step, unit = '', tooltipText }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">{label}</label>
        {tooltipText && (
          <Tooltip text={tooltipText}>
            <InfoIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </Tooltip>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
        />
        <div className="flex-shrink-0 w-24">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full px-2 py-1 text-center bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
            min={min}
            max={max}
            step={step}
          />
        </div>
        {unit && <span className="text-sm text-slate-500 dark:text-slate-400 w-4">{unit}</span>}
      </div>
    </div>
  );
};

export default SliderInput;
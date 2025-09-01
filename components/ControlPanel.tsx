
import React from 'react';
import type { InputState } from '../types';
import SliderInput from './SliderInput';
import NumberInput from './NumberInput';

interface ControlPanelProps {
  inputs: InputState;
  setInputs: React.Dispatch<React.SetStateAction<InputState>>;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section>
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">{title}</h3>
        <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-md border border-slate-200 dark:border-slate-700/50">
            {children}
        </div>
    </section>
);


const ControlPanel: React.FC<ControlPanelProps> = ({ inputs, setInputs }) => {
  const handleInputChange = (key: keyof InputState, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-6">
        Control Panel
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {/* Column 1 */}
        <div className="space-y-8">
          <Section title="Revenue Model">
              <SliderInput label="Monthly Fee per Child" value={inputs.monthlyFee} onChange={v => handleInputChange('monthlyFee', v)} min={50} max={1000} step={10} unit="$" />
              <SliderInput label="Registration Fee" value={inputs.registrationFee} onChange={v => handleInputChange('registrationFee', v)} min={0} max={500} step={10} unit="$" />
          </Section>

          <Section title="Operational Parameters">
              <SliderInput label="Target Children" value={inputs.targetChildren} onChange={v => handleInputChange('targetChildren', v)} min={1} max={60} step={1} />
              <SliderInput label="Assistant to Child Ratio" value={inputs.assistantRatio} onChange={v => handleInputChange('assistantRatio', v)} min={1} max={20} step={1} />
              <SliderInput label="Monthly Growth" value={inputs.monthlyGrowth} onChange={v => handleInputChange('monthlyGrowth', v)} min={0} max={20} step={0.5} unit="%" />
          </Section>
        </div>

        {/* Column 2 */}
        <div className="space-y-8">
          <Section title="Monthly Fixed Costs">
              <NumberInput label="Facility Rent" value={inputs.rent} onChange={v => handleInputChange('rent', v)} unit="$" />
              <NumberInput label="Utilities" value={inputs.utilities} onChange={v => handleInputChange('utilities', v)} unit="$" />
              <NumberInput label="Insurance" value={inputs.insurance} onChange={v => handleInputChange('insurance', v)} unit="$" />
              <NumberInput label="Other Costs" value={inputs.otherFixedCosts} onChange={v => handleInputChange('otherFixedCosts', v)} unit="$" />
          </Section>
        </div>

        {/* Column 3 */}
        <div className="space-y-8">
          <Section title="Monthly Variable Costs">
              <NumberInput label="Assistant's Salary" value={inputs.assistantSalary} onChange={v => handleInputChange('assistantSalary', v)} unit="$" />
              <SliderInput label="Materials per Child" value={inputs.materialsPerChild} onChange={v => handleInputChange('materialsPerChild', v)} min={0} max={100} step={5} unit="$" />
              <SliderInput label="Snacks per Child" value={inputs.snacksPerChild} onChange={v => handleInputChange('snacksPerChild', v)} min={0} max={100} step={5} unit="$" />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;

import React from 'react';
import { useTranslation } from 'react-i18next';
import type { InputState } from '../types';
import SliderInput from './SliderInput';
import NumberInput from './NumberInput';
import RevenueIcon from './icons/RevenueIcon';
import OperationalIcon from './icons/OperationalIcon';
import FixedCostsIcon from './icons/FixedCostsIcon';
import VariableCostsIcon from './icons/VariableCostsIcon';
import StartupIcon from './icons/StartupIcon';
import ChevronUpIcon from './icons/ChevronUpIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface ControlPanelProps {
  inputs: InputState;
  setInputs: React.Dispatch<React.SetStateAction<InputState>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, icon, children }) => (
    <section>
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-slate-500 dark:text-slate-400">{icon}</span>}
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
      </div>
      <div className="space-y-5 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-md border border-slate-200 dark:border-slate-700/50">
          {children}
      </div>
    </section>
);


const ControlPanel: React.FC<ControlPanelProps> = ({ inputs, setInputs, isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  
  const handleInputChange = (key: keyof InputState, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3 mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {t('controlPanel.title')}
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label={isOpen ? t('controlPanel.togglePanelOpen') : t('controlPanel.togglePanelClosed')}
          aria-expanded={isOpen}
        >
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      </div>
      
      <div className={`transition-[max-height,opacity] duration-700 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 pt-2">
          {/* Column 1 */}
          <div className="flex flex-col gap-8">
            <Section title={t('controlPanel.revenueModel.title')} icon={<RevenueIcon />}>
              <SliderInput label={t('controlPanel.revenueModel.monthlyFee')} tooltipText={t('controlPanel.tooltips.monthlyFee')} value={inputs.monthlyFee} onChange={v => handleInputChange('monthlyFee', v)} min={50} max={1000} step={10} unit="$" />
              <SliderInput label={t('controlPanel.revenueModel.registrationFee')} tooltipText={t('controlPanel.tooltips.registrationFee')} value={inputs.registrationFee} onChange={v => handleInputChange('registrationFee', v)} min={0} max={500} step={10} unit="$" />
            </Section>

            <Section title={t('controlPanel.operationalParams.title')} icon={<OperationalIcon />}>
              <SliderInput label={t('controlPanel.operationalParams.targetChildren')} tooltipText={t('controlPanel.tooltips.targetChildren')} value={inputs.targetChildren} onChange={v => handleInputChange('targetChildren', v)} min={1} max={60} step={1} />
              <SliderInput label={t('controlPanel.operationalParams.assistantRatio')} tooltipText={t('controlPanel.tooltips.assistantRatio')} value={inputs.assistantRatio} onChange={v => handleInputChange('assistantRatio', v)} min={1} max={20} step={1} />
              <SliderInput label={t('controlPanel.operationalParams.monthlyGrowth')} tooltipText={t('controlPanel.tooltips.monthlyGrowth')} value={inputs.monthlyGrowth} onChange={v => handleInputChange('monthlyGrowth', v)} min={0} max={20} step={0.5} unit="%" />
            </Section>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8">
            <Section title={t('controlPanel.fixedCosts.title')} icon={<FixedCostsIcon />}>
              <NumberInput label={t('controlPanel.fixedCosts.rent')} tooltipText={t('controlPanel.tooltips.rent')} value={inputs.rent} onChange={v => handleInputChange('rent', v)} unit="$" />
              <NumberInput label={t('controlPanel.fixedCosts.utilities')} tooltipText={t('controlPanel.tooltips.utilities')} value={inputs.utilities} onChange={v => handleInputChange('utilities', v)} unit="$" />
              <NumberInput label={t('controlPanel.fixedCosts.insurance')} tooltipText={t('controlPanel.tooltips.insurance')} value={inputs.insurance} onChange={v => handleInputChange('insurance', v)} unit="$" />
              <NumberInput label={t('controlPanel.fixedCosts.otherCosts')} tooltipText={t('controlPanel.tooltips.otherCosts')} value={inputs.otherFixedCosts} onChange={v => handleInputChange('otherFixedCosts', v)} unit="$" />
            </Section>

            <Section title={t('controlPanel.variableCosts.title')} icon={<VariableCostsIcon />}>
              <NumberInput label={t('controlPanel.variableCosts.assistantSalary')} tooltipText={t('controlPanel.tooltips.assistantSalary')} value={inputs.assistantSalary} onChange={v => handleInputChange('assistantSalary', v)} unit="$" />
              <SliderInput label={t('controlPanel.variableCosts.materialsPerChild')} tooltipText={t('controlPanel.tooltips.materialsPerChild')} value={inputs.materialsPerChild} onChange={v => handleInputChange('materialsPerChild', v)} min={0} max={100} step={5} unit="$" />
              <SliderInput label={t('controlPanel.variableCosts.snacksPerChild')} tooltipText={t('controlPanel.tooltips.snacksPerChild')} value={inputs.snacksPerChild} onChange={v => handleInputChange('snacksPerChild', v)} min={0} max={100} step={5} unit="$" />
            </Section>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8">  
            <Section title={t('controlPanel.additionalRevenue.title')} icon={<RevenueIcon />}>
              <SliderInput label={t('controlPanel.additionalRevenue.birthdaysPerMonth')} tooltipText={t('controlPanel.tooltips.birthdaysPerMonth')} value={inputs.birthdaysPerMonth} onChange={v => handleInputChange('birthdaysPerMonth', v)} min={0} max={10} step={1} />
              <SliderInput label={t('controlPanel.additionalRevenue.revenuePerBirthday')} tooltipText={t('controlPanel.tooltips.revenuePerBirthday')} value={inputs.revenuePerBirthday} onChange={v => handleInputChange('revenuePerBirthday', v)} min={0} max={1000} step={25} unit="$" />
              <SliderInput label={t('controlPanel.additionalRevenue.adultWorkshopFee')} tooltipText={t('controlPanel.tooltips.adultWorkshopFee')} value={inputs.adultWorkshopFee} onChange={v => handleInputChange('adultWorkshopFee', v)} min={0} max={200} step={5} unit="$" />
              <SliderInput label={t('controlPanel.additionalRevenue.adultsPerWorkshop')} tooltipText={t('controlPanel.tooltips.adultsPerWorkshop')} value={inputs.adultAttendees} onChange={v => handleInputChange('adultAttendees', v)} min={0} max={50} step={1} />
              <NumberInput label={t('controlPanel.additionalRevenue.merchandiseSales')} tooltipText={t('controlPanel.tooltips.merchandiseSales')} value={inputs.merchandiseSales} onChange={v => handleInputChange('merchandiseSales', v)} unit="$" />
              <SliderInput label={t('controlPanel.additionalRevenue.merchandiseProfitMargin')} tooltipText={t('controlPanel.tooltips.merchandiseProfitMargin')} value={inputs.merchandiseProfitMargin} onChange={v => handleInputChange('merchandiseProfitMargin', v)} min={0} max={100} step={1} unit="%" />
            </Section>
             <Section title={t('controlPanel.startupCosts.title')} icon={<StartupIcon />}>
              <NumberInput label={t('controlPanel.startupCosts.total')} tooltipText={t('controlPanel.tooltips.startupCosts')} value={inputs.startupCosts} onChange={v => handleInputChange('startupCosts', v)} unit="$" />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
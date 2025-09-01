
import React, { useState } from 'react';
import type { InputState } from './types';
import ControlPanel from './components/ControlPanel';
import Dashboard from './components/Dashboard';
import { useFinancialCalculations } from './hooks/useFinancialCalculations';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<InputState>({
    monthlyFee: 350,
    registrationFee: 100,
    targetChildren: 25,
    assistantRatio: 10,
    monthlyGrowth: 5,
    rent: 2000,
    utilities: 400,
    insurance: 150,
    otherFixedCosts: 250,
    assistantSalary: 2500,
    materialsPerChild: 30,
    snacksPerChild: 40,
  });

  const calculations = useFinancialCalculations(inputs);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <header className="bg-white dark:bg-slate-800 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            After-School Care Financial Modeler
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
            Interactively model the financial viability of your program.
          </p>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div>
            <ControlPanel inputs={inputs} setInputs={setInputs} />
          </div>
          <div>
            <Dashboard calculations={calculations} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

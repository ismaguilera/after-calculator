
import React, { useState } from 'react';
import type { InputState } from './types';
import ControlPanel from './components/ControlPanel';
import Dashboard from './components/Dashboard';
import { useFinancialCalculations } from './hooks/useFinancialCalculations';
import Logo from './components/icons/Logo';
import ThemeToggle from './components/ThemeToggle';
import GitHubIcon from './components/icons/GitHubIcon';
import Footer from './components/Footer';


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
    <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3">
                <div className="flex items-center gap-3">
                    <Logo />
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            After-School Program Modeler
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            Financial viability calculator
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <a 
                        href="https://github.com/google/aistudio"
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="View source on GitHub"
                        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
                    >
                        <GitHubIcon />
                    </a>
                    <ThemeToggle />
                </div>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
        <div className="flex flex-col gap-6 lg:gap-8">
            <ControlPanel inputs={inputs} setInputs={setInputs} />
            <Dashboard calculations={calculations} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;

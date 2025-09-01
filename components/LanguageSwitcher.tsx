import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: 'en' | 'es') => {
        i18n.changeLanguage(lng);
    };

    const getButtonClass = (lng: 'en' | 'es') => {
        const base = "px-3 py-1 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900";
        if (i18n.language === lng) {
            return `${base} bg-blue-600 text-white`;
        }
        return `${base} bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600`;
    };

    return (
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button onClick={() => changeLanguage('es')} className={getButtonClass('es')}>
                ES
            </button>
            <button onClick={() => changeLanguage('en')} className={getButtonClass('en')}>
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;

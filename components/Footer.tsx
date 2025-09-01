import React from 'react';
import { useTranslation } from 'react-i18next';
import GitHubIcon from './icons/GitHubIcon';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-slate-800 shadow-inner mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {t('footer.text')}
        </p>
        <a 
          href="https://github.com/google/aistudio"
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="View source on GitHub"
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors duration-200"
        >
          <GitHubIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-auto" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="currentColor" className="text-blue-600 dark:text-blue-500"/>
    <path d="M12 28V15C12 13.3431 13.3431 12 15 12H25C26.6569 12 28 13.3431 28 15V28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 20H24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 16V24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 28H28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Logo;

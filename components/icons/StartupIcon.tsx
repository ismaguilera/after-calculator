import React from 'react';

const StartupIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.037-.502.068-.752.098m.752-.098a2.25 2.25 0 0 0-2.25-2.25M9.75 3.104c.251.037.502.068.752.098m-1.504-2.352a2.25 2.25 0 0 1 2.25-2.25M14.25 14.5l-2.25 2.25a2.25 2.25 0 0 0 0 3.182l2.25 2.25a2.25 2.25 0 0 0 3.182 0l2.25-2.25a2.25 2.25 0 0 0 0-3.182l-2.25-2.25a2.25 2.25 0 0 0-3.182 0ZM14.25 14.5 12 12.25" />
    </svg>
);

export default StartupIcon;

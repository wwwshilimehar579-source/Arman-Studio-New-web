import React from 'react';
import logoImage from '../assets/images/arman_studio_logo_1787187422494.jpg';

interface ArmanLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const ArmanLogo: React.FC<ArmanLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`}>
      {/* Golden Calligraphy Logo Artwork matching the user uploaded branding */}
      <div className="w-full h-full rounded-full overflow-hidden border border-[#c5a059]/40 bg-[#080808] p-0.5 shadow-[0_0_15px_rgba(197,160,89,0.25)] flex items-center justify-center group-hover:border-[#c5a059] transition-all duration-300">
        <img
          src={logoImage}
          alt="Arman Studio Calligraphy Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-full filter brightness-110 contrast-105"
        />
      </div>
    </div>
  );
};

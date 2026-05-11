import React from 'react';
import Link from 'next/link';

interface ButtonV2Props {
  children: React.ReactNode;
  href?: string;
  variant?: 'orange' | 'outline' | 'sky';
  className?: string;
  pulse?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  disabled?: boolean;
}

const ButtonV2: React.FC<ButtonV2Props> = ({ 
  children, 
  href, 
  variant = 'orange', 
  className = '', 
  pulse = false,
  onClick,
  type = 'button',
  style,
  disabled
}) => {
  const variantClass = variant === 'orange' ? 'btn-orange' : variant === 'sky' ? 'btn-sky' : 'btn-outline';
  const baseClasses = `btn-v2 ${variantClass} ${pulse ? 'btn-pulse' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} onClick={onClick} style={style} disabled={disabled}>
      {children}
    </button>
  );
};


export default ButtonV2;

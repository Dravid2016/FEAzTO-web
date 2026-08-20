import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ink' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const variantClass = `fz-btn-${variant}`;
  const sizeClass = size === 'sm' ? 'fz-btn-sm' : size === 'lg' ? 'fz-btn-lg' : '';
  const widthStyle = fullWidth ? { width: '100%' } : {};

  return (
    <button
      className={`fz-btn ${variantClass} ${sizeClass} ${className}`}
      style={widthStyle}
      {...props}
    >
      {children}
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
    </button>
  );
};

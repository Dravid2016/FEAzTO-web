import React from 'react';

interface BadgeProps {
  variant?: 'yellow' | 'green' | 'ink';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'yellow', children, icon }) => {
  return (
    <span className={`fz-badge fz-badge-${variant}`}>
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {children}
    </span>
  );
};

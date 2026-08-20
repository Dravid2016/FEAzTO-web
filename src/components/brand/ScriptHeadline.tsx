import React from 'react';

interface ScriptHeadlineProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const ScriptHeadline: React.FC<ScriptHeadlineProps> = ({
  children,
  size = 'md',
  color = 'var(--fz-ink)'
}) => {
  const fontSize = size === 'sm' ? '1.5rem' : size === 'lg' ? '2.8rem' : '2.1rem';

  return (
    <span
      className="font-script"
      style={{
        fontSize,
        color,
        display: 'inline-block',
        lineHeight: 1.2,
        transform: 'rotate(-2deg)'
      }}
    >
      {children}
    </span>
  );
};

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--fz-ink)' }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {leftIcon && (
          <div
            style={{
              position: 'absolute',
              left: '1rem',
              color: 'var(--fz-ink-subtle)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`fz-input ${className}`}
          style={{
            paddingLeft: leftIcon ? '2.75rem' : '1.25rem',
            borderColor: error ? 'var(--fz-red)' : undefined
          }}
          {...props}
        />
      </div>
      {error && (
        <span style={{ fontSize: '0.75rem', color: 'var(--fz-red)', fontWeight: '600' }}>
          {error}
        </span>
      )}
    </div>
  );
};

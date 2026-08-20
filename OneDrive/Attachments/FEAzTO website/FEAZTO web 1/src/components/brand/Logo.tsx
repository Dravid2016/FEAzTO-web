import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = false, inverted = false }) => {
  const baseSize   = size === 'sm' ? 1.5  : size === 'lg' ? 2.6  : 2.0;  // rem
  const zSize      = baseSize * 1.18;  // Z is slightly larger than the rest
  const strokeColor = inverted ? '#FFFFFF' : '#0D0D0D';
  const strokeWidth = size === 'lg' ? '3px' : size === 'sm' ? '2px' : '2.5px';

  const sharedStyle: React.CSSProperties = {
    fontFamily: "'Bangers', Impact, sans-serif",
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    lineHeight: 1,
    color: inverted ? '#FFFFFF' : '#FFFFFF',
    WebkitTextStroke: `${strokeWidth} ${strokeColor}`,
    paintOrder: 'stroke fill',
    display: 'inline-block',
  };

  return (
    <Link
      to="/"
      style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
        {/* FEA — white fill, black outline */}
        <span style={{ ...sharedStyle, fontSize: `${baseSize}rem` }}>
          FEA
        </span>

        {/* Z — solid gold, no outline, slightly larger */}
        <span style={{
          fontFamily: "'Bangers', Impact, sans-serif",
          fontSize: `${zSize}rem`,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          lineHeight: 1,
          color: '#FFB800',
          WebkitTextStroke: '0',
          display: 'inline-block',
          position: 'relative',
          top: '1px',
        }}>
          Z
        </span>

        {/* TO — white fill, black outline, slightly smaller caps */}
        <span style={{ ...sharedStyle, fontSize: `${baseSize * 0.88}rem` }}>
          TO
        </span>
      </div>

      {showSubtitle && (
        <span style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: '0.6rem',
          fontWeight: 800,
          color: inverted ? 'rgba(255,255,255,0.45)' : '#78716C',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginTop: '2px',
        }}>
          Regional Home Kitchens
        </span>
      )}
    </Link>
  );
};

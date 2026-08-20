import React from 'react';
import { ScriptHeadline } from './ScriptHeadline';

interface GrandmotherHeroProps {
  variant?: 'hero' | 'cooking' | 'compact';
  caption?: string;
}

export const GrandmotherHero: React.FC<GrandmotherHeroProps> = ({
  variant = 'hero',
  caption = 'Ghar ka swaad, Dil se!'
}) => {
  const imgSrc = variant === 'cooking' ? '/assets/gm_red_blouse.png' : '/assets/gm_green_saree.png';

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: '0 auto'
      }}
    >
      {caption && (
        <div
          style={{
            backgroundColor: '#FFFDF8',
            border: '1px solid #FFB800',
            borderRadius: '9999px',
            padding: '0.35rem 1rem',
            marginBottom: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
        >
          <ScriptHeadline size="sm" color="#1C1917">
            {caption}
          </ScriptHeadline>
        </div>
      )}

      <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
        <img
          src={imgSrc}
          alt="FEAZTO Grandmother Hero Character"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: variant === 'compact' ? '220px' : '300px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 20px rgba(28,25,23,0.08))'
          }}
        />
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Region } from '../../types';

interface RegionCardProps {
  region: Region;
}

export const RegionCard: React.FC<RegionCardProps> = ({ region }) => {
  return (
    <Link
      to={`/regions/${region.id}`}
      className="fz-card"
      style={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        minHeight: '260px'
      }}
    >
      <div style={{ position: 'relative', height: '180px', width: '100%', overflow: 'hidden' }}>
        <img
          src={region.image}
          alt={region.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--fz-transition-normal)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(28, 25, 23, 0.85) 0%, transparent 70%)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            color: 'white'
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--fz-yellow)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {region.tagline}
          </div>
          <h3 className="font-display" style={{ fontSize: '1.6rem', color: 'white', marginTop: '2px' }}>
            {region.name}
          </h3>
        </div>
      </div>

      <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', backgroundColor: 'var(--fz-card-bg)' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--fz-ink-muted)' }}>
          {region.dishCount} Home Dishes
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--fz-ink)', fontWeight: '800', fontSize: '0.85rem' }}>
          <span>Explore</span>
          <ArrowRight size={14} color="var(--fz-yellow)" />
        </div>
      </div>
    </Link>
  );
};

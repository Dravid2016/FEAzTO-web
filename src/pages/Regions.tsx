import React from 'react';
import { RegionCard } from '../components/discovery/RegionCard';
import { SEED_REGIONS } from '../data/seedData';

export const Regions: React.FC = () => {
  return (
    <div className="fz-section">
      <div className="fz-container">
        <h1 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          REGIONAL CULINARY HERITAGE
        </h1>
        <p style={{ color: 'var(--fz-ink-muted)', marginBottom: '2.5rem' }}>
          Every region has a story. Explore authentic food traditions across India.
        </p>

        <div className="fz-grid-3">
          {SEED_REGIONS.map((r) => (
            <RegionCard key={r.id} region={r} />
          ))}
        </div>
      </div>
    </div>
  );
};

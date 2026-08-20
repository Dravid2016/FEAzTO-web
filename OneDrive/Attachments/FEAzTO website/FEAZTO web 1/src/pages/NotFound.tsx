import React from 'react';
import { Link } from 'react-router-dom';
import { GrandmotherHero } from '../components/brand/GrandmotherHero';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="fz-section">
      <div className="fz-container" style={{ maxWidth: '640px', textAlign: 'center' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <GrandmotherHero variant="compact" caption="Oops! Dish not found in this kitchen." />
        </div>
        <h1 className="font-display" style={{ fontSize: '3rem', marginTop: '1rem', marginBottom: '0.5rem' }}>
          404 — PAGE NOT FOUND
        </h1>
        <p style={{ color: 'var(--fz-ink-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>
          The page or regional recipe you are looking for has been moved or cooked up elsewhere.
        </p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="lg">
            Back to FEAZTO
          </Button>
        </Link>
      </div>
    </div>
  );
};

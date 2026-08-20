import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, Calendar } from 'lucide-react';
import { SEED_COOKS } from '../data/seedData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Cooks: React.FC = () => {
  return (
    <div className="fz-section">
      <div className="fz-container">
        <h1 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          VERIFIED MASTER HOME COOKS
        </h1>
        <p style={{ color: 'var(--fz-ink-muted)', marginBottom: '2.5rem' }}>
          Discover passionate home cooks preserving traditional regional heritage recipes.
        </p>

        <div className="fz-grid-3">
          {SEED_COOKS.map((cook) => (
            <div key={cook.id} className="fz-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <img
                src={cook.avatar}
                alt={cook.name}
                style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--fz-yellow)', margin: '0 auto 1rem auto' }}
              />
              <Badge variant="yellow" icon={<Award size={12} />}>{cook.title}</Badge>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '0.75rem' }}>{cook.name}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--fz-ink-muted)', marginBottom: '0.75rem' }}>
                {cook.city}, {cook.state} &bull; {cook.yearsExperience} yrs culinary experience
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontWeight: '800', marginBottom: '1rem' }}>
                <Star size={14} fill="var(--fz-yellow)" color="var(--fz-yellow)" /> {cook.rating} ({cook.reviewCount} reviews)
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {cook.specialities.slice(0, 3).map((spec, i) => (
                  <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', backgroundColor: 'var(--fz-canvas-alt)', border: '1px solid var(--fz-border)', borderRadius: 'var(--fz-radius-full)' }}>
                    {spec}
                  </span>
                ))}
              </div>

              <Link to="/book-a-cook" style={{ textDecoration: 'none' }}>
                <Button variant="primary" fullWidth size="sm" icon={<Calendar size={14} />}>
                  Book Cook (₹{cook.hireRatePerEvent}/event)
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

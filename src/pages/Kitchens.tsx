import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck } from 'lucide-react';
import { SEED_KITCHENS } from '../data/seedData';
import { Button } from '../components/ui/Button';

export const Kitchens: React.FC = () => {
  return (
    <div className="fz-section">
      <div className="fz-container">
        <h1 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          HOME KITCHENS DIRECTORY
        </h1>
        <p style={{ color: 'var(--fz-ink-muted)', marginBottom: '2.5rem' }}>
          Meet the verified home kitchens and cooks preparing authentic regional meals with handed-down recipes.
        </p>

        <div className="fz-grid-3">
          {SEED_KITCHENS.map((k) => (
            <div key={k.id} className="fz-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '180px' }}>
                <img src={k.coverImage} alt={k.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {k.hygieneCertified && (
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', backgroundColor: 'var(--fz-green-light)', color: 'var(--fz-green)', padding: '0.25rem 0.6rem', borderRadius: 'var(--fz-radius-full)', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <ShieldCheck size={14} /> Hygiene Certified
                  </div>
                )}
              </div>

              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <img src={k.cookAvatar} alt={k.cookName} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--fz-yellow)' }} />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--fz-ink)' }}>{k.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--fz-ink-muted)' }}>By {k.cookName} ({k.cookTitle})</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--fz-ink-subtle)', marginBottom: '0.75rem' }}>
                  <MapPin size={14} color="var(--fz-yellow)" /> {k.city}, {k.state}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--fz-ink-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  "{k.bio}"
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--fz-border-warm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: '800', fontSize: '0.9rem' }}>
                    <Star size={14} fill="var(--fz-yellow)" color="var(--fz-yellow)" /> {k.rating} ({k.reviewCount})
                  </div>
                  <Link to={`/kitchens/${k.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="secondary" size="sm">View Menu</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

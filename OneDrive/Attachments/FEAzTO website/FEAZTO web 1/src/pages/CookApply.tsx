import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const CookApply: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [cuisine, setCuisine] = useState('');

  if (submitted) {
    return (
      <div className="fz-section">
        <div className="fz-container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div className="fz-card" style={{ padding: '3rem 2rem', border: '2px solid var(--fz-green)' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'var(--fz-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <CheckCircle size={40} color="var(--fz-green)" />
            </div>
            <h1 className="font-display" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
              APPLICATION RECEIVED!
            </h1>
            <p style={{ color: 'var(--fz-ink-muted)', marginBottom: '1.75rem' }}>
              Thank you {fullName}! Our regional kitchen onboarding team will visit your home kitchen in {city} for hygiene inspection within 48 hours.
            </p>
            <Button variant="primary" onClick={() => setSubmitted(false)}>
              Back to FEAZTO
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fz-section">
      <div className="fz-container" style={{ maxWidth: '680px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--fz-yellow)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            HOME COOK ONBOARDING
          </span>
          <h1 className="font-display" style={{ fontSize: '2.8rem', marginTop: '0.2rem' }}>
            BECOME A FEAZTO COOK
          </h1>
          <p style={{ color: 'var(--fz-ink-muted)' }}>
            Turn your passion for regional home cooking into a thriving home business.
          </p>
        </div>

        <form className="fz-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Anitha Paati" required />
          <Input label="City & Locality" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Coimbatore, RS Puram" required />
          <Input label="Specialist Cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder="e.g. Chettinad, Malabar, Punjabi Tiffin" required />
          <Input label="Years of Cooking Experience" type="number" placeholder="e.g. 15" required />
          
          <Button variant="primary" size="lg" type="submit" style={{ marginTop: '1rem' }}>
            Submit Cook Application
          </Button>
        </form>
      </div>
    </div>
  );
};

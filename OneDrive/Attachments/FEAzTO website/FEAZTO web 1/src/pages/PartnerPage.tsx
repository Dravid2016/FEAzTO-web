import React from 'react';
import { Link } from 'react-router-dom';
import { Store, TrendingUp, ShieldCheck, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const PartnerPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', padding: '3rem 1.5rem 5rem 1.5rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#FFB800', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          PARTNER NETWORK
        </span>
        <h1 className="font-display" style={{ fontSize: '3rem', marginTop: '0.2rem', marginBottom: '1rem' }}>
          PARTNER WITH FEAZTO
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#57534E', maxWidth: '640px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
          Empowering home kitchens, regional culinary heritage, and local food suppliers to grow together across India.
        </p>

        <div className="fz-grid-3" style={{ marginBottom: '3rem', textAlign: 'left' }}>
          {[
            { title: 'Home Kitchen Onboarding', desc: 'Monetize traditional family recipes right from your home hearth.', icon: <Store size={24} color="#FFB800" /> },
            { title: 'Hygiene & Safety Guidance', desc: 'FSSAI compliance support, safety certification & kitchen audits.', icon: <ShieldCheck size={24} color="#FFB800" /> },
            { title: 'Direct Logistics & Tech', desc: 'Seamless order dispatching, packaging assistance & doorstep delivery.', icon: <TrendingUp size={24} color="#FFB800" /> }
          ].map((item, idx) => (
            <div key={idx} className="fz-card" style={{ padding: '1.75rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FFF8E5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.5rem', color: '#1C1917' }}>{item.title}</h3>
              <p style={{ fontSize: '0.88rem', color: '#78716C', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <Link to="/cook/apply" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="lg">
            Apply to Partner With FEAZTO &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
};

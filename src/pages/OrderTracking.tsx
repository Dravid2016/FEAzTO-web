import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, Phone, MapPin, Truck, Utensils } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GrandmotherHero } from '../components/brand/GrandmotherHero';

export const OrderTracking: React.FC = () => {
  const { orderId } = useParams();
  const displayId = orderId || 'ORD-89241';

  const steps = [
    { label: 'Order Placed', time: '07:30 PM', done: true },
    { label: 'Kitchen Preparing', time: '07:35 PM', done: true },
    { label: 'Packaged Fresh', time: '07:50 PM', done: true },
    { label: 'Out For Delivery', time: '08:00 PM', done: false },
    { label: 'Arriving', time: '08:15 PM', done: false }
  ];

  return (
    <div className="fz-section">
      <div className="fz-container" style={{ maxWidth: '800px' }}>
        <div className="fz-card" style={{ padding: '2.5rem', border: '2px solid var(--fz-yellow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--fz-border-warm)', paddingBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--fz-yellow)', textTransform: 'uppercase' }}>
                LIVE ORDER STATUS
              </span>
              <h1 className="font-display" style={{ fontSize: '2rem', marginTop: '0.2rem' }}>
                {displayId}
              </h1>
            </div>
            <div style={{ backgroundColor: 'var(--fz-yellow-light)', color: '#92400E', padding: '0.4rem 0.9rem', borderRadius: 'var(--fz-radius-full)', fontWeight: '800', fontSize: '0.85rem' }}>
              Est. Arrival: 20 Mins
            </div>
          </div>

          {/* Animated Stepper */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
            {steps.map((st, i) => (
              <div key={i} style={{ textAlign: 'center', flex: 1, position: 'relative' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: st.done ? 'var(--fz-yellow)' : 'var(--fz-border-warm)',
                    color: st.done ? 'var(--fz-ink)' : 'var(--fz-ink-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.5rem auto',
                    fontWeight: '900',
                    fontSize: '0.85rem'
                  }}
                >
                  {st.done ? <CheckCircle2 size={20} /> : i + 1}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: st.done ? 'var(--fz-ink)' : 'var(--fz-ink-subtle)' }}>
                  {st.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--fz-ink-light)' }}>{st.time}</div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: 'var(--fz-canvas-alt)', padding: '1.25rem', borderRadius: 'var(--fz-radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--fz-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={20} color="var(--fz-ink)" />
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>Ramesh K. (Delivery Partner)</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--fz-ink-muted)' }}>On FEAZTO Scooter &bull; TVS Jupiter</div>
              </div>
            </div>
            <Button variant="secondary" size="sm" icon={<Phone size={14} />}>
              Call Partner
            </Button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/orders" style={{ textDecoration: 'none' }}>
              <Button variant="primary">View My Orders</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

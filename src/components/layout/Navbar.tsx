import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, ChevronDown, X } from 'lucide-react';
import { Logo } from '../brand/Logo';

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount = 0, onCartClick }) => {
  const [city, setCity]         = useState('Bengaluru');
  const [cityOpen, setCityOpen] = useState(false);
  const location                = useLocation();

  const links = [
    { label: 'Explore Food', path: '/food' },
    { label: 'Kitchens',     path: '/kitchens' },
    { label: 'Book a Cook',  path: '/book-a-cook' },
    { label: 'Regions',      path: '/regions' },
    { label: 'Cooks',        path: '/cooks' },
  ];

  const cities = ['Bengaluru', 'Chennai', 'Coimbatore', 'Kochi', 'Hyderabad', 'Mumbai', 'Delhi'];

  return (
    <>
      {/* ── Sticky header — transparent over hero ── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        padding: '0.85rem 1.5rem',
        background: 'transparent',
      }}>
        <div style={{
          maxWidth: '1340px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>

          {/* LEFT — Logo in glass pill */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '16px',
            padding: '0.5rem 1rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            flexShrink: 0,
          }}>
            <Logo size="md" />
          </div>

          {/* CENTER — Nav links in glass pill (Plenti style) */}
          <nav style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: '9999px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            padding: '0.4rem 0.6rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.15rem',
          }}>
            {links.map(l => {
              const active = location.pathname === l.path;
              return (
                <Link
                  key={l.path}
                  to={l.path}
                  style={{
                    textDecoration: 'none',
                    padding: '0.5rem 1.1rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: active ? 800 : 600,
                    color: active ? '#0D0D0D' : '#57534E',
                    background: active ? '#FFB800' : 'transparent',
                    transition: 'all 150ms',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,184,0,0.12)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT — City + Sign in in glass pill */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '9999px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            padding: '0.4rem 0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexShrink: 0,
          }}>

            {/* City */}
            <button
              onClick={() => setCityOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '9999px',
                fontSize: '0.82rem', fontWeight: 700,
                color: '#0D0D0D', cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              }}
            >
              <MapPin size={13} color="#FFB800" strokeWidth={2.5} />
              {city}
              <ChevronDown size={12} color="#78716C" />
            </button>

            {/* Sign in */}
            <Link
              to="/account"
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '0.5rem 1.3rem',
                background: '#0D0D0D',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontSize: '0.85rem', fontWeight: 800,
                textDecoration: 'none',
                transition: 'all 160ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FFB800'; e.currentTarget.style.color = '#0D0D0D'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0D0D0D'; e.currentTarget.style.color = '#FFFFFF'; }}
            >
              Sign in
            </Link>
          </div>

        </div>
      </header>

      {/* City modal */}
      {cityOpen && (
        <div
          onClick={() => setCityOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#FFFFFF', borderRadius: '24px',
              padding: '2rem', width: '340px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
              border: '1px solid #E5E5E5',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0D0D0D' }}>Choose your city</h3>
              <button onClick={() => setCityOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#78716C" />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {cities.map(c => (
                <button
                  key={c}
                  onClick={() => { setCity(c); setCityOpen(false); }}
                  style={{
                    padding: '0.85rem 1.1rem', textAlign: 'left',
                    background: city === c ? '#FFF8E8' : '#F9F6F0',
                    border: city === c ? '1.5px solid #FFB800' : '1.5px solid #E5E5E5',
                    borderRadius: '12px',
                    fontWeight: 700, fontSize: '0.9rem',
                    color: city === c ? '#7A4800' : '#0D0D0D',
                    cursor: 'pointer', transition: 'all 150ms',
                  }}
                >{c}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

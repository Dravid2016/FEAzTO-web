import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import { Logo } from '../brand/Logo';

export const Footer: React.FC = () => {
  const cols = [
    {
      heading: 'Discover',
      links: [
        { label: 'All Regions',    to: '/regions' },
        { label: 'Popular Dishes', to: '/food' },
        { label: 'Home Kitchens',  to: '/kitchens' },
        { label: 'Browse Cooks',   to: '/cooks' },
      ],
    },
    {
      heading: 'For Cooks',
      links: [
        { label: 'Become a Cook',  to: '/cook/apply' },
        { label: 'Partner With Us',to: '/partner' },
        { label: 'Book a Cook',    to: '/book-a-cook' },
        { label: 'How It Works',   to: '/' },
      ],
    },
    {
      heading: 'Support',
      links: [
        { label: 'My Account',     to: '/account' },
        { label: 'Track Orders',   to: '/orders' },
        { label: 'Privacy Policy', to: '/' },
        { label: 'Terms',          to: '/' },
      ],
    },
  ];

  const socials = [
    { icon: <Instagram size={17} />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <Linkedin size={17} />,  href: 'https://linkedin.com',  label: 'LinkedIn' },
    { icon: <Youtube size={17} />,   href: 'https://youtube.com',   label: 'YouTube' },
    { icon: <Twitter size={17} />,   href: 'https://twitter.com',   label: 'Twitter' },
  ];

  return (
    <footer style={{
      background: '#0D0D0D',
      borderTop: '3px solid #FFB800',
      color: '#FFFFFF',
    }}>
      <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '5rem 1.5rem 3rem' }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr repeat(3, 1fr)', gap: '4rem', marginBottom: '4rem' }}>

          {/* Brand column */}
          <div>
            <Logo size="lg" />
            <p style={{
              marginTop: '1.5rem', fontSize: '0.92rem',
              color: 'rgba(255,255,255,0.45)', lineHeight: 1.8,
              maxWidth: '280px', fontWeight: 500,
            }}>
              India's regional food discovery &amp; home-kitchen marketplace.
              Connecting heritage cooks, authentic recipes, and food lovers.
            </p>
            <div style={{
              fontFamily: 'var(--fz-font-script)',
              fontSize: '1.5rem', color: '#FFB800',
              marginTop: '1.5rem', fontWeight: 700, lineHeight: 1.2,
            }}>
              "Ghar ka swaad, Dil se!"
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '2rem' }}>
              {socials.map(s => (
                <a
                  key={s.label} href={s.href} aria-label={s.label}
                  style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: '#FFFFFF', border: '1px solid #E5E5E5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#78716C', textDecoration: 'none', transition: 'all 150ms',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#FFB800';
                    e.currentTarget.style.color = '#0D0D0D';
                    e.currentTarget.style.borderColor = '#FFB800';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.color = '#78716C';
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <h4 style={{
                fontSize: '0.7rem', fontWeight: 800,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#A8A29E', marginBottom: '1.5rem',
              }}>{col.heading}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {col.links.map(l => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      style={{
                        textDecoration: 'none', fontSize: '0.9rem',
                        fontWeight: 600, color: '#57534E', transition: 'color 150ms',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#FFB800'}
                      onMouseLeave={e => e.currentTarget.style.color = '#57534E'}
                    >{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #E5E5E5',
          paddingTop: '2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <span style={{ fontSize: '0.8rem', color: '#A8A29E', fontWeight: 600 }}>
            © 2025 FEAZTO. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Contact'].map(t => (
              <Link
                key={t} to="/"
                style={{
                  fontSize: '0.8rem', fontWeight: 600,
                  color: '#A8A29E', textDecoration: 'none', transition: 'color 150ms',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#0D0D0D'}
                onMouseLeave={e => e.currentTarget.style.color = '#A8A29E'}
              >{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

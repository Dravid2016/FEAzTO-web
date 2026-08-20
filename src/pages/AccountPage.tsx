import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Calendar, Heart, CreditCard, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEED_KITCHENS } from '../data/seedData';

export const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* User Profile Banner Header */}
        <div className="fz-card" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#FFB800', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: '900', color: '#1C1917' }}>
            PS
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#1C1917', marginBottom: '0.2rem' }}>
              Priya Sharma
            </h1>
            <div style={{ fontSize: '0.88rem', color: '#78716C', display: 'flex', gap: '1rem' }}>
              <span>+91 98765 43210</span>
              <span>&bull;</span>
              <span>priya.sharma@example.com</span>
              <span>&bull;</span>
              <span><MapPin size={13} color="#FFB800" style={{ display: 'inline' }} /> Bengaluru, KA</span>
            </div>
          </div>

          <Link to="/admin" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="sm">
              Admin Console
            </Button>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #E7E5E4', paddingBottom: '0.5rem' }}>
          {[
            { id: 'bookings', label: 'My Event Bookings', icon: <Calendar size={16} /> },
            { id: 'kitchens', label: 'Saved Kitchens', icon: <Heart size={16} /> },
            { id: 'addresses', label: 'Delivery Addresses', icon: <MapPin size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.2rem',
                borderRadius: '9999px',
                border: activeTab === tab.id ? '2px solid #FFB800' : '1px solid transparent',
                backgroundColor: activeTab === tab.id ? '#FFB800' : 'transparent',
                fontWeight: '800',
                fontSize: '0.85rem',
                cursor: 'pointer',
                color: '#1C1917'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'bookings' && (
          <div className="fz-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '1rem' }}>Active Cook Bookings</h3>
            <div style={{ padding: '1.25rem', backgroundColor: '#FFF8E5', borderRadius: '16px', border: '1px solid #FFB800', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '900', color: '#92400E' }}>CONFIRMED BOOKING &bull; BKG-10492</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', marginTop: '0.2rem' }}>Birthday Party — South Indian Thali</h4>
                <div style={{ fontSize: '0.85rem', color: '#57534E', marginTop: '0.2rem' }}>
                  Date: 15 Sep 2025 &bull; 25 Guests &bull; Master Cook: Anitha Paati
                </div>
              </div>
              <Button variant="primary" size="sm">Manage Booking</Button>
            </div>
          </div>
        )}

        {activeTab === 'kitchens' && (
          <div className="fz-grid-2">
            {SEED_KITCHENS.map((k) => (
              <div key={k.id} className="fz-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img src={k.coverImage} alt={k.name} style={{ width: '80px', height: '80px', borderRadius: '14px', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '900' }}>{k.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: '#78716C' }}>By {k.cookName} &bull; {k.city}</div>
                  <Link to={`/kitchens/${k.id}`} style={{ textDecoration: 'none', fontSize: '0.8rem', fontWeight: '800', color: '#1C1917', marginTop: '0.4rem', display: 'inline-block' }}>
                    View Menu &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="fz-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '1rem' }}>Saved Delivery Address</h3>
            <div style={{ padding: '1rem', border: '1px solid #E7E5E4', borderRadius: '12px' }}>
              <div style={{ fontWeight: '900' }}>Home</div>
              <div style={{ fontSize: '0.88rem', color: '#57534E', marginTop: '0.2rem' }}>
                102, Palm Grove Apartments, 12th Main, Indiranagar, Bengaluru, KA - 560038
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

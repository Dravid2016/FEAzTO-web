import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Clock, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const OrdersPage: React.FC = () => {
  const activeOrders = [
    {
      id: 'ORD-89241',
      kitchen: "Mariyam's Hearth",
      items: 'Malabar Fish Curry (1x), Kerala Parotta (2x)',
      total: 380,
      status: 'Out For Delivery',
      placedAt: 'Today, 07:30 PM',
      eta: '20 mins'
    }
  ];

  const pastOrders = [
    {
      id: 'ORD-84120',
      kitchen: "Anitha Paati's Home Kitchen",
      items: 'Crispy Masala Dosa (2x), Filter Coffee (2x)',
      total: 320,
      status: 'Delivered',
      placedAt: '12 Aug 2025'
    },
    {
      id: 'ORD-79105',
      kitchen: "Gurpreet's Amritsari Rasoi",
      items: 'Amritsari Chole Bhature (2x), Lassi (2x)',
      total: 440,
      status: 'Delivered',
      placedAt: '05 Aug 2025'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <h1 className="font-display" style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>
          MY ORDERS
        </h1>
        <p style={{ color: '#78716C', marginBottom: '2.5rem' }}>
          Track active deliveries and view your order history from regional home kitchens.
        </p>

        {/* Active Orders Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#1C1917', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck size={20} color="#FFB800" /> Active Order
          </h2>

          {activeOrders.map((ord) => (
            <div key={ord.id} className="fz-card" style={{ padding: '1.75rem', border: '2px solid #FFB800', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: '900', color: '#FFB800', textTransform: 'uppercase' }}>
                    {ord.id}
                  </span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#1C1917' }}>{ord.kitchen}</h3>
                  <div style={{ fontSize: '0.82rem', color: '#78716C' }}>{ord.placedAt}</div>
                </div>
                <div style={{ backgroundColor: '#FFF8E5', color: '#92400E', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontWeight: '900', fontSize: '0.8rem' }}>
                  {ord.status} &bull; ETA: {ord.eta}
                </div>
              </div>

              <div style={{ fontSize: '0.9rem', color: '#57534E', marginBottom: '1.25rem' }}>
                <strong>Items:</strong> {ord.items}
              </div>

              <div style={{ borderTop: '1px dashed #E7E5E4', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '900', color: '#1C1917' }}>Total: ₹{ord.total}</span>
                <Link to={`/tracking/${ord.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="primary" size="sm" icon={<ArrowRight size={14} />}>
                    Track Live Delivery
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Past Orders History */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#1C1917', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} color="#78716C" /> Past Orders History
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pastOrders.map((ord) => (
              <div key={ord.id} className="fz-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#78716C', fontWeight: '700' }}>{ord.placedAt} &bull; {ord.id}</div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1C1917' }}>{ord.kitchen}</h4>
                  <div style={{ fontSize: '0.85rem', color: '#57534E', marginTop: '0.2rem' }}>{ord.items}</div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: '900' }}>₹{ord.total}</span>
                  <Link to="/food" style={{ textDecoration: 'none' }}>
                    <Button variant="secondary" size="sm" icon={<RotateCcw size={13} />}>
                      Reorder
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

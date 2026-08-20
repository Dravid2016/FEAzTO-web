import React, { useState } from 'react';
import { Store, Users, ShoppingBag, Calendar, TrendingUp, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="fz-section" style={{ backgroundColor: 'var(--fz-canvas-alt)', minHeight: 'calc(100vh - 160px)' }}>
      <div className="fz-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--fz-yellow)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              PLATFORM OPERATIONAL CONSOLE
            </span>
            <h1 className="font-display" style={{ fontSize: '2.4rem', marginTop: '0.2rem' }}>
              FEAZTO ADMIN DASHBOARD
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="secondary" size="sm">System Logs</Button>
            <Button variant="primary" size="sm">Add New Kitchen</Button>
          </div>
        </div>

        {/* Operational Metrics Summary Bar */}
        <div className="fz-grid-4" style={{ marginBottom: '2rem' }}>
          {[
            { title: 'Total Active Orders', val: '1,420', icon: <ShoppingBag size={20} color="var(--fz-yellow)" /> },
            { title: 'Verified Kitchens', val: '10,240', icon: <Store size={20} color="var(--fz-yellow)" /> },
            { title: 'Event Bookings', val: '382', icon: <Calendar size={20} color="var(--fz-yellow)" /> },
            { title: 'Monthly GMV', val: '₹84.2 Lakhs', icon: <TrendingUp size={20} color="var(--fz-yellow)" /> }
          ].map((stat, idx) => (
            <div key={idx} className="fz-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--fz-radius-md)', backgroundColor: 'var(--fz-yellow-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--fz-ink-muted)', fontWeight: '700' }}>{stat.title}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--fz-ink)' }}>{stat.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--fz-border)', paddingBottom: '0.5rem' }}>
          {['orders', 'kitchens', 'cooks', 'bookings', 'reports'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--fz-radius-full)',
                border: activeTab === tab ? '2px solid var(--fz-yellow)' : '1px solid transparent',
                backgroundColor: activeTab === tab ? 'var(--fz-yellow)' : 'transparent',
                fontWeight: '800',
                fontSize: '0.85rem',
                textTransform: 'capitalize',
                cursor: 'pointer',
                color: 'var(--fz-ink)'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Operational Table */}
        <div className="fz-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem' }}>Recent Platform Activity</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--fz-border-warm)', color: 'var(--fz-ink-muted)' }}>
                <th style={{ padding: '0.75rem' }}>ID</th>
                <th style={{ padding: '0.75rem' }}>Customer / Kitchen</th>
                <th style={{ padding: '0.75rem' }}>Region</th>
                <th style={{ padding: '0.75rem' }}>Amount</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'ORD-89241', name: 'Priya Sharma', kitchen: "Mariyam's Malabar Hearth", region: 'Kerala', price: '₹380', status: 'Kitchen Preparing' },
                { id: 'ORD-89240', name: 'Rahul Verma', kitchen: "Anitha Paati's Home Kitchen", region: 'Tamil Nadu', price: '₹520', status: 'Out For Delivery' },
                { id: 'BKG-10492', name: 'Vikram Mehta', kitchen: "Gurpreet's Amritsari Rasoi", region: 'Punjab', price: '₹3,800', status: 'Confirmed' }
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--fz-border)' }}>
                  <td style={{ padding: '0.85rem', fontWeight: '800' }}>{row.id}</td>
                  <td style={{ padding: '0.85rem' }}><strong>{row.name}</strong> <br /><span style={{ fontSize: '0.78rem', color: 'var(--fz-ink-muted)' }}>{row.kitchen}</span></td>
                  <td style={{ padding: '0.85rem' }}>{row.region}</td>
                  <td style={{ padding: '0.85rem', fontWeight: '800' }}>{row.price}</td>
                  <td style={{ padding: '0.85rem' }}><span style={{ backgroundColor: 'var(--fz-yellow-light)', color: '#92400E', padding: '0.25rem 0.6rem', borderRadius: 'var(--fz-radius-full)', fontWeight: '800', fontSize: '0.75rem' }}>{row.status}</span></td>
                  <td style={{ padding: '0.85rem' }}><Button variant="secondary" size="sm">Inspect</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

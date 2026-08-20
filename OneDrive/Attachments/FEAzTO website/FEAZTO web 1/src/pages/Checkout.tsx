import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CartItem } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  onClearCart: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ cartItems, onClearCart }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('102, Palm Grove Apartments, Indiranagar, Bengaluru');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const subtotal = cartItems.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    onClearCart();
    navigate('/tracking/ORD-89241');
  };

  return (
    <div className="fz-section">
      <div className="fz-container" style={{ maxWidth: '960px' }}>
        <h1 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
          CHECKOUT
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '2rem' }}>
          {/* Form Left Column */}
          <form style={{ gridColumn: 'span 7' }} onSubmit={handlePlaceOrder}>
            <div className="fz-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={18} color="var(--fz-yellow)" /> Delivery Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Input label="Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </div>

            <div className="fz-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={18} color="var(--fz-yellow)" /> Select Payment Method
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { id: 'upi', label: 'UPI / GPay / PhonePe' },
                  { id: 'card', label: 'Credit / Debit Card' },
                  { id: 'cod', label: 'Cash on Delivery (COD)' }
                ].map((pm) => (
                  <label
                    key={pm.id}
                    style={{
                      padding: '0.85rem 1.25rem',
                      border: paymentMethod === pm.id ? '2px solid var(--fz-yellow)' : '1px solid var(--fz-border)',
                      backgroundColor: paymentMethod === pm.id ? 'var(--fz-yellow-light)' : 'var(--fz-card-bg)',
                      borderRadius: 'var(--fz-radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="pm"
                      checked={paymentMethod === pm.id}
                      onChange={() => setPaymentMethod(pm.id)}
                    />
                    {pm.label}
                  </label>
                ))}
              </div>
            </div>

            <Button variant="primary" fullWidth size="lg" type="submit">
              Place Order &bull; ₹{grandTotal}
            </Button>
          </form>

          {/* Order Summary Right Column */}
          <div style={{ gridColumn: 'span 5' }}>
            <div className="fz-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', borderBottom: '1px solid var(--fz-border-warm)', paddingBottom: '0.75rem' }}>
                Order Summary
              </h3>

              {cartItems.map((item) => (
                <div key={item.dish.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.88rem' }}>
                  <span>{item.quantity}x {item.dish.name}</span>
                  <span style={{ fontWeight: '700' }}>₹{item.dish.price * item.quantity}</span>
                </div>
              ))}

              <div style={{ borderTop: '1px dashed var(--fz-border)', marginTop: '1rem', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '900', color: 'var(--fz-ink)', borderTop: '1px solid var(--fz-border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

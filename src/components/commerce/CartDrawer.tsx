import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../../types';
import { Button } from '../ui/Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="fz-modal-backdrop" onClick={onClose}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--fz-canvas)',
          boxShadow: 'var(--fz-shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10000,
          animation: 'fzSlideIn 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--fz-border-warm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--fz-card-bg)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--fz-yellow)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Your FEAZTO Cart</h3>
            <span
              style={{
                backgroundColor: 'var(--fz-yellow-light)',
                color: '#92400E',
                fontSize: '0.75rem',
                fontWeight: '800',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--fz-radius-full)'
              }}
            >
              {items.length} Items
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fz-ink)' }}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--fz-yellow-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}
              >
                <ShoppingBag size={30} color="var(--fz-yellow)" />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.4rem' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--fz-ink-muted)', marginBottom: '1.5rem' }}>
                Discover delicious regional food from authentic home kitchens around you!
              </p>
              <Button variant="primary" onClick={onClose}>
                Explore Regional Dishes
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.dish.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: 'var(--fz-card-bg)',
                  border: '1px solid var(--fz-border-warm)',
                  borderRadius: 'var(--fz-radius-md)'
                }}
              >
                <img
                  src={item.dish.image}
                  alt={item.dish.name}
                  style={{ width: '70px', height: '70px', borderRadius: 'var(--fz-radius-sm)', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--fz-ink-subtle)', fontWeight: '700' }}>
                      {item.dish.kitchenName}
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--fz-ink)', lineHeight: 1.2 }}>
                      {item.dish.name}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <span style={{ fontWeight: '800', fontSize: '0.95rem' }}>
                      ₹{item.dish.price * item.quantity}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        backgroundColor: 'var(--fz-canvas-alt)',
                        border: '1px solid var(--fz-border)',
                        borderRadius: 'var(--fz-radius-full)',
                        padding: '0.2rem 0.6rem'
                      }}
                    >
                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, -1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.5rem',
              borderTop: '1px solid var(--fz-border-warm)',
              backgroundColor: 'var(--fz-card-bg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--fz-ink-muted)' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: '700', color: 'var(--fz-ink)' }}>₹{subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--fz-ink-muted)' }}>
              <span>Delivery Fee</span>
              <span style={{ fontWeight: '700', color: 'var(--fz-ink)' }}>₹{deliveryFee}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.1rem',
                fontWeight: '800',
                color: 'var(--fz-ink)',
                borderTop: '1px dashed var(--fz-border)',
                paddingTop: '0.75rem'
              }}
            >
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>

            <Link to="/checkout" onClick={onClose} style={{ textDecoration: 'none', marginTop: '0.5rem' }}>
              <Button variant="primary" fullWidth size="lg" icon={<ArrowRight size={18} />}>
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

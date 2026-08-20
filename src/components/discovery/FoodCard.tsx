import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Plus, Check } from 'lucide-react';
import { Dish } from '../../types';

interface FoodCardProps {
  dish: Dish;
  onAddToCart?: (dish: Dish) => void;
  isInCart?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({ dish, onAddToCart, isInCart = false }) => {
  return (
    <div className="fz-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Image Container */}
      <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
        <img
          src={dish.image}
          alt={dish.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Veg / Non-Veg Indicator Badge */}
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            backgroundColor: 'rgba(255, 253, 248, 0.95)',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--fz-radius-sm)',
            border: `1px solid ${dish.isVegetarian ? 'var(--fz-green)' : 'var(--fz-red)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.7rem',
            fontWeight: '800',
            color: dish.isVegetarian ? 'var(--fz-green)' : 'var(--fz-red)'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: dish.isVegetarian ? 'var(--fz-green)' : 'var(--fz-red)'
            }}
          />
          {dish.isVegetarian ? 'VEG' : 'NON-VEG'}
        </div>

        {/* Region Tag */}
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            backgroundColor: 'var(--fz-ink)',
            color: 'var(--fz-yellow)',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--fz-radius-full)',
            fontSize: '0.7rem',
            fontWeight: '800',
            textTransform: 'uppercase'
          }}
        >
          {dish.regionName}
        </div>
      </div>

      {/* Card Body Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--fz-ink-subtle)', fontWeight: '700' }}>
            {dish.kitchenName}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', fontWeight: '800', color: 'var(--fz-ink)' }}>
            <Star size={13} fill="var(--fz-yellow)" color="var(--fz-yellow)" />
            <span>{dish.rating}</span>
            <span style={{ color: 'var(--fz-ink-light)', fontWeight: '600' }}>({dish.reviewCount})</span>
          </div>
        </div>

        <Link to={`/food/${dish.id}`} style={{ textDecoration: 'none' }}>
          <h4
            style={{
              fontSize: '1.1rem',
              fontWeight: '800',
              color: 'var(--fz-ink)',
              lineHeight: 1.3,
              marginBottom: '0.4rem'
            }}
          >
            {dish.name}
          </h4>
        </Link>

        <p
          style={{
            fontSize: '0.82rem',
            color: 'var(--fz-ink-muted)',
            lineHeight: 1.5,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {dish.description}
        </p>

        {/* Footer Action Bar */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--fz-border-warm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--fz-ink-subtle)', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>
              Price
            </span>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--fz-ink)' }}>
              ₹{dish.price}
            </span>
          </div>

          <button
            onClick={() => onAddToCart && onAddToCart(dish)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              backgroundColor: isInCart ? 'var(--fz-green-light)' : 'var(--fz-yellow)',
              color: isInCart ? 'var(--fz-green)' : 'var(--fz-ink)',
              border: `1.5px solid ${isInCart ? 'var(--fz-green)' : 'var(--fz-yellow-hover)'}`,
              borderRadius: 'var(--fz-radius-full)',
              fontWeight: '800',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all var(--fz-transition-fast)'
            }}
          >
            {isInCart ? <Check size={14} /> : <Plus size={14} />}
            <span>{isInCart ? 'Added' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

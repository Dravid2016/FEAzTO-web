import React from 'react';
import { FoodCard } from '../components/discovery/FoodCard';
import { SEED_DISHES } from '../data/seedData';
import { Dish } from '../types';

interface FoodCatalogProps {
  onAddToCart: (dish: Dish) => void;
  cartDishIds: string[];
}

export const FoodCatalog: React.FC<FoodCatalogProps> = ({ onAddToCart, cartDishIds }) => {
  return (
    <div className="fz-section">
      <div className="fz-container">
        <h1 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          AUTHENTIC REGIONAL DISHES
        </h1>
        <p style={{ color: 'var(--fz-ink-muted)', marginBottom: '2.5rem' }}>
          Explore dishes prepared fresh in local home kitchens by verified home cooks.
        </p>

        <div className="fz-grid-4">
          {SEED_DISHES.map((d) => (
            <FoodCard
              key={d.id}
              dish={d}
              onAddToCart={onAddToCart}
              isInCart={cartDishIds.includes(d.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

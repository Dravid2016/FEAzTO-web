import React from 'react';
import { FoodCard } from '../components/discovery/FoodCard';
import { RegionCard } from '../components/discovery/RegionCard';
import { SEED_DISHES, SEED_REGIONS } from '../data/seedData';
import { Dish } from '../types';

interface DiscoverProps {
  onAddToCart: (dish: Dish) => void;
  cartDishIds: string[];
}

export const Discover: React.FC<DiscoverProps> = ({ onAddToCart, cartDishIds }) => {
  return (
    <div className="fz-section">
      <div className="fz-container">
        <h1 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          CENTRAL DISCOVERY HUB
        </h1>
        <p style={{ color: 'var(--fz-ink-muted)', marginBottom: '2.5rem' }}>
          Explore curated regional cuisines, trending home kitchen dishes, and master cooks near you.
        </p>

        <div style={{ marginBottom: '3rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>
            REGIONAL DISCOVERY
          </h2>
          <div className="fz-grid-5">
            {SEED_REGIONS.map((r) => (
              <RegionCard key={r.id} region={r} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display" style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>
            FEATURED REGIONAL FOOD
          </h2>
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
    </div>
  );
};

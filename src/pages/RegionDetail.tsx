import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Utensils, MapPin } from 'lucide-react';
import { SEED_REGIONS, SEED_DISHES, SEED_KITCHENS } from '../data/seedData';
import { FoodCard } from '../components/discovery/FoodCard';
import { Dish } from '../types';

interface RegionDetailProps {
  onAddToCart: (dish: Dish) => void;
  cartDishIds: string[];
}

export const RegionDetail: React.FC<RegionDetailProps> = ({ onAddToCart, cartDishIds }) => {
  const { regionId } = useParams();

  const region = SEED_REGIONS.find((r) => r.id === regionId) || SEED_REGIONS[0];
  const regionDishes = SEED_DISHES.filter((d) => d.regionId === region.id || d.regionName.toLowerCase() === region.name.toLowerCase());

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', padding: '2rem 1.5rem 4rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <Link to="/regions" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', color: '#57534E', fontSize: '0.9rem', fontWeight: '700', marginBottom: '1.5rem' }}>
          <ArrowLeft size={16} /> Back to All Regions
        </Link>

        {/* Region Cover Hero */}
        <div className="fz-card" style={{ padding: '0', overflow: 'hidden', marginBottom: '2.5rem', position: 'relative', height: '300px' }}>
          <img src={region.image} alt={region.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,25,23,0.9) 0%, transparent 60%)' }} />
          
          <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', color: 'white' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#FFB800', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {region.tagline}
            </span>
            <h1 className="font-display" style={{ fontSize: '3rem', color: 'white', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
              {region.name} CUISINE HERITAGE
            </h1>
            <p style={{ fontSize: '1rem', color: '#E7E5E4', maxWidth: '640px', lineHeight: 1.6 }}>
              {region.description}
            </p>
          </div>
        </div>

        {/* Regional Dishes Grid */}
        <div>
          <h2 className="font-display" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
            SIGNATURE {region.name.toUpperCase()} DISHES
          </h2>
          <div className="fz-grid-3">
            {regionDishes.length > 0 ? (
              regionDishes.map((dish) => (
                <FoodCard
                  key={dish.id}
                  dish={dish}
                  onAddToCart={onAddToCart}
                  isInCart={cartDishIds.includes(dish.id)}
                />
              ))
            ) : (
              SEED_DISHES.map((dish) => (
                <FoodCard
                  key={dish.id}
                  dish={dish}
                  onAddToCart={onAddToCart}
                  isInCart={cartDishIds.includes(dish.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

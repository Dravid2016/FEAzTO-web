import React, { useState } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { SEED_DISHES, SEED_KITCHENS } from '../data/seedData';
import { FoodCard } from '../components/discovery/FoodCard';
import { Dish } from '../types';

interface SearchPageProps {
  onAddToCart: (dish: Dish) => void;
  cartDishIds: string[];
}

export const SearchPage: React.FC<SearchPageProps> = ({ onAddToCart, cartDishIds }) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filteredDishes = SEED_DISHES.filter((d) => {
    const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase()) ||
                         d.regionName.toLowerCase().includes(query.toLowerCase()) ||
                         d.kitchenName.toLowerCase().includes(query.toLowerCase());
    
    if (selectedFilter === 'Veg') return matchesQuery && d.isVegetarian;
    if (selectedFilter === 'Non-Veg') return matchesQuery && !d.isVegetarian;
    if (selectedFilter === 'Under ₹250') return matchesQuery && d.price <= 250;
    return matchesQuery;
  });

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', padding: '2rem 1.5rem 4rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Search Header Bar */}
        <div className="fz-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#FAF6EF', padding: '0.6rem 1.25rem', borderRadius: '9999px', border: '1.5px solid #FFB800' }}>
            <Search size={20} color="#FFB800" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for authentic dishes, home kitchens, or regional recipes..."
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1.05rem', fontFamily: 'var(--fz-font-sans)', background: 'transparent' }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} color="#78716C" />
              </button>
            )}
          </div>

          {/* Quick Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#78716C', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Filter size={13} /> Filter By:
            </span>
            {['All', 'Veg', 'Non-Veg', 'Under ₹250'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  border: selectedFilter === f ? '2px solid #FFB800' : '1px solid #E7E5E4',
                  backgroundColor: selectedFilter === f ? '#FFF8E5' : '#FFFFFF',
                  fontWeight: '800',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  color: '#1C1917'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Summary */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-display" style={{ fontSize: '1.6rem' }}>
            {query ? `RESULTS FOR "${query.toUpperCase()}"` : 'RECOMMENDED FOR YOU'}
          </h2>
          <span style={{ fontSize: '0.85rem', color: '#78716C', fontWeight: '700' }}>
            Showing {filteredDishes.length} regional dishes
          </span>
        </div>

        {/* Dish Results Grid */}
        {filteredDishes.length > 0 ? (
          <div className="fz-grid-3">
            {filteredDishes.map((dish) => (
              <FoodCard
                key={dish.id}
                dish={dish}
                onAddToCart={onAddToCart}
                isInCart={cartDishIds.includes(dish.id)}
              />
            ))}
          </div>
        ) : (
          <div className="fz-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.5rem' }}>No dishes found matching your query</h3>
            <p style={{ color: '#78716C' }}>Try searching for "Biryani", "Dosa", "Fish Curry", "Kerala" or "Punjab".</p>
          </div>
        )}
      </div>
    </div>
  );
};

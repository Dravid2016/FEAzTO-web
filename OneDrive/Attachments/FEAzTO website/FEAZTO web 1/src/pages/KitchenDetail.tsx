import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, ArrowLeft, Utensils, Heart } from 'lucide-react';
import { SEED_KITCHENS, SEED_DISHES, SEED_COOKS } from '../data/seedData';
import { FoodCard } from '../components/discovery/FoodCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Dish } from '../types';

interface KitchenDetailProps {
  onAddToCart: (dish: Dish) => void;
  cartDishIds: string[];
}

export const KitchenDetail: React.FC<KitchenDetailProps> = ({ onAddToCart, cartDishIds }) => {
  const { kitchenId } = useParams();

  const kitchen = SEED_KITCHENS.find((k) => k.id === kitchenId) || SEED_KITCHENS[0];
  const cook = SEED_COOKS.find((c) => c.id === kitchen.cookId) || SEED_COOKS[0];
  const kitchenDishes = SEED_DISHES.filter((d) => d.kitchenId === kitchen.id || d.cookId === kitchen.cookId);

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', padding: '2rem 1.5rem 4rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Back Button */}
        <Link to="/kitchens" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', color: '#57534E', fontSize: '0.9rem', fontWeight: '700', marginBottom: '1.5rem' }}>
          <ArrowLeft size={16} /> Back to Kitchens Directory
        </Link>

        {/* Hero Kitchen Profile Card */}
        <div className="fz-card" style={{ padding: '0', overflow: 'hidden', marginBottom: '2.5rem' }}>
          <div style={{ position: 'relative', height: '260px' }}>
            <img src={kitchen.coverImage} alt={kitchen.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,25,23,0.85) 0%, transparent 60%)' }} />
            
            {kitchen.hygieneCertified && (
              <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', backgroundColor: '#DCFCE7', color: '#16A34A', padding: '0.4rem 0.9rem', borderRadius: '9999px', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} /> FSSAI Hygiene Verified
              </div>
            )}

            <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', right: '2rem', color: 'white', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <img src={cook.avatar} alt={cook.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #FFB800' }} />
                <div>
                  <h1 className="font-display" style={{ fontSize: '2.2rem', color: 'white', lineHeight: 1.1 }}>
                    {kitchen.name}
                  </h1>
                  <div style={{ fontSize: '0.9rem', opacity: 0.95, marginTop: '2px' }}>
                    By {cook.name} ({cook.title}) &bull; <MapPin size={13} color="#FFB800" style={{ display: 'inline' }} /> {kitchen.city}, {kitchen.state}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#FFB800', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'flex-end' }}>
                  <Star size={18} fill="#FFB800" color="#FFB800" /> {kitchen.rating}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>{kitchen.reviewCount} Reviews &bull; {kitchen.totalOrders}+ Orders</div>
              </div>
            </div>
          </div>

          <div style={{ padding: '1.75rem 2rem', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#78716C', fontWeight: '800', textTransform: 'uppercase' }}>Speciality Cuisine</span>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1C1917' }}>{kitchen.speciality}</div>
            </div>
            <Link to="/book-a-cook" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="md">
                Book {cook.name} for Event
              </Button>
            </Link>
          </div>
        </div>

        {/* Kitchen Menu Catalog */}
        <div>
          <h2 className="font-display" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
            KITCHEN MENU &amp; DAILY SPECIALS
          </h2>
          <div className="fz-grid-3">
            {kitchenDishes.map((dish) => (
              <FoodCard
                key={dish.id}
                dish={dish}
                onAddToCart={onAddToCart}
                isInCart={cartDishIds.includes(dish.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

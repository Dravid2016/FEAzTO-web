import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, MapPin, ShieldCheck, Heart, Plus, Minus, ArrowLeft, Check, Flame } from 'lucide-react';
import { SEED_DISHES, SEED_KITCHENS, SEED_COOKS } from '../data/seedData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Dish } from '../types';

interface FoodDetailProps {
  onAddToCart: (dish: Dish) => void;
  cartDishIds: string[];
}

export const FoodDetail: React.FC<FoodDetailProps> = ({ onAddToCart, cartDishIds }) => {
  const { dishId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const dish = SEED_DISHES.find((d) => d.id === dishId) || SEED_DISHES[0];
  const kitchen = SEED_KITCHENS.find((k) => k.id === dish.kitchenId) || SEED_KITCHENS[0];
  const cook = SEED_COOKS.find((c) => c.id === dish.cookId) || SEED_COOKS[0];

  const isInCart = cartDishIds.includes(dish.id);

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', padding: '2rem 1.5rem 4rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Back Link */}
        <Link to="/food" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', color: '#57534E', fontSize: '0.9rem', fontWeight: '700', marginBottom: '1.5rem' }}>
          <ArrowLeft size={16} /> Back to All Dishes
        </Link>

        {/* Main Dish Detail Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '2.5rem' }}>
          
          {/* Left Column: Dish Cover Image & Story */}
          <div style={{ gridColumn: 'span 7' }}>
            <div className="fz-card" style={{ padding: '0', overflow: 'hidden', marginBottom: '1.5rem', position: 'relative' }}>
              <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
              
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                <Badge variant={dish.isVegetarian ? 'green' : 'ink'}>
                  {dish.isVegetarian ? 'VEG' : 'NON-VEG'}
                </Badge>
                <span style={{ backgroundColor: '#1C1917', color: '#FFB800', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '800' }}>
                  {dish.regionName}
                </span>
              </div>
            </div>

            {/* Dish Story Card */}
            <div className="fz-card" style={{ padding: '2rem' }}>
              <h3 className="font-display" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>
                THE HERITAGE STORY
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#57534E', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {dish.story}
              </p>

              <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.75rem', color: '#1C1917' }}>
                Ingredients Used
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {dish.ingredients.map((ing, idx) => (
                  <span key={idx} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#FFF8E5', border: '1px solid #FFB800', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: '700' }}>
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dish Info & Purchase Action */}
          <div style={{ gridColumn: 'span 5' }}>
            <div className="fz-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#FFB800', textTransform: 'uppercase' }}>
                    {dish.regionName} Cuisine
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '800', fontSize: '0.9rem' }}>
                    <Star size={15} fill="#FFB800" color="#FFB800" /> {dish.rating} ({dish.reviewCount} reviews)
                  </div>
                </div>

                <h1 className="font-display" style={{ fontSize: '2.2rem', lineHeight: 1.1, marginBottom: '0.75rem' }}>
                  {dish.name}
                </h1>

                <p style={{ fontSize: '0.9rem', color: '#57534E', lineHeight: 1.6 }}>
                  {dish.description}
                </p>
              </div>

              {/* Kitchen & Cook Snippet */}
              <div style={{ padding: '1rem', backgroundColor: '#FAF6EF', borderRadius: '16px', border: '1px solid #E7E5E4', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={cook.avatar} alt={cook.name} style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFB800' }} />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '900', color: '#1C1917' }}>{kitchen.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#78716C' }}>Cooked by {cook.name} ({cook.title})</div>
                  <Link to={`/kitchens/${kitchen.id}`} style={{ fontSize: '0.78rem', color: '#1C1917', fontWeight: '800', textDecoration: 'underline', marginTop: '2px', display: 'inline-block' }}>
                    View Kitchen Profile &rarr;
                  </Link>
                </div>
              </div>

              {/* Details Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid #E7E5E4', paddingTop: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#78716C', fontWeight: '700' }}>Preparation Time</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1C1917', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={15} color="#FFB800" /> {dish.preparationTime}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#78716C', fontWeight: '700' }}>Spiciness Scale</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1C1917', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Flame size={15} color="#DC2626" /> {dish.spiciness}
                  </div>
                </div>
              </div>

              {/* Price & Quantity Adder */}
              <div style={{ borderTop: '1px solid #E7E5E4', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#78716C', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Total Price</span>
                  <span style={{ fontSize: '2rem', fontWeight: '900', color: '#1C1917' }}>₹{dish.price * quantity}</span>
                </div>

                {/* Quantity Stepper */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#FAF6EF', padding: '0.4rem 0.8rem', borderRadius: '9999px', border: '1px solid #E7E5E4' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ fontWeight: '900', fontSize: '1rem' }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={() => onAddToCart(dish)}
                icon={isInCart ? <Check size={18} /> : <Plus size={18} />}
              >
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

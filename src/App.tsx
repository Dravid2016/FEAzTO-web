import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageContainer } from './components/layout/PageContainer';
import { CartDrawer } from './components/commerce/CartDrawer';
import PageBorder from './components/decorative/PageBorder';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { SearchPage } from './pages/SearchPage';
import { Regions } from './pages/Regions';
import { RegionDetail } from './pages/RegionDetail';
import { FoodCatalog } from './pages/FoodCatalog';
import { FoodDetail } from './pages/FoodDetail';
import { Kitchens } from './pages/Kitchens';
import { KitchenDetail } from './pages/KitchenDetail';
import { Cooks } from './pages/Cooks';
import { BookACook } from './pages/BookACook';
import { Checkout } from './pages/Checkout';
import { OrdersPage } from './pages/OrdersPage';
import { OrderTracking } from './pages/OrderTracking';
import { AccountPage } from './pages/AccountPage';
import { PartnerPage } from './pages/PartnerPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { CookApply } from './pages/CookApply';
import { NotFound } from './pages/NotFound';
import { CartItem, Dish } from './types';
import { SEED_DISHES } from './data/seedData';

export const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { dish: SEED_DISHES[0], quantity: 1 },
    { dish: SEED_DISHES[2], quantity: 2 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (dish: Dish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartDishIds = cartItems.map((item) => item.dish.id);

  return (
    <Router>
      {/* Organic page border — fixed overlay, pointer-events:none */}
      <PageBorder />
      <PageContainer
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
      >
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} cartDishIds={cartDishIds} />} />
          <Route path="/discover" element={<Discover onAddToCart={handleAddToCart} cartDishIds={cartDishIds} />} />
          <Route path="/search" element={<SearchPage onAddToCart={handleAddToCart} cartDishIds={cartDishIds} />} />
          <Route path="/regions" element={<Regions />} />
          <Route path="/regions/:regionId" element={<RegionDetail onAddToCart={handleAddToCart} cartDishIds={cartDishIds} />} />
          <Route path="/cuisines" element={<Discover onAddToCart={handleAddToCart} cartDishIds={cartDishIds} />} />
          <Route path="/cuisines/:cuisineId" element={<RegionDetail onAddToCart={handleAddToCart} cartDishIds={cartDishIds} />} />
          <Route path="/food" element={<FoodCatalog onAddToCart={handleAddToCart} cartDishIds={cartDishIds} />} />
          <Route path="/food/:dishId" element={<FoodDetail onAddToCart={handleAddToCart} cartDishIds={cartDishIds} />} />
          <Route path="/kitchens" element={<Kitchens />} />
          <Route path="/kitchens/:kitchenId" element={<KitchenDetail onAddToCart={handleAddToCart} cartDishIds={cartDishIds} />} />
          <Route path="/cooks" element={<Cooks />} />
          <Route path="/cooks/:cookId" element={<KitchenDetail onAddToCart={handleAddToCart} cartDishIds={cartDishIds} />} />
          <Route path="/book-a-cook" element={<BookACook />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} onClearCart={handleClearCart} />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderTracking />} />
          <Route path="/tracking/:orderId" element={<OrderTracking />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/cook" element={<CookApply />} />
          <Route path="/cook/apply" element={<CookApply />} />
          <Route path="/delivery" element={<PartnerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageContainer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </Router>
  );
};

export default App;

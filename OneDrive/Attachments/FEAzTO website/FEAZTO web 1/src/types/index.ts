// FEAZTO DOMAIN TYPE DEFINITIONS

export interface Region {
  id: string;
  name: string;
  tagline: string;
  state: string;
  image: string;
  dishCount: number;
  featuredDishes: string[];
  description: string;
}

export interface Cuisine {
  id: string;
  name: string;
  regionId: string;
  description: string;
  popularDishesCount: number;
  image: string;
}

export interface Dish {
  id: string;
  name: string;
  regionId: string;
  regionName: string;
  cuisineId: string;
  kitchenId: string;
  kitchenName: string;
  cookId: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  isVegetarian: boolean;
  spiciness: 'Mild' | 'Medium' | 'Spicy';
  preparationTime: string;
  story: string;
  ingredients: string[];
  isTrending?: boolean;
}

export interface Kitchen {
  id: string;
  name: string;
  cookId: string;
  cookName: string;
  cookTitle: string;
  cookAvatar: string;
  regionId: string;
  regionName: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  totalOrders: number;
  hygieneCertified: boolean;
  coverImage: string;
  speciality: string;
  bio: string;
  address: string;
}

export interface Cook {
  id: string;
  name: string;
  title: string;
  kitchenId: string;
  kitchenName: string;
  regionName: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  totalOrders: number;
  yearsExperience: number;
  specialities: string[];
  bio: string;
  avatar: string;
  hireRatePerEvent: number;
  isVerified: boolean;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  specialInstructions?: string;
}

export interface Booking {
  id: string;
  eventType: string;
  cuisine: string;
  guestCount: number;
  date: string;
  time: string;
  location: string;
  cookId: string;
  cookName?: string;
  cookAvatar?: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  totalPrice: number;
  createdAt: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  kitchenName: string;
  totalAmount: number;
  deliveryFee: number;
  tax: number;
  grandTotal: number;
  status: 'Placed' | 'Kitchen Preparing' | 'Packaged' | 'Out For Delivery' | 'Delivered';
  deliveryAddress: string;
  placedAt: string;
  estimatedDeliveryTime: string;
  driverName?: string;
  driverPhone?: string;
}

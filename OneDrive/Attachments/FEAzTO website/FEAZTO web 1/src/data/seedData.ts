import { Region, Cuisine, Dish, Kitchen, Cook } from '../types';

export const SEED_REGIONS: Region[] = [
  {
    id: 'kerala',
    name: 'Kerala',
    tagline: "God's Own Flavors",
    state: 'Kerala',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    dishCount: 42,
    featuredDishes: ['Malabar Fish Curry', 'Appam with Stew', 'Kerala Parotta'],
    description: 'Fragrant coconut-infused coastal curries, slow-roasted spices, and banana leaf feasts.'
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    tagline: 'Tradition on a Plate',
    state: 'Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80',
    dishCount: 56,
    featuredDishes: ['Crispy Masala Dosa', 'Chettinad Chicken', 'Filter Coffee'],
    description: 'Time-honored Chettinad spice blends, stone-ground tiffins, and home kitchen secrets.'
  },
  {
    id: 'punjab',
    name: 'Punjab',
    tagline: 'Bold & Hearty',
    state: 'Punjab',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    dishCount: 38,
    featuredDishes: ['Chole Bhature', 'Amritsari Kulcha', 'Sarson da Saag'],
    description: 'Rich slow-cooked gravies, hand-churned white butter, and tandoori marinades.'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    tagline: 'Royal & Rich',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    dishCount: 31,
    featuredDishes: ['Dal Baati Churma', 'Laal Maas', 'Gatte ki Sabzi'],
    description: 'Heritage royal recipes adapted for cozy home hearths, slow-cooked ghee drenchings.'
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    tagline: 'Mishti & Memories',
    state: 'West Bengal',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    dishCount: 45,
    featuredDishes: ['Rasgulla', 'Shorshe Ilish', 'Kolkata Kathi Roll'],
    description: 'Subtle mustard oil marinates, delicate panch phoron tempering, and artisanal sweets.'
  }
];

export const SEED_CUISINES: Cuisine[] = [
  {
    id: 'malabar',
    name: 'Malabar Coastal',
    regionId: 'kerala',
    description: 'Rich coconut milk gravies and fresh curry leaves.',
    popularDishesCount: 18,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'chettinad',
    name: 'Chettinad Heritage',
    regionId: 'tamil-nadu',
    description: 'Freshly roasted spices and stone-ground gravies.',
    popularDishesCount: 24,
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80'
  }
];

export const SEED_KITCHENS: Kitchen[] = [
  {
    id: 'anitha-paati-kitchen',
    name: "Anitha Paati's Home Kitchen",
    cookId: 'anitha-paati',
    cookName: 'Anitha Paati',
    cookTitle: 'Master Home Cook',
    cookAvatar: '/assets/gm_green_saree.png',
    regionId: 'tamil-nadu',
    regionName: 'Tamil Nadu',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    rating: 4.9,
    reviewCount: 2600,
    totalOrders: 1200,
    hygieneCertified: true,
    coverImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80',
    speciality: 'Kongu Nadu & Chettinad Traditional Recipes',
    bio: 'Cooking is my love language. I cook the way my amma & paati taught me.',
    address: 'RS Puram, Coimbatore, Tamil Nadu'
  }
];

export const SEED_DISHES: Dish[] = [
  {
    id: 'malabar-fish-curry',
    name: 'Malabar Fish Curry',
    regionId: 'kerala',
    regionName: 'Kerala',
    cuisineId: 'malabar',
    kitchenId: 'anitha-paati-kitchen',
    kitchenName: "Mariyam's Hearth",
    cookId: 'mariyam-k',
    description: 'Fresh kingfish simmered in coconut milk, Kokum souring, and green chillies.',
    price: 340,
    rating: 4.9,
    reviewCount: 1100,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    isVegetarian: false,
    spiciness: 'Medium',
    preparationTime: '30 mins',
    story: 'Simmered slow in clay pots with Malabar tamarind.',
    ingredients: ['Kingfish', 'Coconut Milk', 'Kudampuli'],
    isTrending: true
  },
  {
    id: 'hyderabadi-biryani',
    name: 'Hyderabadi Home Biryani',
    regionId: 'telangana',
    regionName: 'Telangana',
    cuisineId: 'deccani',
    kitchenId: 'anitha-paati-kitchen',
    kitchenName: "Anitha Paati's Kitchen",
    cookId: 'anitha-paati',
    description: 'Long grain basmati rice and marinated tender meat cooked under dough seal (Dum).',
    price: 380,
    rating: 4.9,
    reviewCount: 3100,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    isVegetarian: false,
    spiciness: 'Spicy',
    preparationTime: '40 mins',
    story: 'Slow-cooked Dum biryani recipe passed down 4 generations.',
    ingredients: ['Basmati Rice', 'Saffron', 'Marinated Meat'],
    isTrending: true
  },
  {
    id: 'masala-dosa',
    name: 'Crispy Masala Dosa',
    regionId: 'tamil-nadu',
    regionName: 'Tamil Nadu',
    cuisineId: 'chettinad',
    kitchenId: 'anitha-paati-kitchen',
    kitchenName: "Anitha Paati's Kitchen",
    cookId: 'anitha-paati',
    description: 'Golden fermented rice crepe stuffed with spiced potato podimas, served with chutneys.',
    price: 160,
    rating: 4.8,
    reviewCount: 3900,
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    spiciness: 'Mild',
    preparationTime: '20 mins',
    story: 'Batter stone-ground by hand and fermented overnight.',
    ingredients: ['Fermented Rice Batter', 'Spiced Potatoes', 'Coconut Chutney'],
    isTrending: true
  },
  {
    id: 'chole-bhature',
    name: 'Amritsari Chole Bhature',
    regionId: 'punjab',
    regionName: 'Punjab',
    cuisineId: 'punjabi-tiffin',
    kitchenId: 'anitha-paati-kitchen',
    kitchenName: "Gurpreet's Rasoi",
    cookId: 'gurpreet-kaur',
    description: 'Dark tea-infused chickpea curry paired with fluffy fried bhatura.',
    price: 220,
    rating: 4.8,
    reviewCount: 2200,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    spiciness: 'Medium',
    preparationTime: '25 mins',
    story: 'Chole simmered overnight with black cardamom.',
    ingredients: ['Kabuli Chana', 'Anardana', 'Flour Bhatura'],
    isTrending: true
  },
  {
    id: 'rasgulla',
    name: 'Authentic Kolkata Rasgulla',
    regionId: 'west-bengal',
    regionName: 'West Bengal',
    cuisineId: 'bengali-rannaghar',
    kitchenId: 'anitha-paati-kitchen',
    kitchenName: "Anitha Paati's Kitchen",
    cookId: 'anitha-paati',
    description: 'Spongy chhana cottage cheese dumplings soaked in warm cardamom syrup.',
    price: 180,
    rating: 4.7,
    reviewCount: 1200,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    spiciness: 'Mild',
    preparationTime: '15 mins',
    story: 'Fresh milk curdled daily, boiled in rose cardamom syrup.',
    ingredients: ['Fresh Chhana', 'Sugar Syrup', 'Cardamom'],
    isTrending: true
  }
];

export const SEED_COOKS: Cook[] = [
  {
    id: 'anitha-paati',
    name: 'Anitha Paati',
    title: 'Master Home Cook',
    kitchenId: 'anitha-paati-kitchen',
    kitchenName: "Anitha Paati's Home Kitchen",
    regionName: 'Tamil Nadu',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    rating: 4.9,
    reviewCount: 2600,
    totalOrders: 1200,
    yearsExperience: 35,
    specialities: ['South Indian Thali', 'Chettinad Masala', 'Kongu Nadu Delicacies'],
    bio: 'Cooking is my love language. I cook the way my amma & paati taught me.',
    avatar: '/assets/gm_green_saree.png',
    hireRatePerEvent: 3500,
    isVerified: true
  }
];

import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    title: 'Vintage Leather Sofa',
    description: 'A beautiful and comfortable vintage leather sofa, perfect for any living room. Minor wear and tear consistent with age.',
    price: 35000,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    imageHints: ['leather sofa', 'living room', 'vintage furniture'],
    category: 'Furniture',
    location: 'Mumbai, MH',
    seller: { name: 'Priya Sharma', contact: 'priya.s@example.com' },
    keywords: ['sofa', 'leather', 'vintage', 'furniture', 'living room'],
  },
  {
    id: '2',
    title: 'Mountain Bike - Like New',
    description: 'Barely used mountain bike with 21 speeds and front suspension. Great for trails and city riding. Brand: TrailBlazer.',
    price: 25000,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    imageHints: ['mountain bike', 'bicycle outdoor'],
    category: 'Bikes',
    location: 'Bengaluru, KA',
    seller: { name: 'Arjun Gupta', contact: 'arjun.g@example.com' },
    keywords: ['bike', 'mountain bike', 'cycling', 'sports', 'outdoors'],
  },
  {
    id: '3',
    title: 'Acoustic Guitar with Case',
    description: 'Yamaha acoustic guitar, great for beginners and intermediate players. Comes with a soft case and a few picks.',
    price: 12000,
    images: ['https://placehold.co/600x400.png'],
    imageHints: ['acoustic guitar'],
    category: 'Musical Instruments',
    location: 'Pune, MH',
    seller: { name: 'Ananya Reddy', contact: 'ananya.r@example.com' },
    keywords: ['guitar', 'acoustic', 'yamaha', 'instrument', 'music'],
  },
  {
    id: '4',
    title: 'Professional DSLR Camera',
    description: 'Canon EOS 5D Mark IV in excellent condition. Includes 50mm f/1.8 lens, battery, and charger. Shutter count: 15,000.',
    price: 140000,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    imageHints: ['dslr camera', 'camera lens'],
    category: 'Electronics',
    location: 'Delhi, DL',
    seller: { name: 'Vikram Singh', contact: 'vikram.s@example.com' },
    keywords: ['camera', 'dslr', 'canon', 'photography', 'electronics'],
  },
  {
    id: '5',
    title: 'Mid-Century Modern Dresser',
    description: 'Solid wood 6-drawer dresser with classic mid-century lines. A few minor scuffs but otherwise in great shape.',
    price: 28000,
    images: ['https://placehold.co/600x400.png'],
    imageHints: ['wood dresser'],
    category: 'Furniture',
    location: 'Chennai, TN',
    seller: { name: 'Sneha Patel', contact: 'sneha.p@example.com' },
    keywords: ['dresser', 'mid-century', 'wood', 'furniture', 'bedroom'],
  },
  {
    id: '6',
    title: 'Complete Harry Potter Book Set',
    description: 'Full set of 7 Harry Potter books in hardcover. Excellent condition, read once.',
    price: 5000,
    images: ['https://placehold.co/600x400.png'],
    imageHints: ['books collection'],
    category: 'Books',
    location: 'Kolkata, WB',
    seller: { name: 'Rohan Mehta', contact: 'rohan.m@example.com' },
    keywords: ['books', 'harry potter', 'reading', 'collection', 'fantasy'],
  },
  {
    id: '7',
    title: 'Used iPhone 12 Pro',
    description: '128GB iPhone 12 Pro, unlocked. Screen is in perfect condition, minor scuffs on the side. Battery health at 88%.',
    price: 40000,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    imageHints: ['smartphone', 'iphone screen'],
    category: 'Electronics',
    location: 'Hyderabad, TS',
    seller: { name: 'Isha Khan', contact: 'isha.k@example.com' },
    keywords: ['iphone', 'apple', 'smartphone', 'electronics', 'unlocked'],
  },
  {
    id: '8',
    title: 'Vintage Road Bicycle',
    description: 'Classic Schwinn road bike from the 80s. Restored and rides smoothly. Perfect for a collector or enthusiast.',
    price: 20000,
    images: ['https://placehold.co/600x400.png'],
    imageHints: ['road bike'],
    category: 'Bikes',
    location: 'Ahmedabad, GJ',
    seller: { name: 'Aditya Rao', contact: 'aditya.r@example.com' },
    keywords: ['bike', 'road bike', 'schwinn', 'vintage', 'cycling'],
  },
];

export const getProducts = (filters: { query?: string, category?: string } = {}) => {
  let filteredProducts = products;
  if (filters.query) {
    const lowerCaseQuery = filters.query.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.title.toLowerCase().includes(lowerCaseQuery) ||
      p.description.toLowerCase().includes(lowerCaseQuery) ||
      p.keywords.some(k => k.toLowerCase().includes(lowerCaseQuery))
    );
  }
  if (filters.category && filters.category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }
  return filteredProducts;
};

export const getProductById = (id: string) => {
  return products.find(p => p.id === id);
};

export const getCategories = () => {
    const categories = products.map(p => p.category);
    return [...new Set(categories)].sort();
}

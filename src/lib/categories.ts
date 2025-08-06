
import { Car, Home, Smartphone, Briefcase, Bike, MonitorSmartphone, Truck, Sofa, Shirt, Book, Dog, Cat } from 'lucide-react';

export const categories = [
  { name: 'Cars', icon: Car, subcategories: null },
  { 
    name: 'Properties', 
    icon: Home, 
    subcategories: [
      'For Sale: Houses & Apartments',
      'For Rent: Houses & Apartments',
      'Lands & Plots',
      'For Rent: Shops & Offices',
      'For Sale: Shops & Offices',
      'PG & Guest Houses',
    ]
  },
  { name: 'Mobiles', icon: Smartphone, subcategories: ['Mobile Phones', 'Tablets', 'Accessories'] },
  { name: 'Jobs', icon: Briefcase, subcategories: ['Full-time', 'Part-time', 'Internship'] },
  { name: 'Bikes', icon: Bike, subcategories: null },
  { name: 'Electronics & Appliances', icon: MonitorSmartphone, subcategories: null },
  { name: 'Commercial Vehicles & Spares', icon: Truck, subcategories: null },
  { name: 'Furniture', icon: Sofa, subcategories: null },
  { name: 'Fashion', icon: Shirt, subcategories: null },
  { name: 'Books, Sports & Hobbies', icon: Book, subcategories: null },
  { name: 'Pets', icon: Cat, subcategories: null },
];

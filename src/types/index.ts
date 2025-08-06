export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  location: string;
  seller: {
    name: string;
    contact: string;
  };
  keywords: string[];
  imageHints: string[];
};

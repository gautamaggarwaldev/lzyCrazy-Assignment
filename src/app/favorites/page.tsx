"use client";

import { useFavorites } from "@/hooks/use-favorites";
import { products } from "@/lib/products";
import { ProductGrid } from "@/components/product/product-grid";
import { HandHeart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { favoriteIds, isLoaded } = useFavorites();
  
  const favoriteProducts = products.filter(p => favoriteIds.includes(p.id));

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-8">Your Favorite Listings</h1>
      {!isLoaded && (
        <div className="text-center py-16">
          <p>Loading your favorites...</p>
        </div>
      )}
      {isLoaded && favoriteProducts.length === 0 && (
         <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <HandHeart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">No favorites yet</h2>
            <p className="mt-2 text-muted-foreground">Browse items and click the heart to save them.</p>
            <Button asChild className="mt-6">
                <Link href="/">Browse Products</Link>
            </Button>
        </div>
      )}
      {isLoaded && favoriteProducts.length > 0 && <ProductGrid products={favoriteProducts} />}
    </div>
  );
}

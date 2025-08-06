"use client";

import { HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { Skeleton } from "../ui/skeleton";

export function FavoriteButton({ productId }: { productId: string }) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const isFav = isFavorite(productId);

  if (!isLoaded) {
    return <Skeleton className="h-10 w-full" />;
  }
  
  return (
    <Button onClick={() => toggleFavorite(productId)} className="w-full" variant={isFav ? 'accent' : 'default'}>
      <HandHeart className="mr-2 h-5 w-5" fill={isFav ? "currentColor" : "transparent"}/>
      {isFav ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
}

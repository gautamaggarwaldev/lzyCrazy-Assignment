"use client";

import Image from "next/image";
import Link from "next/link";
import { HandHeart, MapPin } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Skeleton } from "../ui/skeleton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const isFav = isFavorite(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg w-full flex flex-col group">
      <Link href={`/listings/${product.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.imageHints[0]}
            />
            {isLoaded ? (
               <Button
                variant="secondary"
                size="icon"
                className={cn(
                  "absolute top-2 right-2 rounded-full h-9 w-9 bg-black/30 hover:bg-black/50 border-none",
                  isFav ? "text-accent" : "text-white"
                )}
                onClick={handleFavoriteClick}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              >
                <HandHeart fill={isFav ? "currentColor" : "transparent"} />
              </Button>
            ) : (
              <Skeleton className="absolute top-2 right-2 h-9 w-9 rounded-full" />
            )}
          </div>
        </CardHeader>
        <div className="p-4 flex-grow flex flex-col">
          <CardTitle className="text-lg font-headline mb-2 leading-tight hover:text-primary transition-colors">
            {product.title}
          </CardTitle>
          <div className="flex-grow" />
          <p className="text-xl font-bold text-accent">INR {product.price.toLocaleString('en-IN')}</p>
        </div>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center text-sm text-muted-foreground w-full">
            <MapPin className="w-4 h-4 mr-1.5" />
            <span>{product.location}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}

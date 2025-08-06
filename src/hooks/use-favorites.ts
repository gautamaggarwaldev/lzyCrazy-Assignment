"use client";

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'lzycrazy_favorites';

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavoriteIds(new Set(JSON.parse(storedFavorites)));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    } finally {
        setIsLoaded(true);
    }
  }, []);

  const updateLocalStorage = (ids: Set<string>) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(ids)));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  };

  const toggleFavorite = useCallback((productId: string) => {
    setFavoriteIds(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      updateLocalStorage(newFavorites);
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((productId: string) => {
    return favoriteIds.has(productId);
  }, [favoriteIds]);

  return { favoriteIds: Array.from(favoriteIds), isFavorite, toggleFavorite, isLoaded };
};

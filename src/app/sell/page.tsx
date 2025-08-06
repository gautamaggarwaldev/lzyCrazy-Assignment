
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/categories';
import { SellForm } from '@/components/product/sell-form';

export default function SellPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const subcategoryParam = searchParams.get('subcategory');

  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(
    categories.find(c => c.name === categoryParam) || null
  );

  const handleCategorySelect = (category: typeof categories[0]) => {
    setSelectedCategory(category);
    if (!category.subcategories || category.subcategories.length === 0) {
      router.push(`/sell?category=${encodeURIComponent(category.name)}`);
    }
  };

  const handleSubCategorySelect = (subcategory: string) => {
    if (selectedCategory) {
      router.push(`/sell?category=${encodeURIComponent(selectedCategory.name)}&subcategory=${encodeURIComponent(subcategory)}`);
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    router.push('/sell');
  };

  if (categoryParam && subcategoryParam) {
    return (
      <div>
        <Button variant="ghost" onClick={() => router.push('/sell')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to categories
        </Button>
        <h1 className="text-3xl font-bold font-headline mb-2">Sell an Item</h1>
        <p className="text-muted-foreground mb-8">Posting in: {categoryParam} &gt; {subcategoryParam}</p>
        <SellForm category={categoryParam} subcategory={subcategoryParam} />
      </div>
    );
  }
  
  if (categoryParam && !subcategoryParam) {
     const category = categories.find(c => c.name === categoryParam);
     if(category && (!category.subcategories || category.subcategories.length === 0)) {
        return (
          <div>
            <Button variant="ghost" onClick={() => router.push('/sell')} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to categories
            </Button>
            <h1 className="text-3xl font-bold font-headline mb-2">Sell an Item</h1>
            <p className="text-muted-foreground mb-8">Posting in: {categoryParam}</p>
            <SellForm category={categoryParam} />
          </div>
        );
     }
  }


  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        {selectedCategory && (
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-4">
              <ArrowLeft />
            </Button>
        )}
        <h1 className="text-2xl font-bold font-headline text-center flex-grow">POST YOUR AD</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            <div className="border-r">
              <h2 className="p-4 font-semibold text-muted-foreground text-sm">CHOOSE A CATEGORY</h2>
              <ul>
                {categories.map((category) => (
                  <li key={category.name}>
                    <button
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full text-left flex items-center p-4 hover:bg-muted ${selectedCategory?.name === category.name ? 'bg-muted' : ''}`}
                    >
                      <category.icon className="mr-4 text-muted-foreground" />
                      <span className="flex-grow">{category.name}</span>
                      {category.subcategories && <ChevronRight className="text-muted-foreground" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-h-[400px]">
              {selectedCategory && selectedCategory.subcategories && (
                <ul>
                  {selectedCategory.subcategories.map((subcategory) => (
                    <li key={subcategory}>
                      <button 
                        onClick={() => handleSubCategorySelect(subcategory)}
                        className="w-full text-left flex items-center p-4 hover:bg-muted"
                      >
                       <span className="flex-grow">{subcategory}</span>
                       <ChevronRight className="text-muted-foreground" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

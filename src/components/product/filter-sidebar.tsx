"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterSidebarProps {
  categories: string[];
}

export function FilterSidebar({ categories }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('category');
    router.push(`${pathname}?${newParams.toString()}`);
  }

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={handleCategoryChange} value={currentCategory}>
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={clearFilters} className="w-full">Clear Filters</Button>
      </CardContent>
    </Card>
  );
}

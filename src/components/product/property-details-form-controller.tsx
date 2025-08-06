
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PropertyDetailsForm } from '@/components/product/property-details-form';
import { categories } from '@/lib/categories';

interface PropertyDetailsFormControllerProps {
  categoryParam: string | null;
  subcategoryParam: string | null;
  onPropertyDetailsSubmit: (details: any) => void;
  children: (props: { 
      showSellForm: boolean, 
      category: string | null,
      subcategory: string | null,
      showSubcategoryBack: () => void,
      showCategoryBack: () => void,
    }) => React.ReactNode;
}

export function PropertyDetailsFormController({ 
  categoryParam, 
  subcategoryParam,
  onPropertyDetailsSubmit,
  children
}: PropertyDetailsFormControllerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const detailsSubmitted = searchParams.get('details_submitted');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  
  const isPropertyForSale = categoryParam === 'Properties' && subcategoryParam === 'For Sale: Houses & Apartments';

  if (isPropertyForSale && !detailsSubmitted) {
    return <PropertyDetailsForm category={categoryParam!} subcategory={subcategoryParam!} onSubmit={onPropertyDetailsSubmit} />;
  }

  const category = categories.find(c => c.name === categoryParam);
  const showSellForm = categoryParam && (subcategoryParam || detailsSubmitted || (!category?.subcategories || category.subcategories.length === 0));

  return children({
    showSellForm,
    category: categoryParam,
    subcategory: subcategoryParam,
    showSubcategoryBack: () => router.push(`/sell?category=${encodeURIComponent(categoryParam!)}&subcategory=${encodeURIComponent(subcategoryParam!)}`),
    showCategoryBack: () => router.push('/sell'),
  });
}

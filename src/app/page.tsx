import { getProducts, getCategories } from '@/lib/products';
import { FilterSidebar } from '@/components/product/filter-sidebar';
import { ProductGrid } from '@/components/product/product-grid';

export default async function HomePage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    category?: string;
  };
}) {
  // If getProducts or getCategories are async, await them
  const products = await getProducts({ 
    query: searchParams?.q,
    category: searchParams?.category
  });

  const categories = await getCategories();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
      <aside className="md:col-span-1">
        <FilterSidebar categories={categories} />
      </aside>
      <section className="md:col-span-3 lg:col-span-4">
        <ProductGrid products={products} />
      </section>
    </div>
  );
}

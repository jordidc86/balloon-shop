import ShopContainer from '@/components/ShopContainer';
import { products, categories } from '@/lib/data';

export default function CatalogPage() {
  return (
    <main style={{ padding: '4rem 0' }}>
      <div className="container">
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Component Catalog</h1>
          <p style={{ color: 'var(--color-text-dim)' }}>Filtered for D-OXXX (Schroeder G-Series)</p>
        </header>
        <ShopContainer products={products} categories={categories} />
      </div>
    </main>
  );
}

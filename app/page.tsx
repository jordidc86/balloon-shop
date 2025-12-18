import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ShopContainer from '@/components/ShopContainer';
import { products, categories } from '@/lib/data';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ShopContainer products={products} categories={categories} />
      <footer style={{ background: 'var(--color-secondary)', padding: '40px 0', marginTop: '80px', textAlign: 'center', color: 'var(--color-text-light)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <p>© 2025 Schroeder Fire Balloons GmbH. Official Spare Parts Shop.</p>
        </div>
      </footer>
    </main>
  );
}

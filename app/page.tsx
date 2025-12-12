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
      <footer style={{ background: '#f5f5f5', padding: '40px 0', marginTop: '80px', textAlign: 'center', color: '#888' }}>
        <div className="container">
          <p>© 2025 Schroeder Fire Balloons GmbH. Official Spare Parts Shop.</p>
        </div>
      </footer>
    </main>
  );
}

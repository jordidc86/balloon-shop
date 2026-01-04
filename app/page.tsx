import Hero from '@/components/Hero';
import ShopContainer from '@/components/ShopContainer';
import { products, categories } from '@/lib/data';
import styles from './Home.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <div className="container" style={{ paddingBottom: '8rem' }}>
        <ShopContainer products={products} categories={categories} />
      </div>
      <footer style={{ background: 'var(--color-surface)', padding: '60px 0', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <p style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem' }}>
            © 2026 Schroeder Fire Balloons GmbH. Official Spare Parts Store.
          </p>
        </div>
      </footer>
    </main>
  );
}

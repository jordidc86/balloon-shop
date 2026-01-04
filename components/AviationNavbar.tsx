'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './AviationNavbar.module.css';

export default function AviationNavbar() {
  const { items, toggleCart } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={styles.nav}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          SCHROEDER <span className={styles.pro}>PARTS</span>
        </Link>
        
        <div className={styles.links}>
          <Link href="/" className={styles.link}>Shop</Link>
          <a href="https://schroederballon.de/en/technical-support/" target="_blank" rel="noopener noreferrer" className={styles.link}>Manuals</a>
          <a href="https://schroederballon.de/en/contact/" target="_blank" rel="noopener noreferrer" className={styles.link}>Support</a>
        </div>

        <div className={styles.userSection}>
          <button className={styles.cartToggle} onClick={toggleCart}>
            Cart ({itemCount})
          </button>
        </div>
      </div>
    </nav>
  );
}

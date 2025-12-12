'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const { items, toggleCart } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    Schroeder<span className={styles.highlight}>Parts</span>
                </Link>
                <div className={styles.links}>
                    <Link href="/" className={styles.link}>Shop</Link>
                    <Link href="https://schroederballon.de/en/technical-support/" target="_blank" className={styles.link}>Manuals</Link>
                    <Link href="https://schroederballon.de/en/contact/" target="_blank" className={styles.link}>Support</Link>
                    <button onClick={toggleCart} className={styles.cart}>
                        Cart ({itemCount})
                    </button>
                </div>
            </div>
        </nav>
    );
}

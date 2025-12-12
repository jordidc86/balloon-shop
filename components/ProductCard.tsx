'use client';

import { Product } from '@/lib/data';
import styles from './ProductCard.module.css';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.badge}>{product.category}</div>
            </div>
            <div className={styles.info}>
                <div className={styles.header}>
                    <h3 className={styles.name}>{product.name}</h3>
                    <span className={styles.sku}>{product.sku}</span>
                </div>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.footer}>
                    <span className={styles.price}>€{product.price.toFixed(2)}</span>
                    <button
                        className={styles.addButton}
                        onClick={() => addItem(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

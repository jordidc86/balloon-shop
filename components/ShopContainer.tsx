'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';
import ProductCard from './ProductCard';
import styles from './ShopContainer.module.css';

interface ShopContainerProps {
    products: Product[];
    categories: string[];
}

export default function ShopContainer({ products, categories }: ShopContainerProps) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div id="shop" className={`container section ${styles.container}`}>
            <div className={styles.header}>
                <h2 className={styles.title}>Genuine Components</h2>

                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Search by part number or name..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className={styles.filters}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.grid}>
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

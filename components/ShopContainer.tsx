'use client';

import { useState, useMemo } from 'react';
import { useProducts } from 'medusa-react';
import { Product } from '@/lib/data';
import ProductCard from './ProductCard';
import styles from './ShopContainer.module.css';

interface ShopContainerProps {
    initialProducts: Product[];
    categories: string[];
}

export default function ShopContainer({ initialProducts, categories }: ShopContainerProps) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch products from Medusa
    const { products: medusaProducts, isLoading } = useProducts();

    // Map Medusa products to our local Product interface
    const mappedProducts = useMemo(() => {
        if (!medusaProducts || medusaProducts.length === 0) return initialProducts;

        return medusaProducts.map(mp => ({
            id: mp.id,
            sku: mp.variants?.[0]?.sku || mp.id,
            name: mp.title,
            description: mp.description || '',
            price: (mp.variants?.[0]?.prices?.[0]?.amount || 0) / 100, // Handle price properly
            category: mp.type?.value || 'Parts',
            image: mp.thumbnail || `/placeholder-${mp.variants?.[0]?.sku}.svg`
        })) as Product[];
    }, [medusaProducts, initialProducts]);

    const filteredProducts = mappedProducts.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div id="shop" className={`container section ${styles.container}`}>
            <div className={styles.sidebar}>
                <h2>Genuine Components</h2>

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
                {isLoading && mappedProducts.length === 0 ? (
                    <div className={styles.loading}>Loading catalog...</div>
                ) : (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
}

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/lib/data';

type CartItem = Product & { quantity: number };

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product) => void;
    updateQuantity: (productId: string, delta: number) => void;
    removeItem: (productId: string) => void;
    isOpen: boolean;
    toggleCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItem = (product: Product) => {
        setItems(current => {
            const existing = current.find(item => item.id === product.id);
            if (existing) {
                return current.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...current, { ...product, quantity: 1 }];
        });
        setIsOpen(true); // Open cart when adding item
    };

    const updateQuantity = (productId: string, delta: number) => {
        setItems(current => current.map(item => {
            if (item.id === productId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (productId: string) => {
        setItems(current => current.filter(item => item.id !== productId));
    };

    const toggleCart = () => setIsOpen(prev => !prev);

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, isOpen, toggleCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

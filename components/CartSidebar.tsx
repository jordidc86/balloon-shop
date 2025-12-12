'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './CartSidebar.module.css';
import Image from 'next/image';
import { createOrder } from '@/lib/woocommerce';

export default function CartSidebar() {
    const { items, isOpen, toggleCart, removeItem, updateQuantity, total } = useCart();
    const [view, setView] = useState<'cart' | 'checkout'>('cart');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Checkout Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        country: 'Germany'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Map cart items to WooCommerce format
            const orderData = {
                billing: {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address_1: formData.address,
                    city: formData.city,
                    postcode: formData.zip,
                    country: formData.country,
                },
                line_items: items.map(item => ({
                    product_id: parseInt(item.id) || 0, // Assuming IDs are numeric string for now, fallback to 0
                    quantity: item.quantity
                }))
            };

            const result = await createOrder(orderData);

            alert(`Order Placed Successfully! \nOrder ID: #${result.id}\nCheck your email for confirmation.`);
            // Ideally here we clear the cart using a clearCart() method from context
            toggleCart();
            setView('cart');

        } catch (error) {
            alert('Failed to place order. Please try again.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={() => { toggleCart(); setView('cart'); }} />
            <div className={styles.sidebar}>

                {/* HEADER */}
                <div className={styles.header}>
                    <h3>{view === 'cart' ? `Your Basket (${items.length})` : 'Checkout'}</h3>
                    <button onClick={() => { toggleCart(); setView('cart'); }} className={styles.closeBtn}>×</button>
                </div>

                {/* CONTENT */}
                <div className={styles.contentArea}>
                    {view === 'cart' ? (
                        <div className={styles.cartView}>
                            <div className={styles.items}>
                                {items.length === 0 ? (
                                    <p className={styles.empty}>Your basket is empty.</p>
                                ) : (
                                    items.map(item => (
                                        <div key={item.id} className={styles.item}>
                                            <div className={styles.itemImage}>
                                                <Image src={item.image} alt={item.name} width={60} height={60} style={{ objectFit: 'cover' }} />
                                            </div>
                                            <div className={styles.itemInfo}>
                                                <h4>{item.name}</h4>
                                                <p className={styles.sku}>{item.sku}</p>

                                                <div className={styles.controlsRow}>
                                                    <div className={styles.quantityControls}>
                                                        <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                                    </div>
                                                    <span className={styles.price}>€{(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className={styles.removeBtn}>×</button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ) : (
                        <form id="checkout-form" onSubmit={handlePlaceOrder} className={styles.checkoutForm}>
                            <div className={styles.formGroup}>
                                <label>First Name</label>
                                <input required name="firstName" value={formData.firstName} onChange={handleInputChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Last Name</label>
                                <input required name="lastName" value={formData.lastName} onChange={handleInputChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Address</label>
                                <input required name="address" value={formData.address} onChange={handleInputChange} />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <label>City</label>
                                    <input required name="city" value={formData.city} onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Zip</label>
                                    <input required name="zip" value={formData.zip} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Country</label>
                                <select name="country" value={formData.country} onChange={handleInputChange}>
                                    <option value="Germany">Germany</option>
                                    <option value="France">France</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="Spain">Spain</option>
                                    <option value="USA">USA</option>
                                </select>
                            </div>
                        </form>
                    )}
                </div>

                {/* FOOTER */}
                <div className={styles.footer}>
                    {view === 'cart' ? (
                        <>
                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span className={styles.totalAmount}>€{total.toFixed(2)}</span>
                            </div>
                            <button
                                className={`${styles.checkoutBtn} btn btn-primary`}
                                onClick={() => {
                                    if (items.length > 0) setView('checkout');
                                }}
                                disabled={items.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                className={styles.backBtn}
                                onClick={() => setView('cart')}
                            >
                                ← Back to Cart
                            </button>
                            <button
                                type="submit"
                                form="checkout-form"
                                className={`${styles.checkoutBtn} btn btn-primary`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Processing...' : `Place Order (€${total.toFixed(2)})`}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

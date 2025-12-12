export interface OrderData {
    billing: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        address_1: string;
        city: string;
        postcode: string;
        country: string;
    };
    line_items: Array<{
        product_id: number; // We might need to map our string IDs to numbers or use name
        quantity: number;
    }>;
}

export async function createOrder(data: OrderData) {
    const WC_URL = process.env.NEXT_PUBLIC_WC_URL || 'https://your-wordpress-site.com';
    const WC_KEY = process.env.NEXT_PUBLIC_WC_KEY;
    const WC_SECRET = process.env.NEXT_PUBLIC_WC_SECRET;

    // MOCK: If no keys are present, simulate a success after a delay.
    if (!WC_KEY || !WC_SECRET) {
        console.warn('WooCommerce keys not found. Simulating order creation.');
        await new Promise(resolve => setTimeout(resolve, 1500));
        return {
            success: true,
            id: Math.floor(Math.random() * 10000),
            status: 'processing',
            currency: 'EUR',
            total: '100.00'
        };
    }

    const response = await fetch(`${WC_URL}/wp-json/wc/v3/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${WC_KEY}:${WC_SECRET}`)
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to create order');
    }

    return response.json();
}

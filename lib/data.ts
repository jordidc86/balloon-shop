export type Product = {
    id: string;
    name: string;
    category: 'Burner' | 'Basket' | 'Envelope' | 'Instruments';
    price: number;
    image: string;
    description: string;
    sku: string;
};

export const products: Product[] = [
    {
        id: '1',
        name: 'Main Blast Valve (2017 Design)',
        category: 'Burner',
        price: 450.00,
        image: '/burner_valve_1765551651170.png',
        description: 'High-performance stainless steel main blast valve for Schroeder Fire Balloons burners. 2017 updated design for improved flow control.',
        sku: 'SCH-BV-2017'
    },
    {
        id: '2',
        name: 'Precision O-Ring Set (3x1.5)',
        category: 'Burner',
        price: 2.50,
        image: '/burner_valve_1765551651170.png',
        description: 'Set of 5 high-temperature silicone O-rings (3x1.5mm) for valve maintenance.',
        sku: 'SCH-OR-3X15'
    },
    {
        id: '3',
        name: 'Leather Top Rim Cover',
        category: 'Basket',
        price: 1200.00,
        image: '/basket_leather_1765551666138.png',
        description: 'Hand-stitched premium red leather suede cover for basket top rim. Provides superior grip and comfort.',
        sku: 'SCH-BK-LTH-R'
    },
    {
        id: '4',
        name: 'Stainless Steel Carabiner',
        category: 'Basket',
        price: 25.00,
        image: '/basket_leather_1765551666138.png',
        description: 'Heavy-duty stainless steel carabiner for basket rigging. Certified for flight loads.',
        sku: 'SCH-CB-SS'
    },
    {
        id: '5',
        name: 'Hyperlast Fabric - Royal Blue',
        category: 'Envelope',
        price: 18.00,
        image: '/envelope_fabric_1765551683834.png',
        description: 'Premium ripstop Hyperlast coating for maximum durability. Sold per meter.',
        sku: 'SCH-FAB-RB'
    },
    {
        id: '6',
        name: 'Temperature Flag (Tempilabel)',
        category: 'Instruments',
        price: 15.00,
        image: '/envelope_fabric_1765551683834.png',
        description: 'Adhesive temperature indicator for envelope peak. Irreversible color change at max temp.',
        sku: 'SCH-TMP-LBL'
    }
];

export const categories = ['All', 'Burner', 'Basket', 'Envelope', 'Instruments'];

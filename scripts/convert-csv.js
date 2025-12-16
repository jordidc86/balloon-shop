const fs = require('fs');
const path = require('path');

// Read CSV
const csvPath = path.join(__dirname, '..', 'preisliste.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV (simple parser for semicolon-separated values)
const lines = csvContent.split('\n').filter(line => line.trim());
const headers = lines[0].split(';');

const products = [];
for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(';');
    if (values.length >= 3) {
        const code = values[0].trim().replace(/[^\w-]/g, '');
        const description = values[1].trim().replace(/"/g, '');
        const price = parseFloat(values[2]) || 0;

        if (code && description) {
            products.push({
                id: code,
                name: description,
                category: 'Parts', // Default category
                price: price,
                image: `/placeholder-${code}.png`,
                description: description,
                sku: code
            });
        }
    }
}

// Generate TypeScript file
const tsContent = `export type Product = {
  id: string;
  name: string;
  category: 'Burner' | 'Basket' | 'Envelope' | 'Instruments' | 'Parts';
  price: number;
  image: string;
  description: string;
  sku: string;
};

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export const categories = ['All', 'Burner', 'Basket', 'Envelope', 'Instruments', 'Parts'];
`;

const outputPath = path.join(__dirname, '..', 'lib', 'data.ts');
fs.writeFileSync(outputPath, tsContent, 'utf-8');

console.log(`✓ Converted ${products.length} products to ${outputPath}`);

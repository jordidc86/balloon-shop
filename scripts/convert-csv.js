const fs = require('fs');
const path = require('path');

// Read CSV
const csvPath = path.join(__dirname, '..', 'preisliste.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV (simple parser for semicolon-separated values)
const lines = csvContent.split('\n').filter(line => line.trim());
const headers = lines[0].split(';');

// Helper to determine category from description
function determineCategory(desc) {
    const d = desc.toLowerCase();

    if (d.includes('hoodie') || d.includes('shirt') || d.includes('vest') || d.includes('apparel') || d.includes('scarf')) {
        return 'Clothing';
    }
    if (d.includes('brenner') || d.includes('burner') || d.includes('piezo') || d.includes('ventil') || d.includes('valve') || d.includes('regler') || d.includes('schlauch') || d.includes('hose')) {
        return 'Burner';
    }
    if (d.includes('leine') || d.includes('line') || d.includes('rope') || d.includes('hülle') || d.includes('envelope') || d.includes('stoff') || d.includes('fabric') || d.includes('flag') || d.includes('temp')) {
        return 'Envelope';
    }
    if (d.includes('korb') || d.includes('basket') || d.includes('leather') || d.includes('leder') || d.includes('polster') || d.includes('cover') || d.includes('boden') || d.includes('floor')) {
        return 'Basket';
    }
    if (d.includes('instrument') || d.includes('funk') || d.includes('radio') || d.includes('vario') || d.includes('temp') || d.includes('sensor')) {
        return 'Instruments';
    }
    if (d.includes('tank') || d.includes('cylinder') || d.includes('flasche') || d.includes('gas')) {
        return 'Tank';
    }

    return 'Parts'; // Fallback
}

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
                category: determineCategory(description),
                price: price,
                image: `/placeholder-${code}.svg`, // Updated to use .svg as generated
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
  category: string;
  price: number;
  image: string;
  description: string;
  sku: string;
};

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export const categories = ['All', 'Burner', 'Basket', 'Envelope', 'Instruments', 'Tank', 'Clothing', 'Parts'];
`;

const outputPath = path.join(__dirname, '..', 'lib', 'data.ts');
fs.writeFileSync(outputPath, tsContent, 'utf-8');

console.log(`✓ Converted ${products.length} products to ${outputPath}`);

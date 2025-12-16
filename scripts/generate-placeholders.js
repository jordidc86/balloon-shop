const fs = require('fs');
const path = require('path');

// Create a simple gray placeholder SVG
function createPlaceholder(sku) {
    const svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#E5E7EB"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#6B7280" text-anchor="middle" dominant-baseline="middle">${sku}</text>
</svg>`;
    return svg;
}

// Read the data file to get all SKUs
const dataPath = path.join(__dirname, '..', 'lib', 'data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// Extract SKUs using regex (matches "sku": "VALUE")
const skuMatches = dataContent.matchAll(/"sku":\s*"([^"]+)"/g);
const skus = Array.from(skuMatches).map(match => match[1]);

const publicDir = path.join(__dirname, '..', 'public');

// Generate placeholder for each unique SKU
const uniqueSkus = [...new Set(skus)];
let count = 0;

uniqueSkus.forEach(sku => {
    const filename = `placeholder-${sku}.svg`;
    const filepath = path.join(publicDir, filename);

    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, createPlaceholder(sku), 'utf-8');
        count++;
    }
});

console.log(`✓ Generated ${count} placeholder images`);

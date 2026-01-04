const fs = require('fs');
const path = require('path');
const https = require('https');

// CONFIGURATION (We will fill this when user provides the keys)
const WC_URL = process.env.WC_URL || '';
const WC_KEY = process.env.WC_KEY || '';
const WC_SECRET = process.env.WC_SECRET || '';

if (!WC_URL || !WC_KEY || !WC_SECRET) {
    console.error("Error: Missing Configuration. Please set WC_URL, WC_KEY, and WC_SECRET.");
    console.log("Usage: WC_URL='https://...' WC_KEY='ck_...' WC_SECRET='cs_...' node scripts/sync-to-woocommerce.js");
    process.exit(1);
}

// Read local data
const dataPath = path.join(__dirname, '..', 'lib', 'data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// Quick & dirty parser to get the JSON back from the TS file
// We extract the array inside "export const products: Product[] = [...]"
const jsonMatch = dataContent.match(/export const products: Product\[] = (\[[\s\S]*?\]);/);
if (!jsonMatch) {
    console.error("Could not parse lib/data.ts");
    process.exit(1);
}
// We need to be careful with trailing commas in JS objects which JSON.parse hates, 
// but since we generated it using JSON.stringify, it should be valid JSON.
const products = JSON.parse(jsonMatch[1]);

console.log(`Loaded ${products.length} products to sync.`);

function postToWooCommerce(endpoint, data) {
    return new Promise((resolve, reject) => {
        const url = new URL(`${WC_URL}/wp-json/wc/v3/${endpoint}`);
        // Add auth to URL
        url.username = WC_KEY;
        url.password = WC_SECRET;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const req = https.request(url, options, (res) => {
            let body = "";
            res.on("data", (chunk) => (body += chunk));
            res.on("end", () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(body));
                } else {
                    reject(new Error(`Request failed with status ${res.statusCode}: ${body}`));
                }
            });
        });

        req.on("error", (e) => reject(e));
        req.write(JSON.stringify(data));
        req.end();
    });
}

async function sync() {
    console.log('Starting sync...');

    // 1. Create Categories (We should check if they exist first, but for simplicity let's try to create)
    // Or simpler: we skip category creation for the simple script and just push simple products matching the names.

    let successCount = 0;
    let failCount = 0;

    for (const p of products) {
        // Map our data to WooCommerce structure
        const wcProduct = {
            name: p.name,
            type: 'simple',
            regular_price: p.price.toString(),
            description: p.description,
            short_description: p.description,
            sku: p.sku,
            manage_stock: true,
            stock_quantity: 100, // Dummy stock
            // categories: [ { id: ... } ] // To be implemented if we fetched categories
        };

        try {
            console.log(`Syncing ${p.sku}...`);
            await postToWooCommerce('products', wcProduct);
            successCount++;
        } catch (e) {
            if (e.message.includes('code_already_exists')) {
                console.log(`  -> SKU ${p.sku} already exists. Skipping.`);
            } else {
                console.error(`  -> Failed: ${e.message}`);
                failCount++;
            }
        }

        // Tiny delay to be nice to the server
        await new Promise(r => setTimeout(r, 200));
    }

    console.log(`Done! Success: ${successCount}, Failed: ${failCount}`);
}

sync();

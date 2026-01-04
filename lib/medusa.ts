import Medusa from "@medusajs/medusa-js"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

export const medusa = new Medusa({ baseUrl: BACKEND_URL, maxRetries: 3 })

// Helper to fetch products from Medusa
export const fetchMedusaProducts = async () => {
  try {
    const { products } = await medusa.products.list()
    return products
  } catch (error) {
    console.error("Error fetching products from Medusa:", error)
    return []
  }
}

// Helper to create a cart
export const createMedusaCart = async () => {
  try {
    const { cart } = await medusa.carts.create()
    return cart
  } catch (error) {
    console.error("Error creating Medusa cart:", error)
    return null
  }
}

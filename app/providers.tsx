"use client"

import { MedusaProvider } from "medusa-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CartProvider } from "../context/CartContext"

const queryClient = new QueryClient()

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MedusaProvider
        baseUrl={process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}
        queryClientProviderProps={{ client: queryClient }}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </MedusaProvider>
    </QueryClientProvider>
  )
}

import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (producto, cantidad) => {
    setCart((prev) => [...prev, { ...producto, cantidad }])
  }

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }
  return context
}
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (producto, cantidad) => {
    setCart((prev) => {
      const existe = prev.find((item) => item.id === producto.id);

      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clear = () => {
    setCart([]);
  };

  const isInCart = (id) => cart.some((item) => item.id === id);

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.cantidad, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, clear, isInCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}

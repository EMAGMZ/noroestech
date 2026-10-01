import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './ItemCount.module.css'

function ItemCount({ producto, stock }) {
  const [cantidad, setCantidad] = useState(1)
  const { addToCart, cart } = useCart()
  const navigate = useNavigate()

  const itemEnCarrito = cart.find((item) => item.id === producto.id)
  const enCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0
  const disponible = stock - enCarrito

  if (disponible <= 0) {
    return (
      <p className={styles.itemCount}>
        {stock === 0 ? 'Sin stock' : 'Ya agregaste todo el stock disponible al carrito'}
      </p>
    )
  }

  const incrementar = () => {
    if (cantidad < disponible) {
      setCantidad(cantidad + 1)
    }
  }

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1)
    }
  }

  const handleAgregar = () => {
    addToCart(producto, cantidad)
    navigate('/cart')
  }

  return (
    <div className={styles.itemCount}>
      <button onClick={decrementar} disabled={cantidad <= 1}>-</button>
      <span className={styles.cantidad}>{cantidad}</span>
      <button onClick={incrementar} disabled={cantidad >= disponible}>+</button>
      <button onClick={handleAgregar}>Agregar al carrito</button>
    </div>
  )
}

export default ItemCount
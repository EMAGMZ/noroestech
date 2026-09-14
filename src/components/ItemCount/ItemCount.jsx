import { useState } from 'react'
import styles from './ItemCount.module.css'

function ItemCount({ stock }) {
  const [cantidad, setCantidad] = useState(1)

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1)
    }
  }

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1)
    }
  }

  return (
    <div className={styles.itemCount}>
      <button onClick={decrementar} disabled={cantidad <= 1}>-</button>
      <span className={styles.cantidad}>{cantidad}</span>
      <button onClick={incrementar} disabled={cantidad >= stock}>+</button>
    </div>
  )
}

export default ItemCount
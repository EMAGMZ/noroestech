import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './Cart.module.css'

function Cart() {
  const { cart, removeItem, clear, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <h2>Tu carrito está vacío</h2>
        <p>Todavía no agregaste productos.</p>
        <Link to="/productos" className={styles.volverBtn}>
          Ver catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.cart}>
      <h1>Tu carrito</h1>

      <div className={styles.items}>
        {cart.map((item) => (
          <div key={item.id} className={styles.item}>
            <img src={item.img} alt={item.name} className={styles.itemImg} />
            <div className={styles.itemInfo}>
              <h3>{item.name}</h3>
              <p>Cantidad: {item.cantidad}</p>
              <p>Precio unitario: ${item.price.toLocaleString('es-AR')}</p>
              <p>Subtotal: ${(item.price * item.cantidad).toLocaleString('es-AR')}</p>
            </div>
            <button onClick={() => removeItem(item.id)} className={styles.removeBtn}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className={styles.resumen}>
        <h3>Total: ${totalPrice.toLocaleString('es-AR')}</h3>
        <button onClick={clear} className={styles.clearBtn}>
          Vaciar carrito
        </button>
        <button className={styles.checkoutBtn}>
          Finalizar compra
        </button>
      </div>
    </div>
  )
}

export default Cart
import { useCart } from '../../context/CartContext'
import styles from './CartWidget.module.css'

function CartWidget() {
  const { totalItems } = useCart()

  return (
    <span className={styles.cartWidget}>
      🛒
      <span className={styles.badge}>{totalItems}</span>
    </span>
  )
}
export default CartWidget
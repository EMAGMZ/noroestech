import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './CartWidget.module.css'

function CartWidget() {
  const { totalItems } = useCart()

  return (
    <Link to="/cart" className={styles.cartWidget}>
      🛒
      <span className={styles.badge}>{totalItems}</span>
    </Link>
  )
}
export default CartWidget
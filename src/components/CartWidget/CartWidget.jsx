import styles from './CartWidget.module.css'

function CartWidget() {
  return (
    <span className={styles.cartWidget}>
      🛒
      <span className={styles.badge}>3</span>
    </span>
  )
}
export default CartWidget

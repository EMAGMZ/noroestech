import styles from './ProductCard.module.css'

function ProductCard({ producto }) {
  return (
    <div className={styles.card}>
      <img src={producto.img} alt={producto.name} />
      <h3>{producto.name}</h3>
      <p>{producto.description}</p>
      <p className={styles.price}>${producto.price.toLocaleString('es-AR')}</p>
    </div>
  )
}

export default ProductCard
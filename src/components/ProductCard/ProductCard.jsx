import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'

function ProductCard({ producto }) {
  return (
    <Link to={`/producto/${producto.id}`} className={styles.card}>
      <img src={producto.img} alt={producto.name} />
      <h3>{producto.name}</h3>
      <p>{producto.description}</p>
      <p className={styles.price}>${producto.price.toLocaleString('es-AR')}</p>
    </Link>
  )
}

export default ProductCard
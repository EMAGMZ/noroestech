import styles from './ProductCard.module.css'

function ProductCard({ producto }) {
  return (
    <div className={styles.card}>
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p className={styles.price}>${producto.precio.toLocaleString('es-AR')}</p>
    </div>
  )
}

export default ProductCard
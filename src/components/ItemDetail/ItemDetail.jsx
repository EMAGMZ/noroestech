import ItemCount from '../ItemCount/ItemCount'
import styles from './ItemDetail.module.css'

function ItemDetail({ producto }) {
  return (
    <div className={styles.detail}>
      <img src={producto.img} alt={producto.name} className={styles.image} />
      <div className={styles.info}>
        <h2 className={styles.name}>{producto.name}</h2>
        <p className={styles.category}>{producto.category}</p>
        <p className={styles.price}>${producto.price.toLocaleString('es-AR')}</p>
        <p className={styles.description}>{producto.description}</p>
        <p className={styles.stock}>Stock disponible: {producto.stock}</p>
        <ItemCount producto={producto} stock={producto.stock} />
      </div>
    </div>
  )
}

export default ItemDetail
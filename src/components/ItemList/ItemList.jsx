import ProductCard from '../ProductCard/ProductCard'
import styles from './ItemList.module.css'

function ItemList({ items }) {
  return (
    <div className={styles.productList}>
      {items.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default ItemList
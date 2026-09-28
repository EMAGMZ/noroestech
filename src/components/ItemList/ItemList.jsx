import ProductCard from '../ProductCard/ProductCard'
import styles from './ItemList.module.css' // AGREGADO

function ItemList({ items }) {
  return (
    <div className={styles.productList}> {/* REEMPLAZADO */}
      {items.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default ItemList
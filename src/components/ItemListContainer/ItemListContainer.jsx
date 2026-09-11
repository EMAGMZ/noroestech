import ItemList from '../ItemList/ItemList'
import { useProducts } from '../../hooks/useProducts'
import styles from './ItemListContainer.module.css'

function ItemListContainer({ greeting }) {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <section className="products-section">
        <h2 className="section-title">{greeting}</h2>
        <p>Cargando productos. Espere 2 segundos</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="products-section">
        <h2 className="section-title">{greeting}</h2>
        <p className={styles.errorMessage}>Error: {error}</p>
      </section>
    )
  }

  return (
    <section className="products-section">
      <h2 className="section-title">{greeting}</h2>
      <ItemList items={products} />
    </section>
  )
}

export default ItemListContainer
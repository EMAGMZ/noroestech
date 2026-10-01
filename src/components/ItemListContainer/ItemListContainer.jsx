import { useParams } from 'react-router-dom'
import ItemList from '../ItemList/ItemList'
import { useProducts } from '../../hooks/useProducts'
import { useSearch } from '../../context/SearchContext'
import styles from './ItemListContainer.module.css'

function ItemListContainer() {
  const { id: categoryId } = useParams()
  const { products, loading, error } = useProducts(categoryId)
  const { busqueda } = useSearch()

  if (loading) {
    return (
      <section className={styles.productsSection}>
        <p>Cargando productos...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.productsSection}>
        <p className={styles.errorMessage}>Error: {error}</p>
      </section>
    )
  }

  const productosFiltrados = products.filter((producto) =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  if (productosFiltrados.length === 0) {
    return (
      <section className={styles.productsSection}>
        <p>
          {busqueda
            ? `No hay productos que coincidan con "${busqueda}".`
            : 'No hay productos en esta categoría por el momento.'}
        </p>
      </section>
    )
  }

  return (
    <section className={styles.productsSection}>
      <ItemList items={productosFiltrados} />
    </section>
  )
}

export default ItemListContainer
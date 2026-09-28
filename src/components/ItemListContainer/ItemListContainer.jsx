import { useParams } from 'react-router-dom'
import ItemList from '../ItemList/ItemList'
import { useProducts } from '../../hooks/useProducts'
import { useSearch } from '../../context/SearchContext'
import styles from './ItemListContainer.module.css'

function ItemListContainer({ greeting }) {
  const { id: categoryId } = useParams()
  const { products, loading, error } = useProducts(categoryId)
  const { busqueda } = useSearch()

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

  const productosFiltrados = products.filter((producto) =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <section className="products-section">
      <h2 className="section-title">{greeting}</h2>
      <ItemList items={productosFiltrados} />
    </section>
  )
}

export default ItemListContainer
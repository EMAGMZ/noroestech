import { useParams } from 'react-router-dom'
import ItemList from '../ItemList/ItemList'
import { useProducts } from '../../hooks/useProducts'
import { useSearch } from '../../context/SearchContext'
import styles from './ItemListContainer.module.css'

function ItemListContainer() { // REEMPLAZADO
  const { id: categoryId } = useParams()
  const { products, loading, error } = useProducts(categoryId)
  const { busqueda } = useSearch()

  if (loading) {
    return (
      <section className={styles.productsSection}> {/* REEMPLAZADO */}
        {/* ELIMINADO: h2 de título */}
        <p>Cargando productos. Espere 2 segundos</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.productsSection}> {/* REEMPLAZADO */}
        {/* ELIMINADO: h2 de título */}
        <p className={styles.errorMessage}>Error: {error}</p>
      </section>
    )
  }

  const productosFiltrados = products.filter((producto) =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <section className={styles.productsSection}> {/* REEMPLAZADO */}
      {/* ELIMINADO: h2 de título */}
      <ItemList items={productosFiltrados} />
    </section>
  )
}

export default ItemListContainer
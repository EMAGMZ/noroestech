import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from '../ItemList/ItemList'
import { useProducts } from '../../hooks/useProducts'
import styles from './ItemListContainer.module.css'

function ItemListContainer({ greeting }) {
  const { id: categoryId } = useParams()
  const { products, loading, error } = useProducts()
  const [busqueda, setBusqueda] = useState('')

  const handleChange = (event) => {
    setBusqueda(event.target.value)
  }

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

  const productosPorCategoria = categoryId
    ? products.filter(
        (producto) => producto.category.toLowerCase() === categoryId.toLowerCase()
      )
    : products

  const productosFiltrados = productosPorCategoria.filter((producto) =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <section className="products-section">
      <h2 className="section-title">{greeting}</h2>
      <input
        type="text"
        value={busqueda}
        onChange={handleChange}
        placeholder="Buscar producto..."
      />
      <ItemList items={productosFiltrados} />
    </section>
  )
}

export default ItemListContainer
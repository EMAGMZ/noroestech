import { useState, useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { productos as productosData } from '../../data/productos'

function ItemListContainer({ greeting }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("useEffect ejecutado")

    // [] porque solo queremos simular la carga una vez, al montar el
    // componente. Si lo omitiéramos, el efecto se volveria a ejecutar
    // en cada render (por ejemplo cada vez que cambia loading), y el
    // setTimeout se recrearía sin parar -> comportamiento errático.
    setTimeout(() => {
      setItems(productosData)
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return (
      <section className="products-section">
        <h2 className="section-title">{greeting}</h2>
        <p>Cargando productos...</p>
      </section>
    )
  }

  return (
    <section className="products-section">
      <h2 className="section-title">{greeting}</h2>
      <div className="product-list">
        {items.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  )
}

export default ItemListContainer
import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import { getProducts } from '../../mock/asyncMock'

function ItemListContainer({ greeting }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        setItems(data)
      } catch (err) {
        console.error("Error cargando productos", err)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  if (loading) {
    return (
      <section className="products-section">
        <h2 className="section-title">{greeting}</h2>
        <p>Cargando productos. Espere 2 segundos</p>
      </section>
    )
  }

  return (
    <section className="products-section">
      <h2 className="section-title">{greeting}</h2>
      <ItemList items={items} />
    </section>
  )
}

export default ItemListContainer
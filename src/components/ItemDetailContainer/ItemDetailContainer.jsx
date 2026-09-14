import { useEffect, useState } from 'react'
import { getProductById } from '../../services/getProductById'
import ItemDetail from '../ItemDetail/ItemDetail'
import styles from './ItemDetailContainer.module.css'

function ItemDetailContainer() {
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true)
        const data = await getProductById(1) // temporal(aca algun dia voy a poner un url)
        setProducto(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducto()
  }, [])

  if (loading) {
    return <p>Cargando producto...</p>
  }

  if (error) {
    return <p className={styles.errorMessage}>Error: {error}</p>
  }

  return <ItemDetail producto={producto} />
}

export default ItemDetailContainer
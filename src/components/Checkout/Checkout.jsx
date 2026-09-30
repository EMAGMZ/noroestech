import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import Login from '../Login/Login'
import styles from './Checkout.module.css'

function Checkout() {
  const { user, loading: authLoading } = useAuth()
  const { cart, totalPrice, clear } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
    ciudad: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [submitError, setSubmitError] = useState('')

  if (authLoading) {
    return <p className={styles.checkout}>Verificando sesión...</p>
  }

  if (cart.length === 0 && !orderId) {
    return <Navigate to="/productos" replace />
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.nombre.trim()) newErrors.nombre = 'Requerido'
    if (!formData.apellido.trim()) newErrors.apellido = 'Requerido'
    if (!formData.telefono.trim()) newErrors.telefono = 'Requerido'
    if (!formData.direccion.trim()) newErrors.direccion = 'Requerido'
    if (!formData.ciudad.trim()) newErrors.ciudad = 'Requerido'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!validate()) return
    if (!user) {
      setSubmitError('Tenés que iniciar sesión para finalizar la compra.')
      return
    }
    if (cart.length === 0) {
      setSubmitError('Tu carrito está vacío.')
      return
    }

    setLoading(true)
    try {
      const order = {
        userId: user.uid,
        userEmail: user.email,
        buyer: { ...formData },
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.cantidad,
        })),
        total: totalPrice,
        createdAt: serverTimestamp(),
      }

      const docRef = await addDoc(collection(db, 'orders'), order)
      setOrderId(docRef.id)
      clear()
    } catch (err) {
      setSubmitError('Ocurrió un error al generar la orden: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <div className={styles.confirmacion}>
        <h2>¡Compra confirmada!</h2>
        <p>Tu número de orden es:</p>
        <p className={styles.orderId}>{orderId}</p>
        <button onClick={() => navigate('/productos')}>Volver al catálogo</button>
      </div>
    )
  }

  if (!user) {
    return (
      <div className={styles.checkout}>
        <h1>Finalizar compra</h1>
        <p>Iniciá sesión o registrate para continuar. Tus productos siguen en el carrito.</p>
        <Login />
      </div>
    )
  }

  return (
    <div className={styles.checkout}>
      <h1>Finalizar compra</h1>
      <p>Comprando como {user.email}</p> {/* AGREGADO */}
      <p>Total a pagar: ${totalPrice.toLocaleString('es-AR')}</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Nombre</label>
          <input name="nombre" value={formData.nombre} onChange={handleChange} />
          {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
        </div>

        <div className={styles.field}>
          <label>Apellido</label>
          <input name="apellido" value={formData.apellido} onChange={handleChange} />
          {errors.apellido && <span className={styles.error}>{errors.apellido}</span>}
        </div>

        <div className={styles.field}>
          <label>Teléfono</label>
          <input name="telefono" value={formData.telefono} onChange={handleChange} />
          {errors.telefono && <span className={styles.error}>{errors.telefono}</span>}
        </div>

        <div className={styles.field}>
          <label>Dirección</label>
          <input name="direccion" value={formData.direccion} onChange={handleChange} />
          {errors.direccion && <span className={styles.error}>{errors.direccion}</span>}
        </div>

        <div className={styles.field}>
          <label>Ciudad</label>
          <input name="ciudad" value={formData.ciudad} onChange={handleChange} />
          {errors.ciudad && <span className={styles.error}>{errors.ciudad}</span>}
        </div>

        {submitError && <p className={styles.error}>{submitError}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Confirmar compra'}
        </button>
      </form>
    </div>
  )
}

export default Checkout
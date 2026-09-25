import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export async function getProductById(productId) {
  const productRef = doc(db, 'products', productId)
  const snapshot = await getDoc(productRef)

  if (!snapshot.exists()) {
    throw new Error('Producto no encontrado')
  }

  return { id: snapshot.id, ...snapshot.data() }
}
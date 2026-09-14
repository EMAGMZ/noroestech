import { productos } from '../data/productos'

export function getProductById(productId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = productos.find((p) => p.id === productId)
      producto ? resolve(producto) : reject(new Error("Producto no encontrado"))
    }, 500)
  })
}
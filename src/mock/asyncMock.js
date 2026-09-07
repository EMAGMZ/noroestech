import { productos as productosData } from '../data/productos'

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productosData)
    }, 2000)
  })
}
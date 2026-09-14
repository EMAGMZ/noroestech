import mouseImg from '../assets/mouse.jpeg'
import tecladoImg from '../assets/teclado.jpg'
import aurisImg from '../assets/auris.jpg'
import gabineteImg from '../assets/gabinete.jpg'
import mousePadImg from '../assets/mousePad.jpg'

export const productos = [
  {
    id: 1,
    name: "Mouse Gamer",
    price: 45000,
    category: "Perifericos",
    description: "Mouse gamer 9999 DPI",
    img: mouseImg,
    stock: 10
  },
  {
    id: 2,
    name: "Teclado Mecánico",
    price: 62000,
    category: "Perifericos",
    description: "Teclado mecánico RGB switch azul",
    img: tecladoImg,
    stock: 10
  },
  {
    id: 3,
    name: "Auriculares Gamer",
    price: 38000,
    category: "Audio",
    description: "Auriculares con sonido envolvente 7.1",
    img: aurisImg,
    stock: 10
  },
  {
    id: 4,
    name: "Gabinete Gamer",
    price: 60000,
    category: "Gabinetes",
    description: "Gabinete con 4 fan incluidos",
    img: gabineteImg,
    stock: 10
  },
  {
    id: 5,
    name: "Mouse Pad",
    price: 14000,
    category: "Accesorios",
    description: "Mouse Pad 30x80",
    img: mousePadImg,
    stock: 10
  }
]
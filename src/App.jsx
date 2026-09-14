import Navbar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import { productos } from './data/productos'
import './App.css'

const tienda = "Noroestech"

function App() {
  return (
    <div className="App">
      <Navbar />

      <section className="hero">
        <span className="tag">Tecnología</span>
        <h1>{tienda}</h1>
        <p>Los mejores productos gamer al mejor precio</p>
        <a href="#productos" className="cta">Ver productos</a>
      </section>

      <div id="productos">
        <ItemListContainer productos={productos} greeting="¡Bienvenido a NoroesTech!" />
      </div>

      <div id="detalle">
        <ItemDetailContainer />
      </div>

      <Footer />
    </div>
  )
}

export default App
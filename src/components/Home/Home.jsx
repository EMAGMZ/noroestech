import { Link } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import { useProducts } from '../../hooks/useProducts';
import { categorias } from '../../data/categorias';
import styles from './Home.module.css';

function Home() {
  const { products, loading, error } = useProducts();

  const destacados = products.slice(0, 4);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.titulo}>
          Bienvenido a <span className={styles.marca}>NoroesTech</span>
        </h1>
        <p className={styles.subtitulo}>
          Tu tienda de tecnología gamer. Periféricos, componentes y accesorios para armar tu setup.
        </p>
        <Link to="/productos" className={styles.boton}>
          Ver productos
        </Link>
      </section>

      <section className={styles.seccion}>
        <h2 className={styles.seccionTitulo}>Destacados</h2>
        {loading && <p className={styles.mensaje}>Cargando productos...</p>}
        {error && <p className={styles.mensaje}>Error: {error}</p>}
        {!loading && !error && <ItemList items={destacados} />}
      </section>
    </div>
  );
}

export default Home;
import { Link } from 'react-router-dom'; // AGREGADO
import styles from './NotFound.module.css'; // AGREGADO

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404</h1> {/* REEMPLAZADO */}
      <p>Página no encontrada</p> {/* REEMPLAZADO */}
      <Link to="/" className={styles.boton}>Volver al inicio</Link> {/* AGREGADO */}
    </div>
  );
}

export default NotFound;
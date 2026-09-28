import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link to="/" className={styles.boton}>Volver al inicio</Link>
    </div>
  );
}

export default NotFound;
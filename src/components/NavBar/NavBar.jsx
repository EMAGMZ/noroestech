import { NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? styles.linkActivo : styles.linkNormal}
      >
        Inicio
      </NavLink>
      <NavLink 
        to="/productos" 
        className={({ isActive }) => isActive ? styles.linkActivo : styles.linkNormal}
      >
        Productos
      </NavLink>
      <CartWidget />
    </nav>
  );
}

export default NavBar;
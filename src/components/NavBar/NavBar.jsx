import { NavLink, Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import logo from '../../assets/logo_noroestech.png';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src={logo} alt="NoroesTech" className={styles.logo} />
      </Link>
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
      <NavLink 
        to="/category/perifericos" 
        className={({ isActive }) => isActive ? styles.linkActivo : styles.linkNormal}
      >
        Perifericos
      </NavLink>
      <NavLink 
        to="/category/audio" 
        className={({ isActive }) => isActive ? styles.linkActivo : styles.linkNormal}
      >
        Audio
      </NavLink>
      <NavLink 
        to="/category/gabinetes" 
        className={({ isActive }) => isActive ? styles.linkActivo : styles.linkNormal}
      >
        Gabinetes
      </NavLink>
      <NavLink 
        to="/category/accesorios" 
        className={({ isActive }) => isActive ? styles.linkActivo : styles.linkNormal}
      >
        Accesorios
      </NavLink>
      <CartWidget />
    </nav>
  );
}

export default NavBar;
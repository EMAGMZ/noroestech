import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext'; // AGREGADO
import logo from '../../assets/logo_noroestech.png';
import styles from './NavBar.module.css';

const categorias = [
  { id: 'perifericos', nombre: 'Perifericos' },
  { id: 'gabinetes', nombre: 'Gabinetes' },
  { id: 'procesadores', nombre: 'Procesadores' },
  { id: 'mothers', nombre: 'Mothers' },
];

function NavBar() {
  const { user, logout } = useAuth();
  const { busqueda, setBusqueda } = useSearch(); // AGREGADO
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  const handleLogout = () => {
    cerrarMenu();
    logout();
  };

  // AGREGADO: mismo handleChange que tenías en ItemListContainer
  const handleChange = (event) => {
    setBusqueda(event.target.value);
  };

  const claseLink = ({ isActive }) => isActive ? styles.linkActivo : styles.linkNormal;

  return (
    <nav className={styles.navbar}>
      <button
        className={styles.hamburguesa}
        onClick={toggleMenu}
        aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
      >
        {menuAbierto ? '✕' : '☰'}
      </button>

      <Link to="/" onClick={cerrarMenu}>
        <img src={logo} alt="NoroesTech" className={styles.logo} />
      </Link>

      <div className={menuAbierto ? `${styles.menu} ${styles.menuAbierto}` : styles.menu}>
        <input
          type="text"
          value={busqueda}
          onChange={handleChange}
          placeholder="Buscar producto..."
          className={styles.buscador}
        />

        <NavLink to="/" className={claseLink} onClick={cerrarMenu}>
          Inicio
        </NavLink>
        <NavLink to="/productos" className={claseLink} onClick={cerrarMenu}>
          Productos
        </NavLink>

        {categorias.map((cat) => (
          <NavLink
            key={cat.id}
            to={`/category/${cat.id}`}
            className={claseLink}
            onClick={cerrarMenu}
          >
            {cat.nombre}
          </NavLink>
        ))}

        {user ? (
          <div className={styles.userInfo}>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        ) : (
          <NavLink to="/login" className={claseLink} onClick={cerrarMenu}>
            Iniciar sesión
          </NavLink>
        )}
      </div>

      <CartWidget />
    </nav>
  );
}

export default NavBar;
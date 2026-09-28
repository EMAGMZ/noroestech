import { useState } from 'react'; // AGREGADO
import { NavLink, Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo_noroestech.png';
import styles from './NavBar.module.css';

// AGREGADO: lista de categorías. Para sumar una nueva, se agrega una línea acá
// (id = valor del campo category en Firestore, nombre = texto que se muestra)
const categorias = [
  { id: 'perifericos', nombre: 'Perifericos' },
  { id: 'audio', nombre: 'Audio' },
  { id: 'gabinetes', nombre: 'Gabinetes' },
  { id: 'accesorios', nombre: 'Accesorios' },
  { id: 'procesadores', nombre: 'Procesadores' },
  { id: 'mothers', nombre: 'Mothers' },
];

function NavBar() {
  const { user, logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false); // AGREGADO

  const toggleMenu = () => setMenuAbierto(!menuAbierto); // AGREGADO
  const cerrarMenu = () => setMenuAbierto(false); // AGREGADO

  // AGREGADO: cierra el menú y después hace logout
  const handleLogout = () => {
    cerrarMenu();
    logout();
  };

  // AGREGADO: misma función de clase que ya usabas, guardada para no repetirla
  const claseLink = ({ isActive }) => isActive ? styles.linkActivo : styles.linkNormal;

  return (
    <nav className={styles.navbar}>
      {/* AGREGADO: botón hamburguesa (solo visible en mobile por CSS) */}
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

      {/* AGREGADO: contenedor del menú. En mobile es el panel lateral, en PC es la fila de links */}
      <div className={menuAbierto ? `${styles.menu} ${styles.menuAbierto}` : styles.menu}>
        <NavLink to="/" className={claseLink} onClick={cerrarMenu}>
          Inicio
        </NavLink>
        <NavLink to="/productos" className={claseLink} onClick={cerrarMenu}>
          Productos
        </NavLink>

        {/* REEMPLAZADO: los 4 NavLink de categorías repetidos ahora salen del array */}
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

        {/* MOVIDO: el bloque de usuario ahora está adentro del menú */}
        {user ? (
          <div className={styles.userInfo}>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Cerrar sesión</button> {/* REEMPLAZADO: logout -> handleLogout */}
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
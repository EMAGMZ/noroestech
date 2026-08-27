import styles from './NavBar.module.css'
import CartWidget from '../CartWidget/CartWidget'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img className={styles.logo} src="/src/assets/logo_noroestech.png" alt="logo-navbar" />
      <ul className={styles.navbarLinks}>
        <li>Perifericos</li>
        <li>Audio</li>
        <li>Componentes</li>
      </ul>
      <CartWidget />
    </nav>
  )
}

export default Navbar
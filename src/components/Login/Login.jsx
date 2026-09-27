// src/components/Login/Login.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login, register, logout } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return (
      <div className={styles.container}>
        <h2>Bienvenido, {user.email}</h2>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Iniciar sesión / Registrarse</h2>
      <form>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button onClick={handleLogin}>Log In</button>
        <button onClick={handleRegister}>Sign Up</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Login;
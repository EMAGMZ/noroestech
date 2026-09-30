import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

const traducirError = (code) => {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email o contraseña incorrectos.";
    case "auth/invalid-email":
      return "El email no tiene un formato válido.";
    case "auth/missing-password":
      return "Ingresá una contraseña.";
    case "auth/email-already-in-use":
      return "Ya existe una cuenta con ese email.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "auth/too-many-requests":
      return "Demasiados intentos. Esperá unos minutos y probá de nuevo.";
    default:
      return "Ocurrió un error. Intentá de nuevo.";
  }
};

const Login = ({ modoInicial = "login" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modo, setModo] = useState(modoInicial);
  const [enviando, setEnviando] = useState(false);
  const { user, login, register, logout } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Completá email y contraseña.");
      return;
    }

    setEnviando(true);
    try {
      if (modo === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      setError(traducirError(err.code));
    } finally {
      setEnviando(false);
    }
  };

  const cambiarModo = () => {
    setModo(modo === "login" ? "register" : "login");
    setError("");
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
      <h2>{modo === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>

      <form onSubmit={handleSubmit} className={styles.container}>
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

        <button type="submit" disabled={enviando}>
          {enviando
            ? "Procesando..."
            : modo === "login"
              ? "Iniciar sesión"
              : "Registrarme"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      <button type="button" onClick={cambiarModo}>
        {modo === "login"
          ? "¿No tenés cuenta? Registrate"
          : "¿Ya tenés cuenta? Iniciá sesión"}
      </button>
    </div>
  );
};

export default Login;
# NoroesTech

E-commerce de tecnología gamer desarrollado con React, Vite y Firebase (Firestore + Authentication), desplegado en Vercel.

**Demo:** https://noroestech.vercel.app

## Tecnologías

- React 19
- Vite
- JavaScript
- React Router DOM
- Firebase (Firestore + Authentication)
- Vercel (deploy)

## Componentes

- **NavBar**: navegación superior con logo, menú hamburguesa en mobile, links a categorías, buscador de productos, `CartWidget` y estado de sesión (email + logout si hay usuario logueado, link a login si no).
- **CartWidget**: ícono de carrito con badge de cantidad total de unidades.
- **Home**: página de inicio con productos destacados.
- **ItemListContainer**: obtiene productos desde Firestore con el hook `useProducts`, filtrando por categoría en el servidor (`query`/`where`) según el parámetro de la URL, y por nombre según el texto del buscador (`SearchContext`). Muestra mensajes de carga, error y categoría o búsqueda sin resultados.
- **ItemList** / **ProductCard**: arman la grilla y la tarjeta de cada producto.
- **ItemDetailContainer** / **ItemDetail**: detalle de un producto obtenido por ID desde Firestore, con mensaje si el producto no existe.
- **ItemCount**: selector de cantidad. No permite superar el stock disponible, descontando las unidades que ya están en el carrito.
- **Login**: inicio de sesión y registro con Firebase Authentication (email y contraseña), con mensajes de error en castellano.
- **Cart**: vista del carrito, con opción de eliminar ítems, vaciarlo o pasar a checkout.
- **Checkout**: usa renderizado condicional. Si no hay usuario autenticado muestra el login dentro de la misma vista, sin perder el carrito; si hay usuario, muestra el formulario de entrega. Valida los datos, genera la orden en Firestore y muestra el ID generado. El carrito se vacía recién cuando la orden se guardó correctamente.
- **NotFound** / **Footer**.

## Navegación (React Router)

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | Home | Página de inicio |
| `/productos` | ItemListContainer | Catálogo completo |
| `/category/:id` | ItemListContainer | Catálogo filtrado por categoría |
| `/item/:id` | ItemDetailContainer | Detalle de un producto |
| `/cart` | Cart | Carrito de compras |
| `/login` | Login | Inicio de sesión |
| `/register` | Login | Registro de usuario |
| `/checkout` | Checkout | Login o formulario de entrega, según la sesión |
| `*` | NotFound | Cualquier URL no definida |

## Estado global (Context API)

- **`CartContext`** (`useCart`): expone `cart`, `totalItems`, `totalPrice` y las funciones para agregar, quitar y vaciar productos. La cantidad de un producto nunca supera su stock.
- **`AuthContext`** (`useAuth`): expone el usuario logueado, el estado de carga de la sesión y las funciones de registro, login y logout. La sesión se mantiene al recargar la página.
- **`SearchContext`** (`useSearch`): comparte el texto del buscador entre la NavBar y el listado de productos.

## Firebase

La conexión se centraliza en `src/firebase/firebaseConfig.js`, que exporta `db` (Firestore) y `auth` (Authentication). Las credenciales se leen desde variables de entorno (ver `.env.example`), nunca están escritas en el código.

Colecciones:
- **`products`**: catálogo, con `name`, `description`, `price`, `category`, `stock`, `img`.
- **`orders`**: órdenes de compra, con datos del comprador, usuario autenticado (ID y email), productos, cantidades, precios, total y fecha (`serverTimestamp`).

Las reglas de seguridad de Firestore permiten leer `products` sin iniciar sesión y no permiten modificarlo desde la aplicación. En `orders` solo se pueden crear documentos si hay un usuario autenticado.

### Imágenes de productos

El campo `img` de cada producto guarda la URL pública de la imagen original del proveedor (maximus.com.ar o compragamer); las imágenes no están alojadas en este proyecto. Se eligió así por tratarse de un trabajo práctico, para no configurar Firebase Storage. Las limitaciones son conocidas: si el proveedor cambia, mueve o elimina una imagen, o bloquea el uso desde otros dominios, esa imagen dejaría de verse en la tienda. En un proyecto real, las imágenes se subirían a Firebase Storage (u otro servicio propio) y `img` apuntaría a esa copia.

## Instalación

```
git clone https://github.com/EMAGMZ/noroestech.git
cd noroestech
npm install
```

Creá un archivo `.env` en la raíz con las variables de `.env.example`, usando las credenciales de tu propio proyecto de Firebase.

```
npm run dev
```

## Deploy

El proyecto está desplegado en Vercel, conectado al repositorio de GitHub: cada push a `main` genera un nuevo deploy.

- Las variables de entorno de Firebase están configuradas en el proyecto de Vercel.
- El dominio de Vercel está agregado en los dominios autorizados de Firebase Authentication.
- El archivo `vercel.json` redirige todas las rutas a `index.html`, para que las rutas internas funcionen al recargar la página.
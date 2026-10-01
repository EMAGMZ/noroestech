# NoroesTech

E-commerce de tecnología gamer desarrollado con React, Vite y Firebase (Firestore + Authentication).

## Tecnologías

- React 19
- Vite
- JavaScript
- React Router DOM
- Firebase (Firestore + Authentication)

## Componentes

- **NavBar**: navegación superior con logo, links a categorías, `CartWidget`, y estado de sesión (email + logout si hay usuario logueado, link a login si no).
- **CartWidget**: ícono de carrito con badge de cantidad.
- **ItemListContainer**: obtiene productos desde Firestore con el hook `useProducts`, filtrando por categoría en el servidor (`query`/`where`) según el parámetro de la URL. Incluye buscador por nombre.
- **ItemList** / **ProductCard**: arman la grilla y la tarjeta de cada producto.
- **ItemDetailContainer** / **ItemDetail** / **ItemCount**: detalle de un producto obtenido por ID desde Firestore, con selector de cantidad para agregar al carrito.
- **Login**: registro e inicio de sesión con Firebase Authentication.
- **Cart**: vista del carrito, con opción de eliminar ítems, vaciarlo o pasar a checkout.
- **Checkout**: ruta protegida. Formulario de datos de entrega, generación de la orden en Firestore, y confirmación con el ID generado.
- **ProtectedRoute**: redirige a `/login` si no hay usuario autenticado.
- **NotFound** / **Footer**.

## Navegación (React Router)

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | Home | Página de inicio |
| `/productos` | ItemListContainer | Catálogo completo |
| `/category/:id` | ItemListContainer | Catálogo filtrado por categoría |
| `/item/:id` | ItemDetailContainer | Detalle de un producto |
| `/login` | Login | Registro / inicio de sesión |
| `/cart` | Cart | Carrito de compras |
| `/checkout` | Checkout (protegida) | Datos de entrega y confirmación |
| `*` | NotFound | Cualquier URL no definida |

## Carrito de compras

Manejado con Context API (`CartContext`), accesible con el hook `useCart`. Expone `cart`, `totalItems`, `totalPrice` y las funciones para agregar, quitar y vaciar productos.

## Firebase

### Imágenes de productos

El campo `img` de cada producto guarda la URL pública de la imagen original del proveedor (maximus.com.ar o compragamer); las imágenes no están alojadas en este proyecto. Se eligió así por tratarse de un trabajo práctico, para no configurar Firebase Storage. Las limitaciones son conocidas: si el proveedor cambia, mueve o elimina una imagen, o bloquea el uso desde otros dominios, esa imagen dejaría de verse en la tienda. En un proyecto real, las imágenes se subirían a Firebase Storage (u otro servicio propio) y `img` apuntaría a esa copia.

La conexión se centraliza en `src/firebase/firebaseConfig.js`, que exporta `db` (Firestore) y `auth` (Authentication). Las credenciales se leen desde variables de entorno (ver `.env.example`), nunca están escritas en el código.

Colecciones:
- **`products`**: catálogo, con `name`, `description`, `price`, `category`, `stock`, `img`.
- **`orders`**: órdenes de compra, con datos del comprador, usuario autenticado, productos, total y fecha (`serverTimestamp`).

Las reglas de seguridad de Firestore permiten lectura pública de `products` pero solo admiten escritura desde el cliente para el propio cliente (bloqueada), y en `orders` solo permiten crear documentos si hay un usuario autenticado.

## Instalación

\`\`\`
git clone https://github.com/EMAGMZ/noroestech.git
cd noroestech
npm install
\`\`\`

Creá un archivo `.env` en la raíz con las variables de `.env.example`, usando las credenciales de tu propio proyecto de Firebase.

\`\`\`
npm run dev
\`\`\`
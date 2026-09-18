# NoroesTech

E-commerce de tecnología desarrollado con React y Vite.

## Tecnologías

- React 19
- Vite
- JavaScript
- React Router DOM  <!-- AGREGADO -->

## Componentes

- **Navbar**: barra de navegación superior con el logo de la tienda (clickeable, lleva al inicio), links a Inicio, Productos, categorías de productos (Perifericos, Audio, Gabinetes, Accesorios) y el `CartWidget` como componente hijo. Se mantiene visible en todas las rutas de la aplicación. <!-- AGREGADO: logo y visibilidad en todas las rutas; CORREGIDO: categorías reales -->
- **CartWidget**: ícono de carrito con un badge que indica la cantidad de productos agregados.
- **ItemListContainer**: recibe por props un mensaje de bienvenida (`greeting`). Se encarga de pedir los productos (usando el hook `useProducts`) y muestra un mensaje de carga mientras espera la respuesta. Filtra los productos por categoría leyendo el parámetro de la URL con `useParams` (ruta `/category/:id`), y además incluye un buscador por nombre con un input controlado. No arma la lista visual directamente, eso lo delega a `ItemList`. <!-- CORREGIDO: useProducts en vez de useEffect/useState directo; AGREGADO: categoría y buscador -->
- **ItemList**: recibe la lista de productos por props y recorre el array con `.map()`, renderizando una `ProductCard` por cada producto.
- **ProductCard**: tarjeta individual de producto, recibe un `producto` por props y muestra su imagen, nombre, descripción, precio y stock. Al hacer click navega al detalle del producto (`/item/:id`). <!-- AGREGADO -->
- **ItemDetailContainer**: lee el `id` del producto desde la URL con `useParams`, busca sus datos y maneja el caso de producto no encontrado, mostrando un mensaje con link de vuelta al catálogo. <!-- AGREGADO -->
- **ItemDetail** / **ItemCount**: muestran el detalle completo del producto y permiten elegir cantidad y agregarlo al carrito (conectado a `CartContext`). Tras agregar, redirige automáticamente al catálogo con `useNavigate`. <!-- AGREGADO -->
- **NotFound**: página que se muestra ante cualquier URL que no coincide con ninguna ruta definida. <!-- AGREGADO -->
- **Footer**: pie de página con la información de derechos de la tienda.

## Navegación (React Router) <!-- SECCIÓN NUEVA -->

La aplicación usa `react-router-dom` para navegar sin recargar la página. Rutas definidas:

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | Home | Página de inicio |
| `/productos` | ItemListContainer | Catálogo completo |
| `/category/:id` | ItemListContainer | Catálogo filtrado por categoría |
| `/item/:id` | ItemDetailContainer | Detalle de un producto puntual |
| `*` | NotFound | Cualquier URL no definida |

El filtro por categoría se resuelve leyendo el parámetro `:id` de la URL con `useParams`: si existe, se filtran los productos por ese campo; si no (por ejemplo en `/productos`), se muestran todos.

## Carga de productos (simulación asíncrona)

Los productos no se muestran de forma instantánea: `ItemListContainer` usa el hook `useProducts` (que por dentro usa `useEffect`/`useState`) para pedirlos apenas se monta el componente, y mientras tanto muestra "Cargando productos...". <!-- CORREGIDO -->

La función `getProducts`, ubicada en `src/mock/asyncMock.js`, simula una llamada a una API real: devuelve una `Promise` que se resuelve después de 2 segundos con el array de productos (definido en `src/data/productos.js`). Esto imita el tiempo de espera de una petición de red real, aunque los datos por ahora sean locales.

Este mock será reemplazado más adelante por una conexión real a una base de datos (Firebase), sin necesidad de cambiar la lógica de `useEffect`/`useState` que ya está preparada para manejar datos que tardan en llegar.

## Carrito de compras <!-- SECCIÓN NUEVA -->

El estado del carrito se maneja con Context API (`CartContext`, en `src/context/CartContext.jsx`), accesible desde cualquier componente con el hook `useCart`. Expone la lista de productos agregados (`cart`), el total de items (`totalItems`, mostrado en el badge del `CartWidget`) y la función `addToCart` para agregar productos.

## Instalación

\`\`\`
git clone https://github.com/EMAGMZ/noroestech.git
cd noroestech
npm install
npm run dev
\`\`\`
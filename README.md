# NoroesTech

E-commerce de tecnología desarrollado con React y Vite.

## Tecnologías

- React 19
- Vite
- JavaScript

## Componentes

- **Navbar**: barra de navegación superior con el logo de la tienda, categorías de productos (Perifericos, Audio, Componentes) y el `CartWidget` como componente hijo.
- **CartWidget**: ícono de carrito con un badge que indica la cantidad de productos agregados.
- **ItemListContainer**: recibe por props un mensaje de bienvenida (`greeting`). Se encarga de pedir los productos (usando `useEffect` y `useState`) y muestra un mensaje de carga mientras espera la respuesta. No arma la lista visual directamente, eso lo delega a `ItemList`.
- **ItemList**: recibe la lista de productos por props y recorre el array con `.map()`, renderizando una `ProductCard` por cada producto.
- **ProductCard**: tarjeta individual de producto, recibe un `producto` por props y muestra su imagen, nombre, descripción, precio y stock.
- **Footer**: pie de página con la información de derechos de la tienda.

## Carga de productos (simulación asíncrona)

Los productos no se muestran de forma instantánea: `ItemListContainer` usa el hook `useEffect` para pedirlos apenas se monta el componente, y mientras tanto muestra "Cargando productos...".

La función `getProducts`, ubicada en `src/mock/asyncMock.js`, simula una llamada a una API real: devuelve una `Promise` que se resuelve después de 2 segundos con el array de productos (definido en `src/data/productos.js`). Esto imita el tiempo de espera de una petición de red real, aunque los datos por ahora sean locales.

Este mock será reemplazado más adelante por una conexión real a una base de datos (Firebase), sin necesidad de cambiar la lógica de `useEffect`/`useState` que ya está preparada para manejar datos que tardan en llegar.

## Instalación

```
git clone https://github.com/EMAGMZ/noroestech.git
cd noroestech
npm install
npm run dev
```
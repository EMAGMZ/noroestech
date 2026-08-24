# NoroesTech

E-commerce de tecnología desarrollado con React y Vite.

## Tecnologías

- React 19
- Vite
- JavaScript

## Componentes

- **Navbar**: barra de navegación superior con el logo de la tienda, categorías de productos (Perifericos, Audio, Componentes) y el `CartWidget` como componente hijo.
- **CartWidget**: ícono de carrito con un badge que indica la cantidad de productos agregados.
- **ItemListContainer**: recibe por props un mensaje de bienvenida (`greeting`) y la lista de `productos`, renderizando el saludo centrado y una `ProductCard` por cada producto.
- **ProductCard**: tarjeta individual de producto, recibe un `producto` por props y muestra su imagen, nombre, descripción y precio.
- **Footer**: pie de página con la información de derechos de la tienda.

## Instalación

```
git clone https://github.com/EMAGMZ/noroestech.git
cd noroestech
npm install
npm run dev
```
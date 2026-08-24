import ProductCard from './ProductCard'

function ItemListContainer({ productos, greeting }) {
  return (
    <section className="products-section">
      <h2 className="section-title">{greeting}</h2>
      <div className="product-list">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  )
}

export default ItemListContainer
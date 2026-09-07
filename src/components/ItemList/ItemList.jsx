import ProductCard from '../ProductCard/ProductCard'

function ItemList({ items }) {
  return (
    <div className="product-list">
      {items.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default ItemList
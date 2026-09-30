import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../services/getProductById";
import ItemDetail from "../ItemDetail/ItemDetail";

function ItemDetailContainer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;

  if (notFound) {
    return (
      <div>
        <p>El producto que buscás no existe.</p>
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    );
  }

  return <ItemDetail producto={product} />;
}

export default ItemDetailContainer;
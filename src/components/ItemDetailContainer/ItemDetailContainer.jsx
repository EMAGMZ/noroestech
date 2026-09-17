import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../services/getProductById';
import ItemDetail from '../ItemDetail/ItemDetail';

function ItemDetailContainer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    getProductById(Number(id))
      .then((data) => {
        setProduct(data);
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => setLoading(false));
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
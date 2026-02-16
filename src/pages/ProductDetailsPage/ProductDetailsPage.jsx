import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetailsPage.css';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        if (!mounted) return;
        const weight = data.weight || `${(data.id % 5) + 1} kg`;
        const availabilityStatus = data.stock > 0 ? 'In stock' : 'Out of stock';
        setProduct({ ...data, weight, availabilityStatus });
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Ошибка');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <p className="page">Загрузка...</p>;
  if (error) return <p className="page error">{error}</p>;
  if (!product) return <p className="page">Товар не найден</p>;

  return (
    <div className="page page--details">
      <Link to="/">Назад к каталогу</Link>
      <div className="details">
        <img src={product.thumbnail} alt={product.title} className="details__img" />
        <div className="details__info">
          <h2>{product.title}</h2>
          <p className="details__desc">{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Discount:</strong> {product.discountPercentage}%</p>
          <p><strong>Rating:</strong> {product.rating}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Weight:</strong> {product.weight}</p>
          <p><strong>Availability:</strong> {product.availabilityStatus}</p>
        </div>
      </div>
    </div>
  );
}

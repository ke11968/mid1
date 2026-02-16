import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <p className="plist__empty">Товары не найдены.</p>;
  }

  return (
    <div className="plist">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

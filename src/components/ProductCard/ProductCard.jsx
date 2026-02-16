import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="pcard">
      <img src={product.thumbnail} alt={product.title} className="pcard__thumb" />
      <div className="pcard__body">
        <h3 className="pcard__title">{product.title}</h3>
        <p className="pcard__brand">{product.brand}</p>
        <p className="pcard__category">{product.category}</p>
        <div className="pcard__meta">
          <span className="pcard__price">${product.price}</span>
        </div>
      </div>
    </Link>
  );
}

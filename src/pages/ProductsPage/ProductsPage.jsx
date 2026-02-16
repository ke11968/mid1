import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../../components/ProductList/ProductList';
import './ProductsPage.css';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(qParam);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const url = qParam
          ? `https://dummyjson.com/products/search?q=${encodeURIComponent(qParam)}`
          : 'https://dummyjson.com/products';
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message || 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [qParam]);

  function handleSubmit(e) {
    e.preventDefault();
    if (query) setSearchParams({ q: query });
    else setSearchParams({});
  }

  return (
    <div className="page page--products">
      <h1>Каталог товаров</h1>
      <form onSubmit={handleSubmit} className="search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск товаров..."
          aria-label="Поиск"
        />
        <button type="submit">Найти</button>
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && <ProductList products={products} />}
    </div>
  );
}

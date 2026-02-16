import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import GalleryPage from './pages/GalleryPage';
import './App.css';

export default function App() {
  return (
    <Router>
      <header className="header">
        <div className="container">
          <h1 className="logo">QR Fiesta</h1>
          <nav className="nav">
            <Link to="/" className="navLink">📤 Subir Foto</Link>
            <Link to="/gallery" className="navLink">🖼 Galería</Link>
          </nav>
        </div>
      </header>
      <main className="container main">
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} QR Fiesta. Todos los derechos reservados.
        </div>
      </footer>
    </Router>
  );
}

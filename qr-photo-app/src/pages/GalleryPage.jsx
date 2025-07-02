// src/pages/GalleryPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GalleryPage.css';

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('/api/images').then((res) => setImages(res.data));
  }, []);

  return (
    <div className="gallery-container">
      <h2>Galería del evento 🎉</h2>
      {images.length === 0 ? (
        <p>Aún no hay fotos subidas.</p>
      ) : (
        <div className="gallery-grid">
          {images.map((url, i) => (
            <div key={i} className="gallery-item">
              <img src={url} alt={`foto-${i}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


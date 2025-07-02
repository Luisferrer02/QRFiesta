// src/pages/GalleryPage.jsx
import { useEffect, useState } from 'react';
import API from '../api';
import '../styles/GalleryPage.css';

export default function GalleryPage() {
  const [urls, setUrls] = useState([]);
  const [modalSrc, setModalSrc] = useState(null);

  useEffect(() => {
    API.get('/api/images')
      .then(({ data }) => {
        // aseguramos que cada URL empiece por https://
        const fixed = data.map(f => {
          let u = f.ipfsUrl;
          if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
          return u;
        });
        setUrls(fixed);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Galería del evento 🎉</h1>
      <ul className="gallery-grid">
        {urls.map((src, i) => (
          <li
            key={i}
            className="photo-container"
            onClick={() => setModalSrc(src)}
          >
            <img src={src} alt={`foto-${i}`} />
          </li>
        ))}
      </ul>

      {modalSrc && (
        <div
          className="modal-overlay"
          onClick={() => setModalSrc(null)}
        >
          <img src={modalSrc} alt="preview" />
        </div>
      )}
    </div>
  );
}

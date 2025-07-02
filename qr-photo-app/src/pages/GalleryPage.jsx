import { useEffect, useState } from 'react';
import API from '../api';

export default function GalleryPage() {
  // estado array de URLs
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    API
      .get('/api/images')
      .then(({ data }) => {
        console.log('Payload /api/images:', data);
        // extraemos ipfsUrl de cada objeto Foto
        const onlyUrls = data.map((foto) => foto.ipfsUrl);
        setUrls(onlyUrls);
      })
      .catch((err) => {
        console.error('Error cargando imágenes:', err);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Galería del evento 🎉</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {urls.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`foto-${i}`}
            className="rounded shadow object-cover w-full h-48"
          />
        ))}
      </div>
    </div>
  );
}

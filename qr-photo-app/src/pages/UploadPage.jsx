// src/pages/UploadPage.jsx
import React, { useState } from 'react';
import API from '../api';
import '../styles/UploadPage.css';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMsg('Selecciona un archivo.');
    const formData = new FormData();
    formData.append('file', file);
    try {
      await API.post('/api/upload', formData);
      setMsg('¡Foto subida con éxito!');
      setFile(null);
    } catch (err) {
      setMsg('Error al subir. Por favor inténtalo de nuevo.');
    }
  };

  return (
    <div className="upload-container">
      <h2>Sube tu foto 📸</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Subir Foto</button>
      </form>
      {msg && <p className="message">{msg}</p>}
    </div>
  );
}

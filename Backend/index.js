// backend/index.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { pinFileToIPFS, getPinnedImages } = require('./pinata');
const path = require('path');
require('dotenv').config(); // Esto debe ir antes de acceder a process.env


const app = express();
const upload = multer({ storage: multer.memoryStorage() });

let imageUrls = []; // Puedes sustituir esto por una DB real si lo deseas

app.use(cors());
app.use(express.json());

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      console.log('No se recibió archivo');
      return res.status(400).json({ error: 'No se envió ningún archivo' });
    }

    console.log('Archivo recibido:', file.originalname);
    const ipfsUrl = await pinFileToIPFS(file);
    imageUrls.push(ipfsUrl); // ✅ Guardado en memoria
    res.status(200).json({ url: ipfsUrl });
  } catch (err) {
    console.error('Error al subir la imagen:', err.message);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
});

app.get('/api/images', (req, res) => {
  res.json(imageUrls);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));

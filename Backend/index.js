// Backend/index.js
require('dotenv').config();
const express  = require('express');
const multer   = require('multer');
const cors     = require('cors');
const mongoose = require('mongoose');

const { pinFileToIPFS } = require('./pinata');
const Foto               = require('./models/Foto');

const app    = express();
const upload = multer({ storage: multer.memoryStorage() });

const origins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : [];

app.use(
    cors({
        origin: function(origin, callback) {
            // permitir solicitudes sin origen (p.ej. desde Postman)
            if (!origin) return callback(null, true);
            if (origins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error('CORS policy violation'), false);
        }
    })
);
app.use(express.json());

console.log('Mongo URI:', process.env.MONGO_URI);

// 1) Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error al conectar MongoDB:', err));

// 2) Ruta para subir fotos
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No se envió ningún archivo' });
    }

    console.log('Archivo recibido:', file.originalname);
    const ipfsUrl = await pinFileToIPFS(file);
    // Guardamos en MongoDB
    const nuevaFoto = await Foto.create({
      ipfsUrl,
      filename: file.originalname
    });

    res.status(200).json({
      id:        nuevaFoto._id,
      ipfsUrl:   nuevaFoto.ipfsUrl,
      filename:  nuevaFoto.filename,
      uploadedAt:nuevaFoto.uploadedAt
    });
  } catch (err) {
    console.error('Error al subir la imagen:', err);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
});

// 3) Ruta para listar todas las fotos
app.get('/api/images', async (req, res) => {
  try {
    const fotos = await Foto.find()
      .sort({ uploadedAt: -1 });
    res.json(fotos.map(f => ({
      id:        f._id,
      ipfsUrl:   f.ipfsUrl,
      filename:  f.filename,
      uploadedAt:f.uploadedAt
    })));
  } catch (err) {
    console.error('Error al leer imágenes:', err);
    res.status(500).json({ error: 'Error al leer imágenes' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor activo en puerto ${PORT}`));

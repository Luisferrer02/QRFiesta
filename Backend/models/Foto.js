// Backend/models/Foto.js
const mongoose = require('mongoose');

const FotoSchema = new mongoose.Schema({
  ipfsUrl:   { type: String,  required: true },
  filename:  { type: String,  required: true },
  uploadedAt:{ type: Date,    default: Date.now }
});

module.exports = mongoose.model('Foto', FotoSchema);

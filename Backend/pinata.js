const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config(); // Esto debe ir antes de acceder a process.env


const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

async function pinFileToIPFS(file) {
  const data = new FormData();
  data.append('file', file.buffer, { filename: file.originalname });

  const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
    maxBodyLength: Infinity,
    headers: {
      ...data.getHeaders(),
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
  });

  return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
}

module.exports = { pinFileToIPFS };

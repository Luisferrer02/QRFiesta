// backend/pinata.js
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config(); // Carga variables de .env

const PINATA_API_KEY       = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY= process.env.PINATA_SECRET_API_KEY;

const PINATA_GATEWAY       = process.env.PINATA_GATEWAY;

async function pinFileToIPFS(file) {
  const data = new FormData();
  data.append('file', file.buffer, { filename: file.originalname });

  const res = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    data,
    {
      maxBodyLength: Infinity,
      headers: {
        ...data.getHeaders(),
        pinata_api_key:        PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    }
  );

const rawGateway = process.env.PINATA_GATEWAY || 'gateway.pinata.cloud';
const gateway = rawGateway.startsWith('http')
  ? rawGateway
  : `https://${rawGateway}`;

return `${gateway}/ipfs/${res.data.IpfsHash}`;
}

module.exports = { pinFileToIPFS };

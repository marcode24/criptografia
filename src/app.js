import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import AES from './utils/AES.js';
import Base64 from './utils/base64.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true })); // Middleware para analizar datos en formato x-www-form-urlencoded
app.use(express.static(`${__dirname}/public`)); // Sirve archivos estáticos desde la carpeta 'public'

app.post('/encrypt', (req, res) => {
  const { data } = req.body;
  const result = AES.encrypt(data);
  res.send(result);
});

app.post('/decrypt', (req, res) => {
  const { data } = req.body;
  const result = AES.decrypt(data);
  res.send(result);
});

app.post('/encode', (req, res) => {
  const { data } = req.body;
  const result = Base64.encode(data);
  res.send({ result, original: data });
});

app.post('/decode', (req, res) => {
  const { data } = req.body;
  const result = Base64.decode(data);
  res.send({ result, original: data });
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/base64', (req, res) => {
  res.sendFile(`${__dirname}/public/pages/base64.html`);
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Servidor en ejecución en el puerto 3000');
});

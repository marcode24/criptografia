import crypto from 'crypto';
import Base64 from "./base64.js";

const ALGORITHM = 'aes-256-cbc';
const KEY = crypto.randomBytes(32); // Genera una clave de 32 bytes
const IV = crypto.randomBytes(16); // Genera un vector de inicialización (IV) de 16 bytes


const AES = {
  encrypt: (data) => {
    // Cifrado Base64
    const encoded = Base64.encode(data);

    // Cifrado AES
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), IV);
    let encrypted = cipher.update(encoded, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return { encoded, encrypted };
  },
  decrypt: (data) => {
    // Descifrado AES
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), IV);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // Descifrado Base64
    const decoded = Base64.decode(decrypted);

    return { decrypted, decoded };
  },
};

export default AES;
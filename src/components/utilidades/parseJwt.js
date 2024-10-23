// src/utils/parseJwt.js
import jwt from 'jsonwebtoken';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  
  try {
    const decoded = jwt.verify(token, 'key'); // Reemplaza 'secret_key' con tu clave secreta
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

export default parseJwt;

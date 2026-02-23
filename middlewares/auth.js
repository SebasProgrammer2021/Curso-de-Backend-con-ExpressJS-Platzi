const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' }); //401 porque no se proporcionó el token, indica que el cliente no ha autenticado
  }

  jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' }); //403 porque el token es inválido, indica que el cliente ha autenticado pero no tiene permisos
    }

    req.user = user; // Agregar la información del usuario al objeto de solicitud, guarda el usuario en el objeto de la solicitud para que esté disponible en los siguientes middlewares o rutas
    next(); // Continuar con la siguiente función de middleware o ruta
  });
};

module.exports = authenticateToken;

  
const { Router } = require('express');
const authRouter = require('./auth');
const router = Router();

router.use('/auth', authRouter); // se usa /auth para diferenciar las rutas de autenticación de otras posibles rutas de la API, como por ejemplo rutas para manejar usuarios, productos, etc.

module.exports = router;
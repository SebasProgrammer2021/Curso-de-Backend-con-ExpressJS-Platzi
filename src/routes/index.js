const { Router } = require('express');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const reservations = require('./reservations');
const appointments = require('./appointments');
const router = Router();

router.use('/auth', authRouter); // se usa /auth para diferenciar las rutas de autenticación de otras posibles rutas de la API, como por ejemplo rutas para manejar usuarios, productos, etc.
router.use('/admin', adminRouter); // se usa /admin para diferenciar las rutas de administración de otras posibles rutas de la API, como por ejemplo rutas para manejar usuarios, productos, etc.
router.use('/reservations', reservations); // se usa /reservations para diferenciar las rutas de reservas de otras posibles rutas de la API, como por ejemplo rutas para manejar usuarios, productos, etc.

router.use('/users', appointments);

module.exports = router;
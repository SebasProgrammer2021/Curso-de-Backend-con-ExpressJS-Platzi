const { Router } = require('express');
const { createTimeBlocks, getReservations } = require('../controllers/adminController');
const authenticateToken = require('../middlewares/auth');

const router = Router();

router.post('/time-blocks', authenticateToken, createTimeBlocks); // Ruta para crear bloques de tiempo, esta ruta solo debería ser accesible para usuarios con rol de ADMIN, por eso se usa el middleware authenticateToken para verificar que el usuario esté autenticado y tenga el rol adecuado antes de permitir el acceso a esta ruta.
router.get('/reservations', authenticateToken, getReservations); // Ruta para obtener todas las reservas, esta ruta solo debería ser accesible para usuarios con rol de ADMIN, por eso se usa el middleware authenticateToken para verificar que el usuario esté autenticado y tenga el rol adecuado antes de permitir el acceso a esta ruta.


module.exports = router;

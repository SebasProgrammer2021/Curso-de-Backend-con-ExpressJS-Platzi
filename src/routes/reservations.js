const { Router } = require('express');
const authenticateToken = require('../middlewares/auth');
const reservationController = require('../controllers/reservationController');
const router = Router();

router.post('/',authenticateToken, reservationController.createReservation); // Ruta para crear una reserva, esta ruta solo debería ser accesible para usuarios autenticados, por eso se usa el middleware authenticateToken para verificar que el usuario esté autenticado antes de permitir el acceso a esta ruta.
router.get('/:id', authenticateToken, reservationController.getReservationById); // Ruta para obtener una reserva por ID, esta ruta solo debería ser accesible para usuarios autenticados.
router.put('/:id', authenticateToken, reservationController.updateReservation); // Ruta para actualizar una reserva por ID, esta ruta solo debería ser accesible para usuarios autenticados.
router.delete('/:id', authenticateToken, reservationController.deleteReservation); // Ruta para eliminar una reserva por ID, esta ruta solo debería ser accesible para usuarios autenticados.


module.exports = router;

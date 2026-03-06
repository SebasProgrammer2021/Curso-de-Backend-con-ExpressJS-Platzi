const { Router } = require('express');
const authenticateToken = require('../middlewares/auth');
const appointmentsController = require('../controllers/appointmentsController');
const router = Router();

router.get('/:id/appointments', authenticateToken, appointmentsController.getUserAppointments); // Ruta para obtener las citas de un usuario por ID, esta ruta solo debería ser accesible para usuarios autenticados.


module.exports = router;
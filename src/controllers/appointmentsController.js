const appointmentsService = require('../services/appointmentsService');

const getUserAppointments = (req, res) => {

  try {
    const userId = req.params.id; // Obtener el ID del usuario desde los parámetros de la ruta
    const userAppointments = appointmentsService.getUserAppointments(userId); // Llamar al servicio para obtener las citas del usuario
    res.json({ message: 'Citas obtenidas exitosamente', data: userAppointments }); // Enviar la respuesta con las citas obtenidas
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial de las citas del usuario', details: error.message }); // Enviar una respuesta de error en caso de que ocurra un problema
  }
};

module.exports = {
  getUserAppointments
};
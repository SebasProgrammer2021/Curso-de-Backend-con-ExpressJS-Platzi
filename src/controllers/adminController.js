const { createTimeBlockService, getTimeBlocksService } = require('../services/adminService');

const createTimeBlocks = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Acceso denegado.' });
  }

  const { startTime, endTime } = req.body;

  try {
    const newTimeBlock = await createTimeBlockService(startTime, endTime);
    res.status(201).json(newTimeBlock); // 201 porque se ha creado un nuevo recurso, este código se usa para indicar que una solicitud ha sido exitosa y que se ha creado un nuevo recurso como resultado de esa solicitud, en este caso, un nuevo bloque de tiempo.
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el bloque de tiempo.' });
  }
}

const getReservations = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Acceso denegado.' }); // 403 porque el usuario no tiene permisos para acceder a esta ruta, este codigo se usa cuando el usuario está autenticado pero no tiene los permisos necesarios para acceder a un recurso específico, en este caso, la ruta de reservas que solo debería ser accesible para usuarios con rol de ADMIN.
  }

  try {
    const reservations = await getTimeBlocksService();
    res.json(reservations);
  } catch (error) {
    console.error('adminController.getReservations:', error);
    res.status(500).json({
      message: 'Error al obtener las reservas.',
      details: error.message   // o error.stack en dev
    });
  }
}

module.exports = {
  createTimeBlocks,
  getReservations
}
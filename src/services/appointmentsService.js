const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

exports.getUserAppointments = async (userId) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { timeBlock: true } // Incluimos la información del bloque de tiempo asociado a cada cita
    });
    return appointments;
  } catch (error) {
    throw new Error('Error al obtener el historial de las citas del usuario');
  }
};
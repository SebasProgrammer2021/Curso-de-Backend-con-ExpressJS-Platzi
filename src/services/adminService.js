const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

const createTimeBlockService = async (startTime, endTime) => {
  const newTimeBlock = await prisma.timeBlock.create({
    data: {
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    }
  });
  return newTimeBlock;
}

const getTimeBlocksService = async () => {
  const reservations = await prisma.appointment.findMany({
    include: {
      user: true, // Incluimos la información del usuario que hizo la reserva
      timeBlock: true // Incluimos la información del bloque de tiempo reservado
    }
  });
  return reservations;
}

module.exports = {
  createTimeBlockService,
  getTimeBlocksService
}
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

exports.createReservation = async (data) => {
  const conflict = await prisma.appointment.findFirst({
    where: {
      date: data.date,
      timeBlockId: data.timeBlockId
    }
  }); // Verificamos si ya existe una reserva para la misma fecha y bloque de tiempo

  if (conflict) {
    throw new Error('El horario ya está reservado');
  }

  return await prisma.appointment.create({
    data
  }); // Si no hay conflictos, creamos la reserva
};

exports.getReservationById = async (id) => {
  return prisma.appointment.findUnique({
    where: { id: parseInt(id, 10) }
  });
};

exports.updateReservation = async (id, data) => {
  const conflict = await prisma.appointment.findFirst({
    where: {
      date: data.date,
      timeBlockId: data.timeBlockId,
      id: { not: parseInt(id, 10) }
    }
  }); // Verificamos si ya existe una reserva para la misma fecha y bloque de tiempo, excluyendo la reserva actual

  if (conflict) {
    throw new Error('El horario ya está reservado');
  }

  return await prisma.appointment.update({
    where: { id: parseInt(id, 10) },
    data
  }); // Si no hay conflictos, actualizamos la reserva
};

exports.deleteReservation = async (id) => {
  return prisma.appointment.delete({
    where: { id: parseInt(id, 10) }
  });
};

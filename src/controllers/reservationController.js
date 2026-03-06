const reservationService = require('../services/reservationService');

exports.createReservation = async (req, res) => {
  try {
    const reservation = await reservationService.createReservation(req.body);
    res.status(201).json({ message: 'Reservation created successfully', data: reservation });
  } catch (error) {
    res.status(500).json({ error: 'Error creating reservation' });
  }
const jwt = require('jsonwebtoken'); //
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation fetched successfully', data: reservation });
  } catch (error) {
    res.status(400).json({ error: 'Error fetching reservation', details: error.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await reservationService.updateReservation(req.params.id, req.body);
    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation updated successfully', data: updatedReservation });
  } catch (error) {
    res.status(400).json({ error: 'Error updating reservation', details: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await reservationService.deleteReservation(req.params.id);
    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting reservation', details: error.message });
  }
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Si el error tiene un código de estado específico, úsalo. De lo contrario, usa 500 (Error Interno del Servidor)

  const message = error.message || 'Error Interno del Servidor'; // Si el error tiene un mensaje específico, úsalo. De lo contrario, usa un mensaje genérico

  console.error(`[ERROR] ${new Date().toISOString()} - ${req.method} ${statusCode} ${req.url} - ${message}`); // Registrar el error con la fecha, método HTTP, codigo de estado, URL y mensaje

  if (err.stack) {
    console.error(err.stack); // Registrar la pila de llamadas del error para facilitar la depuración
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    error: message,
    // Incluir la pila de llamadas solo en desarrollo para evitar exponer información sensible en producción, para debugar el error durante el desarrollo.
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })

  }); // Enviar una respuesta JSON con el código de estado y el mensaje de error
}

module.exports = errorHandler;
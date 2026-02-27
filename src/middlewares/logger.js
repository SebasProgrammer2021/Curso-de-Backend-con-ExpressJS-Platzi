// un middleware sirve para ejecutar código, hacer cambios en la solicitud y respuesta, finalizar el ciclo de solicitud-respuesta o llamar al siguiente middleware en la pila. En este caso, el middleware se utiliza para registrar cada solicitud entrante con su método HTTP y URL, lo que es útil para monitorear y depurar la aplicación.

const LoggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString(); // Obtener la fecha y hora actual en formato ISO
  const endTime = new Date(); // hora local del PC

  console.log(`[${timestamp}] [${endTime.toLocaleString()}] Logger ${req.method} ${req.url} - IP: ${req.ip}`); // Registrar el método HTTP, la URL de la solicitud y la dirección IP del cliente

  const start = Date.now(); // Registrar el tiempo de inicio de la solicitud

  res.on('finish', () => {
    const duration = Date.now() - start; // Calcular la duración de la solicitud
    console.log(`[${timestamp}] [${endTime.toLocaleString()}] Logger Response: status: ${res.statusCode} - Duration: ${duration}ms`); // Registrar el código de estado y la duración
  });

  next(); // Llamar al siguiente middleware en la pila
};

module.exports = LoggerMiddleware;
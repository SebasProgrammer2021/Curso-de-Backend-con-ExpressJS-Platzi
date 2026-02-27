const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use('/api', routes); //se usa /api para diferenciar las rutas de la API de otras posibles rutas del servidor, como por ejemplo una ruta para servir archivos estáticos o una ruta para la página de inicio del sitio web. tambien se usa para manejar versiones de la API, por ejemplo /api/v1, /api/v2, etc.

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de usuarios' });
});

module.exports = app;
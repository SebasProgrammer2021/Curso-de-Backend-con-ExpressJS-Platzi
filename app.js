require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs'); //modulo para trabajar con archivos file system
const path = require('path'); //modulo para trabajar con rutas de archivos
const usersFilePath = path.join(__dirname, 'users.json'); //ruta del archivo users.json, configuración para poder acceder a él desde cualquier parte del proyecto

const app = express();
// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
      <h1>Curso de expressjs platzi v3</h1>
      <p>Bienvenido al curso de expressjs platzi</p>
      <p>esto es una app node.js con expressjs</p>
      <p>corre en el puerto ${PORT}</p>
      
      `);
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Mostrando información del usuario con ID: ${userId}`);
});

app.get('/search', (req, res) => {
  const terms = req.query.termino || 'No se proporcionó un término de búsqueda';
  const category = req.query.categoria || 'Todas las categorías';

  res.send(`
    <h1>Resultados de búsqueda</h1>
    <p>Término de búsqueda: ${terms}</p>
    <p>Categoría: ${category}</p>
    `)
})

app.post('/form', (req, res) => {
  const name = req.body.nombre || 'No se proporcionó un nombre';
  const email = req.body.email || 'No se proporcionó un email';
  res.json({
    message: 'Formulario recibido',
    data: {
      name,
      email
    }
  });
});

app.post('/api/data', (req, res) => {
  const data = req.body

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'No se proporcionó ningún dato' });
  }

  res.status(200).json({
    message: 'Datos recibidos correctamente',
    data
  });
});

app.get('/users', (req, res) => {
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de usuarios' });
    }

    const users = JSON.parse(data);
    res.json(users);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})
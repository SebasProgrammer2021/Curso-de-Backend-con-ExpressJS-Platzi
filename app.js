require('dotenv').config();
const express = require('express');

const fs = require('fs'); //modulo para trabajar con archivos file system
const path = require('path'); //modulo para trabajar con rutas de archivos
const { validateUser, validateUniqueUser } = require('./validation');
const usersFilePath = path.join(__dirname, 'users.json'); //ruta del archivo users.json, configuración para poder acceder a él desde cualquier parte del proyecto

const app = express();
// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Validar que el ID sea único, que el nombre tenga al menos 3 caracteres y que el email sea un formato válido para crear un nuevo usuario.
app.post('/users', (req, res) => {
  const newUser = req.body;

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de usuarios' });
    }

    const users = JSON.parse(data);
    const uniqueUserValidation = validateUniqueUser(newUser, users);
    if (!uniqueUserValidation.isValid) {
      return res.status(400).json({ error: uniqueUserValidation.error });
    }
    users.push(newUser);

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al escribir en el archivo de usuarios' });
      }
      res.status(201).json({ message: 'Usuario agregado correctamente', user: newUser });
    });
  })
});

//actualizar un usuario existente, validando que el ID exista, que el nombre tenga al menos 3 caracteres y que el email sea un formato válido.
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  let updatedUser = req.body;

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de usuarios' });
    }

    let users = JSON.parse(data);

    const existingUser = users.find(u => u.id === userId);
    if (!existingUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Evitar cambiar el id
    // Si el cuerpo de la solicitud incluye un id diferente, rechazar la solicitud, la funcion call Object.prototype.hasOwnProperty.call se utiliza para verificar si el objeto updatedUser tiene una propiedad 'id' y si su valor es diferente al userId extraído de la URL. Si ambas condiciones se cumplen, significa que el cliente está intentando cambiar el ID del usuario, lo cual no está permitido, por lo que se devuelve un error 400 con un mensaje explicativo.
    if (Object.prototype.hasOwnProperty.call(updatedUser, 'id') && updatedUser.id !== userId) {
      return res.status(400).json({ error: 'No está permitido cambiar el ID del usuario' });
    }

    // Merge: conservar id del usuario existente y aplicar cambios (usando la misma variable updatedUser)
    updatedUser = { ...existingUser, ...updatedUser, id: existingUser.id };

    // Validar el usuario resultante
    const validation = validateUser(updatedUser);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }

    users = users.map(u => (u.id === userId ? updatedUser : u));
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al escribir en el archivo de usuarios' });
      }
      res.json({ message: 'Usuario actualizado correctamente', user: updatedUser });
    });
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de usuarios' });
    }

    //json.parse(data) convierte la cadena JSON leída del archivo users.json en un array de objetos JavaScript (usuarios). Luego, se utiliza el método filter para crear un nuevo array que excluye al usuario con el ID especificado (userId).
    let users = JSON.parse(data);
    users = users.filter(user => user.id !== userId);

    //json.stringify(users, null, 2) convierte el array de usuarios actualizado a una cadena JSON con formato legible (con indentación de 2 espacios) para escribirlo nuevamente en el archivo users.json. 
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al escribir en el archivo de usuarios' });
      }

      //se envia 204 no content, indicando que la solicitud se ha procesado correctamente pero no hay contenido que devolver. Esto es apropiado para una operación de eliminación exitosa, ya que el recurso ha sido eliminado y no hay información adicional que proporcionar en la respuesta. 
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})
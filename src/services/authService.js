const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs'); // librería para hashear contraseñas
const jwt = require('jsonwebtoken'); //librería para generar y verificar tokens JWT

const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // hasheamos la contraseña
  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword, name, role: 'USER' }
  });
  return newUser;
};

// Función para iniciar sesión y generar un token JWT
const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Comparamos la contraseña proporcionada con la contraseña hasheada almacenada en la base de datos
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid email or password');
  }

  // Generamos un token JWT con el ID del usuario y su rol, usando una clave secreta y estableciendo una expiración de 1 hora
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};

module.exports = {
  registerUser,
  loginUser
};


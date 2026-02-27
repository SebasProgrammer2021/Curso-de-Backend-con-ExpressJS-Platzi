const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await registerUser(name, email, password);
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(401).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

module.exports = {
  register,
  login
};
function isValidEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

function isValidName(name) {
  return typeof name === 'string' && name.length >= 3;
}

function isUniqueId(id, users) {
  return !users.some(user => user.id === id);
}

const isNumericId = (id) => {
  return typeof id === 'number' && !isNaN(id);
}

const validateUniqueUser = (user, users) => {
  const { id } = user;
  const validation = validateUser(user, users);
  if (!validation.isValid) {
    return { isValid: false, error: validation.error };
  }
  if (!isUniqueId(id, users)) {
    return { isValid: false, error: 'El ID del usuario ya existe' };
  }
  return { isValid: true };
}

// Función para validar un nuevo usuario, verificando el nombre, email y ID 
function validateUser(user) {
  const { name, email, id } = user;
  if (!isValidName(name)) {
    return {
      isValid: false,
      error: 'El nombre debe tener al menos 3 caracteres.'
    };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, error: 'El correo electrónico no es válido.' };
  }

  if (!isNumericId(id)) {
    return { isValid: false, error: 'El ID debe ser numérico' };
  }
  return { isValid: true };
}

module.exports = {
  isValidEmail,
  isValidName,
  isUniqueId,
  validateUser,
  validateUniqueUser
};
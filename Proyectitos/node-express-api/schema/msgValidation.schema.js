const msgValidation = (type, nameToRef, length = "") => {
  const messages = {
    exists: `Propiedad ${nameToRef} debe existir.`,
    notEmpty: `El ${nameToRef} es obligatorio.`,
    isEmail: `Debe ser un ${nameToRef} válido.`,
    isLength: `El ${nameToRef} debe tener una longitúd válida. ${length} caracteres.`,
    isNumeric: `El ${nameToRef} debe tener un número válido. Entre ${length}.`,
  };

  return messages[type];
};

module.exports = { msgValidation };

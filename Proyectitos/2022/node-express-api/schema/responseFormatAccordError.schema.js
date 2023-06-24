const responseFormatAccordError = {
  ERROR_CREATE_ITEM: "ERROR_CREATE_ITEM - Ocurrió un problema al crear un item.",
  ERROR_DELETE_ITEM: "ERROR_DELETE_ITEMS - Ocurrió un problema al eliminar el item.",
  ERROR_GET_SIMPLE_ITEM: "ERROR_GET_SIMPLE_ITEM - Ocurrió un problema al obtener el item solicitado.",
  ERROR_ID_TOKEN: "ERROR_ID_TOKEN - Ocurrió un problema con el usuario que está intentando realizar esta acción.",
  ERROR_LIST_ITEMS: "ERROR_LIST_ITEMS - Ocurrió un problema al obtener la lista.",
  ERROR_LOGIN_USER: "ERROR_LOGIN_USER - Ocurrió un problema al iniciar sesión.",
  ERROR_REGISTER_USER: "ERROR_REGISTER_USER - Ocurrió un problema al registrar un usuario.",
  ERROR_UPDATE_TRACK: "ERROR_UPDATE_TRACK - Ocurrió un problema al actualizar el track solicitado.",
  ERROR_UPDATE_TRACK_NOT_EXIST: "ERROR_UPDATE_TRACK_NOT_EXIST - No se encontró el track para actualizar.",
  NEED_SESSION: "NEED_SESSION - No hay datos de autorización.",
  NO_PAYLOAD_DATA: "NO_PAYLOAD_DATA - Usuario no autorizado.",
  NOT_SESSION: "NOT_SESSION - Ocurrió un problema con tu sección.",
  PASSWORD_OR_USER_INVALID: "PASSWORD_OR_USER_INVALID - Usuario o password inválido.",
  USER_NOT_EXISTS: "USER_NOT_EXISTS - Usuario no existe.",
};

module.exports = { responseFormatAccordError };

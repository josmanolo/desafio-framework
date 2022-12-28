import { loggerError, loggerWarn } from "../config/log4.js";

const errorHandler = (error, req, res, next) => {
  const notFoundedErrors = [
    /* -------------------- Errores relacionados a productos -------------------- */
    'Error al insertar: uno o más campos quedaron vacíos.',
    'Error al listar: no se encontró el producto con el id indicado.',
    'Error al listar: no hay productos cargados en el sistema.',
    'Error al actualizar: uno o más campos quedaron vacíos.',
    'Error al actualizar: no se encontró el producto con el id indicado.',
    'Error al borrar: no se encontró el producto con el id indicado.',
  ];
  if (notFoundedErrors.includes(error)) {
    res.status(404);
    loggerWarn.warn(error);
  } else {
    res.status(500);
    loggerError.error(error);
  }
  return res.json({ error });
};

export default errorHandler;
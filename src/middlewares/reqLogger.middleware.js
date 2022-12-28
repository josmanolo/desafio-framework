import { loggerInfo, loggerWarn } from '../config/log4.js';

const requestsLogger = async (ctx, next) => {
  await next();
  const msg = `Ruta: "${ctx.url}" | Método: "${ctx.method}" | Respuesta HTTP: "${ctx.status}"`;
  if (ctx.status !== 404) {
    loggerInfo.info(msg);
  } else {
    loggerWarn.warn(msg);
  }
};

export default requestsLogger;
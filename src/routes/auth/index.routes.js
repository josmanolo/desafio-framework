import Router from 'koa-router';
import loginRouter from './login.routes.js';
import signupRouter from './signup.routes.js';
import logoutRouter from './logout.routes.js';

const router = Router();

//Obtiene todas las subrutas de los diferentes ficheros y las engloba en router.
router.use(loginRouter);
router.use(signupRouter);
router.use(logoutRouter);

export default router;

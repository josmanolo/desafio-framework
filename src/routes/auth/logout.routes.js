import Router from 'koa-router';
import logoutController from '../../controllers/auth/logout.controller.js';
import authenticationMiddleware from '../../middlewares/auth/auth.middleware.js';

const router = Router();

/* ---------------------------- cierre de sesión ---------------------------- */
router.post('/logout', authenticationMiddleware, logoutController.postLogout);

export default router;
import Router from 'koa-router';
import authenticationMiddleware from '../middlewares/auth/auth.middleware.js';

const router = new Router();

router.get('/', authenticationMiddleware, async (ctx) => {
  await ctx.render('layouts/home.hbs', {
    email: ctx.req.email,
  });
});

export default router;

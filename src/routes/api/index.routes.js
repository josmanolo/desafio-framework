import Router from 'koa-router';
import productsRouter from './products.routes.js'
import fakerRouter from './fakeProducts.routes.js';
import randomsRouter from './randoms.routes.js';

const router = new Router({
  prefix: '/api',
});

//Obtiene todas las subrutas de los diferentes ficheros y las engloba en router.
router.use(productsRouter.routes());
router.use(fakerRouter.routes());
router.use(randomsRouter.routes());

export default router;

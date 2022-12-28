import Router from 'koa-router';
const router = Router();

router.get('*', (req, res) => {
  res.status(404).send('<h1>ERROR 404 - RUTA NO ENCONTRADA</h1>');
});

export default router;
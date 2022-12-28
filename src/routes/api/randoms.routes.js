import Router from 'koa-router';
import { fork } from 'child_process';
import parseArgs from 'minimist';

const router = new Router({
  prefix: '/randoms',
});

router.get('/', async (ctx) => {
  const { cant } = ctx.query;
  const pid = process.pid;
  const options = { default: { port: 8080 } };
  const args = parseArgs(process.argv.slice(2), options);

  const forkedProcess = fork('./src/utils/randomNumbers.js');
  forkedProcess.send(parseInt(cant || 1e6));
  forkedProcess.on('message', (randomNumbers) => {
    ctx.body = {
      status: 'success',
      port: args.port,
      pid,
      randomNumbers
    };
  });
});

export default router;

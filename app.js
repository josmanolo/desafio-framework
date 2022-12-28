import Koa from 'koa';
import { koaBody } from 'koa-body';
import serve from 'koa-static';
import hbs from 'koa-views-handlebars';
import CookieParser from 'koa-cookie-parser';
import path from 'path';
import requestsLogger from './src/middlewares/reqLogger.middleware.js'
import { COOKIES_SECRET, SESSION_SECRET, MONGO_URL } from './src/config/index.js';

import session from  'koa-session';

/* ---------------------------- routes importing ---------------------------- */
import homeRouter from './src/routes/home.routes.js';
import infoRouter from './src/routes/info.routes.js';

const app = new Koa();

/* -------------------------- template engine settings -------------------------- */ 
app.use(hbs(path.join(process.cwd(), '/src/views/'), {
  layoutsDir: path.join(process.cwd(), '/src/views/layouts'),
  partialDirs: path.join(process.cwd(), '/src/views/partials'),
  debug: false,
}))
  
/* -------------------------- middlewares settings -------------------------- */
app.use(CookieParser(COOKIES_SECRET));
app.use(serve(path.join(process.cwd(), '/public')));
app.use(koaBody());
app.use(requestsLogger);

/* ---------------------------- session settings ---------------------------- */
app.keys = [SESSION_SECRET]
app.use(session({}, app))


/* -------------------------- routes settings -------------------------- */
app.use(homeRouter.routes());
app.use(infoRouter.routes());

export default app;
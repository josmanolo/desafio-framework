import path from 'path';
const authenticationMiddleware = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next();
  }
  res.sendFile(path.join(process.cwd(), '/src/views/redirect401.html'));
};

export default authenticationMiddleware;
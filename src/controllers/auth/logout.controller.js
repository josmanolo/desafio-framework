import path from 'path';
import { loggerError } from '../../config/log4.js';

const logoutController = {
  postLogout: (req, res) => {
    const email = req.user.email;
    req.logout((err) => {
      if (err) {
        return loggerError.error(err.message);
      }
      req.session.destroy((err) => {
        if (!err) {
          res.status(200).render(
            path.join(process.cwd(), '/src/views/layouts/logout.hbs'),
            {
              email,
            }
          );
        } else {
          res.redirect('/');
        }
      });
    });
  },
};

export default logoutController;

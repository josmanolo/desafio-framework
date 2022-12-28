import DAOFactory from '../../persistency/DAO/DAOFactory.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { loggerError } from '../../config/log4.js';
import { PERSISTENCY } from '../../config/index.js';

let userDAO;

(async () => {
  try {
    userDAO = await DAOFactory.getPersistency('users', PERSISTENCY);
    return userDAO;
  } catch (error) {
    loggerError.error(error);
    throw `${error}`;
  }
})();

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const findOrCreateUser = async () => {
          const user = await userDAO.getUserByEmail({ email });
          if (user) {
            loggerError.error('Usuario ya existe');
            return done(null, false);
          }

          // creamos el usuario
          const newUser = {
            email,
            password: encryptPassword(password),
          };

          try {
            const createdUser = await userDAO.createUser(newUser);
            return done(null, createdUser);
          } catch (error) {
            loggerError.error(`Error creando el usuario: ${error}`);
            return done(error);
          }
        }
        process.nextTick(findOrCreateUser);
      } catch (error) {
        loggerError.error(`Falló el registro de usuario: ${error}`);
        return done(error);
      }
    }
  )
);

const comparePassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await userDAO.getUserByEmail({ email });
        if (!user) {
          loggerError.error('No existe el usuario con el mail indicado.');
          return done(null, false);
        }
        if (!comparePassword(user, password)) {
          loggerError.error('La contraseña no coincide.');
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        loggerError.error(`Error iniciando sesión: ${error}`);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await userDAO.getUserById(id);
  done(null, user);
});

export default passport;
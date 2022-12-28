import path from 'path';

const loginController = {
  getLogin: (req, res) => {
    //Si se golpea a la ruta /auth/login estando previamente logueado, esta redireccionará al inicio
    if (req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.status(200).sendFile(path.join(process.cwd(), '/src/views/login.html'));
    }
  },
  postLogin: (req, res) => {
    res.redirect('/');
  },
  getFailLogin: (req, res) => {
    //Credenciales inválidas
    res.status(200).sendFile(path.join(process.cwd(), '/src/views/loginFail.html'));
  },
};

export default loginController;

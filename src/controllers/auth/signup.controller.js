import path from 'path';

const signupController = {
  getSignup: (req, res) => {
    //Si se golpea a la ruta /auth/signup estando previamente logueado, esta redireccionará al inicio
    if (req.isAuthenticated()){
      res.redirect('/');
    }else{
      res.status(200).sendFile(path.join(process.cwd(), '/src/views/signup.html'));
    }
  },
  postSignup: (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/');
    }
  },
  getFailSignup: (req, res) => {
    //Usuario ya registrado
    res.status(200).sendFile(path.join(process.cwd(), '/src/views/signupFail.html'));
  },
};

export default signupController;

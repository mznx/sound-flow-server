import AuthController from './controllers/AuthController';

export default function (app) {
  app.get('/login', AuthController.login);
  app.get('/callback', AuthController.callback);
  app.get('/refresh_token', AuthController.refreshToken);
  app.get('/check_token', AuthController.checkToken);
}
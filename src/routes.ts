import AuthController from './controllers/AuthController';

export default function (app) {
  app.get('/auth/login', AuthController.login);
  app.get('/auth/callback', AuthController.callback);
  app.get('/auth/refresh_token', AuthController.refreshToken);
  app.get('/auth/check_token', AuthController.checkToken);
}
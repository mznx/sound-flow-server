import express from 'express';
import cors    from 'cors';
import config  from './config';
import routes  from './routes';

const port = process.env.PORT || config.port;
const app = express();

app.use(cors()).use((req, res, next) => {
  console.log('[Connect]');
  console.log(' from: ', req.ip);
  console.log(' path: ', req.path);
  console.log(' time: ', new Date().toISOString());
  next();
});

routes(app);

app.listen(port);
console.log(`[Start]\n port: ${port}\n time: ${new Date().toISOString()}`);
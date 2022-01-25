import express from 'express';
import config  from './config';
import routes  from './routes';

const port = process.env.PORT || config.port;
const app = express();

routes(app);

app.listen(port);
console.log(`[Start]\n port: ${port}\n time: ${new Date().toISOString()}`);
import express from 'express';
import config  from './config';

const port = process.env.PORT || config.port;
const app = express();

app.listen(port);
console.log(`[Start]\n port: ${port}\n time: ${new Date().toISOString()}`);
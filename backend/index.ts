import morgan from 'morgan';
import { connectToMongo } from './src/utils/config/db.config';
import router from './src/routes/index';

const express = require('express');

const PORT = process.env.APP_PORT ?? 3000;
const app = express();

app.use(morgan('dev'));

connectToMongo();

app.use('/', router);
app.listen(PORT, () => {
  console.log(`Server is running on APP_PORT ${PORT}`);
});

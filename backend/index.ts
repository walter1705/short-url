import morgan from 'morgan';
import path from 'path';
import { connectToMongo } from './src/utils/config/db.config';
import router from './src/routes/index';

const express = require('express');

const PORT = process.env.APP_PORT ?? 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

// CORS
app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serve static files from public directory
const publicPath = path.join(path.resolve(), '..', 'public');
app.use(express.static(publicPath));

// Serve index.html for root
app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(path.resolve(), '..', 'index.html'));
});

connectToMongo();

app.use('/', router);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

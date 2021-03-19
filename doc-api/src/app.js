import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import './database';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(8081);

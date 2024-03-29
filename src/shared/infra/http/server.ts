import 'reflect-metadata';
import { LoggerStream } from '@config/winston';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import 'express-async-errors';

import swaggerFile from '../documentation/swagger.json';
import globalErrorHandling from './middlewares/globalErrorHandling';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);
app.use(
  morgan('combined', {
    stream: new LoggerStream(),
  }),
);

app.use(globalErrorHandling);

app.listen(process.env.PORT || 3000, async () => {
  /* eslint-disable no-console */
  console.log(`🚀 Server started on port ${process.env.PORT || 3000}!`);
});

import 'reflect-metadata';
import '@di/index';
import express from 'express';
import UserRoutes from '@presentation/UserRoutes';
import { container } from 'tsyringe';
import errorMiddleware from '@middlewares/errorMiddleware';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(container.resolve(UserRoutes).router);
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log('Server is running on port 3000, localhost:3000');
});

import express, { Application, Request, Response } from 'express';
import { userRouter } from './app/modules/user/user.route';
const app: Application = express();

app.use(express.json());
app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server starting successfully!',
  });
});

export default app;

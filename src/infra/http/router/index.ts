import express, { type Request, type Response, type Express } from 'express';
import cors from 'cors';
import userRouter from './user-router';
import categoryRouter from './category-router';
import financialGoalsRouter from './financial-goals-router';
import transactionsRouter from './transaction-router';
import balanceRouter from './balance-router';
import { dispatchDomainEventsMiddleware } from '../../middlewares/dispatch-domain-events';
import authMiddleware from '../../middlewares/auth-middleware/auth-middleware';

const setupRoutes = (app: Express) => {
  app.use(express.json());
  app.use(
    cors({
      origin: '*',
      credentials: false,
    }),
  );

  app.use(dispatchDomainEventsMiddleware);

  app.get('/server-test', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!' });
  });
  app.use(authMiddleware)
  app.use(userRouter);
  app.use(categoryRouter);
  app.use(financialGoalsRouter);
  app.use(transactionsRouter);
  app.use(balanceRouter);
};

export default setupRoutes;

import { DomainEvents } from '../../../core/events/domain-events';
import type { Request, Response, NextFunction } from 'express';

export async function dispatchDomainEventsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.on('finish', async () => {
    try {
      await DomainEvents.dispatchAllEvents();
    } catch (error) {
      console.log('Error dispatching domain events:', error);
    }
  });

  next();
}

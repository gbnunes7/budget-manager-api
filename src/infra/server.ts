import { env } from './env';
import app from './app';
import setupRoutes from './http/router';
import { registerEventHandlers } from './events/register-event-handlers';

registerEventHandlers();

setupRoutes(app);

app.listen(env.PORT, () => {
  console.log(`Server is running on ${env.PORT}`);
});

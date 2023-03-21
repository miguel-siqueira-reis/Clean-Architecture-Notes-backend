import fastify from 'fastify';
import middlewares from './middlewares';
import routes from './routes';

const { LOGGER_SERVER } = process.env;

const app = fastify({
  logger: LOGGER_SERVER === 'true'
});

middlewares(app);
routes(app);

export { app };

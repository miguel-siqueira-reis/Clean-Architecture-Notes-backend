import { FastifyInstance } from 'fastify';
import { readdirSync } from 'fs';
import path from 'path';

export default (app: FastifyInstance): void => {
  readdirSync(path.resolve(__dirname, '..', 'routes')).map(async (file) => {
    if (
      file.includes('.spec.') ||
      file.includes('.test.') ||
      file.includes('.map')
    ) {
      return;
    }

    app.register(
      async (app) => {
        (await import(`../routes/${file}`)).default(app);
      },
      { prefix: '/api' }
    );
  });
};

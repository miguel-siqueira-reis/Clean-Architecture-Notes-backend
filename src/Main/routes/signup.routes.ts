import { FastifyInstance } from 'fastify';
import { adapterRouter } from '../adapters/adapterRouterFastify';
import { makeSingupController } from '../factories/signup/signupFactory';

export default (app: FastifyInstance) => {
  app.post('/auth/signup', adapterRouter(makeSingupController()));
};

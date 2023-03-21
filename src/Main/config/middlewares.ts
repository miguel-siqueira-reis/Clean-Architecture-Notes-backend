import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

export default (app: FastifyInstance) => {
  app.register(cors, {
    origin: '*'
  });
};

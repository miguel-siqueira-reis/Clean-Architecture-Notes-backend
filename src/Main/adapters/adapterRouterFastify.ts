import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller } from '../../Presentation/Protocols/Controller';
import { HttpRequest } from '../../Presentation/Protocols/Http';

export const adapterRouter =
  (controller: Controller) => async (req: FastifyRequest, reply: FastifyReply) => {
    const request: HttpRequest = {
      body: req.body
    };

    const res = await controller.handle(request);

    reply.status(res.statusCode).send(res.body);
  };

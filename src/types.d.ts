import "@fastify/cookie";
import type { FastifyReply, FastifyRequest } from "fastify";
import "jeasx/serverless";

type RouteProps = {
  request?: FastifyRequest;
  reply?: FastifyReply;
};

type ThisContext = RouteProps & {
  // add additional attributes
};

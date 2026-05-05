import type { FastifyReply, FastifyRequest } from "fastify";
import { database } from "../database/database.js";

export async function checkSessionId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sessionId } = request.cookies;

  if (!sessionId) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  const user = await database("users").where({ session_id: sessionId }).first();

  if (!user) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  request.user = user;
}

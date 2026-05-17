import type { FastifyInstance } from "fastify";
import z from "zod";
import { randomUUID } from "node:crypto";
import { database } from "../database/database.js";
import { checkSessionId } from "../middlewares/check-session-id.js";

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    "/meals",
    { preHandler: [checkSessionId] },
    async (request, reply) => {
      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        date_time: z.string().datetime(),
        is_on_diet: z.boolean(),
      });

      const { name, description, date_time, is_on_diet } =
        createMealBodySchema.parse(request.body);

      await database("meals").insert({
        id: randomUUID(),
        user_id: request.user!.id,
        name,
        description,
        date_time,
        is_on_diet,
      });

      return reply.status(201).send();
    },
  );
}

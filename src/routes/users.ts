import type { FastifyInstance } from "fastify";
import z from "zod";
import { randomUUID } from "node:crypto";
import { database } from "../database/database.js";


export async function usersRoutes(app: FastifyInstance) {
    app.post("/users", async (request, reply) => {
        const createUserBodySchema = z.object({
            name: z.string(),
        });

        const { name } = createUserBodySchema.parse(request.body);

        const sessionId = randomUUID();

        await database("users").insert({
            id: randomUUID(),
            name,
            session_id: sessionId,
        });

        reply.setCookie('sessionId', sessionId, {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
        });

        return reply.status(201).send();
    });
}
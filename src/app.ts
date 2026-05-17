import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { healthCheck } from "./routes/health-check.js";
import { usersRoutes } from "./routes/users.js";
import { mealsRoutes } from "./routes/meals.js";

const app = fastify();

app.register(cookie)
app.register(healthCheck)
app.register(usersRoutes)
app.register(mealsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ error: 'Validation error', issues: error.issues })
  }
  reply.status(500).send({ error: 'Internal server error' })
})

export default app;

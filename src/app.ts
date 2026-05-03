import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { healthCheck } from "./routes/health-check.js";
import { usersRoutes } from "./routes/users.js";

const app = fastify();

app.register(cookie)
app.register(healthCheck)
app.register(usersRoutes)

export default app;

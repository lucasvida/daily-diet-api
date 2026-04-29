import fastify from 'fastify'
import { healthCheck } from "./routes/health-check.js";

const app = fastify();

app.register(healthCheck)

export default app;

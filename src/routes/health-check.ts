import type { FastifyInstance } from "fastify";

export const healthCheck = async (app: FastifyInstance) => {
    app.get('/health', async () => {
        return {
            message: 'Daily Diet API is running'
        }
    });
};
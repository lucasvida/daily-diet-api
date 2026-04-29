import app from "./app.js"

const server = app.listen({
    port: 3333,
}).then(() => {
    console.log('Server running on port 3333')
});

export default server;
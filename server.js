import express from 'express';
import next from 'next';

const baseUrl = '/tools/v2';

const app = next({ dev: true });
const handleNextRequest = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // reroute /tools/v2/_next/* to /_next/*
    server.get(`${baseUrl}/_next/*`, pulseBaseUrlMiddleware(baseUrl), (req, res) => {
        const pathname = req.pulsePath;
        handleNextRequest(req, res, { pathname });
    });

    // pass other requests to next.js
    server.get('*', (req, res) => {
        const pulsePath = req.path.replace('/tools/v2', '');
        app.render(req, res, pulsePath || '/');
    });

    const port = 8080;
    server.listen(port, () => {
        console.log(`server up on port: ${port}`);
    });
});

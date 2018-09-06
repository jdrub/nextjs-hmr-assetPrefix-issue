import express from 'express';
import next from 'next';

const app = next({ dev: true });
const handle = app.getRequestHandler();
const { parse } = require('url')

const basePath = '/a/b';
const removeBasePath = url => url.replace(basePath, '');

app.prepare().then(() => {
    const server = express();

    server.get(`${basePath}/_next/*`, (req, res) => {
        const parsedUrl = parse(removeBasePath(req.url) || '/', true);
        handle(req, res, parsedUrl);
    });

    server.get('*', (req, res) => {
        app.setAssetPrefix(`http://localhost:3001${basePath}`);

        const parsedUrl = parse(removeBasePath(req.url) || '/', true);
        handle(req, res, parsedUrl);
    });

    const port = 8080;
    server.listen(port, () => {
        console.log(`server up on port: ${port}`);
    });
});

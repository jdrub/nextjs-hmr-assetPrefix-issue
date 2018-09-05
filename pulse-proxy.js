const express = require('express');
const request = require('request');

const server = express();

const proxyHandler = (req, res) => {
    req.pipe(request(`http://localhost:8080`.concat(req.originalUrl))).pipe(res);
};

server.get('/tools/v2*', proxyHandler);
server.post('/tools/v2*', proxyHandler);

const port = 3001;
server.listen(port, () => {
    console.log('proxy up on port: ', port);
});

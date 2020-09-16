const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = '0.0.0.0';
const port = 8080;

const authorizationhost = 'kheopsauthorization';
const authorizationPath = '/authorization';
const authorizationPort = 8080;

const albumIdMedirad = process.argv.slice(2)[0];
const welcomeBotToken = fs.readFileSync('/run/secrets/welcomebot_token', 'utf8').trim();

const server = http.createServer((request, res) => {
    if (request.method === 'POST') {
        console.info(`request for ${request.url}`);
        const { user } = url.parse(request.url, true).query;

        path = `/albums/${albumIdMedirad}/users/${user}`

        const options = {
            host: authorizationhost,
            port: authorizationPort,
            path: `${authorizationPath}${path}`,
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${welcomeBotToken}`,
            },
        };

        http.request(options, (response) => {
            res.statusCode = 204;
            res.end();
        }).on('error', (err) => {
            res.statusCode = 500;
            res.end();
            console.info(`Error: ${err.message}`);
        }).end();
        
    } else {
        res.statusCode = 405;
        res.end();
    }
})

server.listen(port, hostname, () => {
    console.info(`Server running at http://${hostname}:${port}/`);
});

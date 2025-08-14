import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename, __dirname);

const server = http.createServer(async (req, res) => {
    //res.setHeader('Content-type', 'text/html');
    //res.statusCode = 404;
    //res.end('<h1>hello world</h1>');
    console.log(req.url);
    console.log(req.method);

    // res.writeHead(500, { 'content-type': 'application/json'});
    // res.end(JSON.stringify({message: 'server error'}));

    try {
        if (req.method === 'GET') {
            let filePath;
            if (req.url === '/'){
//                res.writeHead(200, { 'content-type': 'text/html'});
//                res.end('<h1>homepages</h1>');
                filePath = path.join(__dirname, 'public', 'index.html');
            } else if (req.url === '/about') {
//                res.writeHead(200, {'content-type': 'text/html'});
//                res.end('<h1>about</h1>');
                filePath = path.join(__dirname, 'public', 'about.html');
            } else {
                // res.writeHead(404, {'content-type': 'text/html'});
                // res.end('<h1>not found</h1>');
                throw new Error ('Not found');
            };

            const data = await fs.readFile(filePath);
            res.setHeader('Content-type', 'text/html');
            res.write(data);
            res.end();

        } else {
            throw new Error('Method not allowed');
        }
    } catch (error) {
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('Server error');
    }
});

server.listen(PORT, () => {
    console.log(`running server port ${PORT}`);
});
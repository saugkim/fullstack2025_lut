import {createServer} from 'http'
const PORT = process.env.PORT

const users = [
    {id:1, name: "jone doe"},
    {id:2, name: "jane bae"},
    {id:3, name: "james cal"}
];

//logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); 
};

//json middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-type', 'application/json');
    next();
};

//Route handler for GET /api/users
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
};

//Route handler for GET /api/users/id
const getUserByHandler = (req, res) => {
    const id = req.url.split('/')[3];
    const user = users.find(user => user.id === parseInt(id));

    if (user) {
        res.write(JSON.stringify(user));
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({message: "user not found"}));
    }
    res.end();
};

// Route handler for POST /api/users
const createUserHandler = (req, res) => {
    let body = "";
    // listen for data
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    // listen 
    req.on('end', () => {
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        res.end();
    });
};

//not found handler for GET 
const notFoundhandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({message: "Route not found"}));
    res.end();
;}


const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {

            if(req.url === '/api/users' && req.method === 'GET') {
                // res.setHeader('Content-Type', 'application/json');
                getUsersHandler(req, res);
                // res.write(JSON.stringify(users));
                // res.end();
            } else if ( req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
                // res.setHeader('Content-Type', 'application/json');
                getUserByHandler(req, res);
                // if (user) {
                //     res.write(JSON.stringify(user));
                // } else {
                //     res.statusCode = 404;
                //     res.write(JSON.stringify( {message: 'user not found'}));
                // }
                // res.end();
            } else if (req.url === '/api/users' && req.method === 'POST') {
                createUserHandler(req, res);    
            } else {
                notFoundhandler(req, res);
                // res.setHeader('Content-Type', 'application/json');
                // res.statusCode = 404;
                // res.write(JSON.stringify( {message: 'route not found'}));
                // res.end();
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(PORT);
});
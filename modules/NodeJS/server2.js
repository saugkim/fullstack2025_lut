import {createServer} from 'http'
const PORT = process.env.PORT

const users = [
    {id:1, name: "jone doe"},
    {id:2, name: "jane bae"},
    {id:3, name: "james cal"}
];

const server = createServer(( req, res) => {
     res.setHeader('Content-Type', 'application/json');
     
    if(req.url === '/api/users' && req.method === 'GET') {       
        res.write(JSON.stringify(users));
        res.end();
    } else if ( req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        const user = users.find(user => user.id === parseInt(id));
    //    res.setHeader('Content-Type', 'application/json');
        if (user) {
            res.statusCode = 200;
            res.write(JSON.stringify(user));
        } else {
            res.statusCode = 404;
            res.write(JSON.stringify( {message: 'user not found'}));
        }
        res.end();
    } else {
    //    res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.write(JSON.stringify( {message: 'route not found'}));
        res.end();
    }
});

server.listen(PORT, () => {
    console.log('ye');
});
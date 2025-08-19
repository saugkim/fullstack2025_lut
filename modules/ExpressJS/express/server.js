import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import posts from './route/posts.js'
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js';
import notFoundError from './middleware/notFound.js';

const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();
app.use(express.json({allowEmptyBody: true}));
app.use(express.urlencoded({extended: true}));
app.use(logger);

app.use(express.static(path.join(__dirname, 'public' )));


//Logger middleware 


//setup static folder - middleware for routing
//app.use(express.static(path.join(__dirname, 'public' )));
// app.get("/", (req, res) => {
// //    const hello = "Hello World";
// //    res.send(hello);
// //    res.send(`<h1>${hello}</h1>`);
// //    res.send({message: hello});
//     res.sendFile(path.join(__dirname, "public", "index.html"));  
// });
// app.get("/about", (req, res)=> {
//     res.sendFile(path.join(__dirname, 'public', 'about.html'));
// });


//body parser middleware


// Router
app.use('/api/posts', posts);
// let posts = [
//     {id:1, title: "post1"}, {id:2, title:"post2"}, {id:3, title: "post3"}, {id:4, title:"post4"}
// ]
// //get all posts or posts with matching query
// app.get("/api/posts", (req, res) => {
//     console.log(req.query);
//     const limit = parseInt(req.query.limit);
//     if (!isNaN(limit) && limit > 0) {
//         return res.status(200).json(posts.slice(0, limit));
//     } 
//     res.status(200).json(posts); 
// });

// //get a single post
// app.get('/api/posts/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const post = posts.find((post) => post.id === id);

//     if (!post) {
//         return res.status(404).json({message:`post with the id of ${id} was not found`});
//     } 
    
//     res.status(200).json(post); 
// });



// Error Handling
app.use(notFoundError);
app.use(errorHandler);


app.listen(PORT, "localhost", () => {
    console.log(`server is running on port: ${PORT}`);
});
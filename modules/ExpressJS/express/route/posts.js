import express from 'express';
import { getPost, getPosts, createPost, updatePost, deletePost } from '../controller/postController.js'

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);


// let posts = [
//     {id:1, title: "post1"}, {id:2, title:"post2"}, {id:3, title: "post3"}, {id:4, title:"post4"}
// ]

// //get all posts or posts with matching query
// router.get('/', (req, res, next) => {
//     console.log(req.query);
//     const limit = parseInt(req.query.limit);

//     if (!isNaN(limit) && limit > 0) {
//         return res.status(200).json(posts.slice(0, limit));
//     } 
//     res.status(200).json(posts); 
// });

// //get a single post
// router.get('/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const post = posts.find((post) => post.id === id);

//     if (!post) {
//         const error = new Error(`post with the id of ${id} was not found -- get`);
//         error.status = 404;
//         return next(error);
// //        return res.status(404).json({message:`post with the id of ${id} was not found`});
//     } 
    
//     res.status(200).json(post); 
// });

// //Create a new post
// router.post('/', (req, res, next) => {
//     console.log(req.body);

//     const newPost = {
//         id: posts.length+1,
//         title: req.body.title
//     }
//     if (!newPost.title) {
//         const error = new Error("please include a title");
//         error.status=400;
//         return next(error);
// //        return res.status(400).json({message: "please include title"});
//     }

//     posts.push(newPost);
//     res.status(201).json(posts);
// });

// //update
// router.put('/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const post = posts.find((post) => post.id === id);
//     if(!post) {
//         const error = new Error(`post with id of ${id} not found for update`);
//         error.status = 404;
//         return next(error);
// //        new Error(`post with the id of ${id} was not found`);
// //        return res.status(404).json({message: `post with id of ${id} not found`});
//     }
//     post.title = req.body.title;
//     res.status(200).json(posts);
// });

// //delete
// router.delete('/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const post = posts.find((post) => post.id === id);
//     if(!post) {
//         const error = new Error(`post with id of ${id} not found for update`);
//         error.status = 404;
//         return next(error);
// //        return res.status(404).json({message: "not found"});
//     }
//     posts.filter((post) => post.id !== id);
//     res.status(200).json(posts);
// })


export default router;
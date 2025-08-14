console.log('hello')
// import { getPosts } from './postController.js';
import getPosts from "./postController.js";

//const {generateRandomNumber, number2} = require('./utils');
//console.log(generateRandomNumber());

getPosts().forEach(element => {
    console.log(element);
});

console.log(getPosts());
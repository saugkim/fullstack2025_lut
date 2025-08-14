//import fs from 'fs'

// //readFile() - callback
// fs.readFile('./test.txt','utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// //readFileSync() =synchronous version
// const data = fs.readFileSync('./test.txt', 'utf8');
// console.log(data);


import fs from 'fs/promises'
fs.readFile('./test.txt', 'utf8')
   .then((data) => console.log(data))
   .catch((err) => console.log('hello there'));

const readFile = async () => {
    try {
        const data = await fs.readFile('./test.txt', 'utf8');
        console.log(data);
    } catch (error) {
        console.log(error);
    };
};


//writeFile fs
const writeFile = async () => {
    try {
        await fs.writeFile('./test.txt', 'hello I am here can you see that?');
        console.log('file written to ....');
    } catch (error) {
        console.log(error);
    }
};

// appendFile()
const appendFile = async () => {
    try {
        await fs.appendFile('./test.txt', '\n am adding new line here');
        console.log('file appending to ....');
    } catch (error) {
        console.log(error);
    }
};

writeFile();
appendFile();
readFile();
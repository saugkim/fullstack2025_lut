import { EventEmitter } from 'events';


const myEmitter = new EventEmitter();

function greetingHandler(name) {
    console.log(`hi ${name}`);
}

function goodbyeHandler() {
    console.log('bye');
}

//register event listners
myEmitter.on('greet', greetingHandler);
myEmitter.on('goodbye', goodbyeHandler);


//emit events
myEmitter.emit('greet', 'John');
myEmitter.emit('goodbye');

//error handling
myEmitter.on('error', (err) => {
    console.log('error occurrd', err);
});

//simulate error
myEmitter.emit('error', new Error('something went wrong'));



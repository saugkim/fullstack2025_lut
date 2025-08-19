import express from 'express';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('index', {
        title: "Welcomm to my world",
        message: "hellow from ejs",
        people: ['jack', 'jane', 'james']
    });

});

app.listen(8000, () => {
    console.log("server runnning");
});
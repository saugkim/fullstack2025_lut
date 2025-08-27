import express from 'express'
import colors from 'colors'
import goalRouter from './routes/goalRoutes.js'
import userRouter from './routes/userRoutes.js';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors'

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors({
    origin: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("welcome");
});

app.use('/api/goals', goalRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

app.listen(
    port, 
    () => console.log(`server started on port ${port}`)
);


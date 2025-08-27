import mongoose from 'mongoose';

const uri = process.env.MONGO_URI

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underLine);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB; 


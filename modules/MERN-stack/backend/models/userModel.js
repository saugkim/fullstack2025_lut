import mongoose from "mongoose"


const userSchema = mongoose.Schema(
    { 
        name: {
            type: String,
            require: [true, 'Please add a name']
        },
        email: {
            type: String,
            require: [true, 'Please add a email address'],
            unique: true
        },
        password: {
            type: String,
            require: [true, 'Please add a password']
        },
    },
    {
        timestamps: true
    },
);

export const User = mongoose.model('User', userSchema)

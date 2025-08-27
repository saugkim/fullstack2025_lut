import mongoose from "mongoose"


const goalSchema = mongoose.Schema(
    { 
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text: {
            type: String,
            require: [true, 'Please add a text value']
        },
    },
    {
        timestamps: true
    },
);

export const Goal = mongoose.model('Goal', goalSchema)




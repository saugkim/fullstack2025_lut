import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler'

import { User } from '../models/userModel.js';



//@desc   register new user
//@route  POST /api/users
//@access public
export const registerUser = asyncHandler(async (req, response, next) => {
    
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        response.status(400);
        throw new Error('please add all fields');
    }
    
    const userExists = await User.findOne({email});
    
    if (userExists) {
        response.status(400);
        throw new Error('User already exists');
    }

    //hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword
    })

    if (user) {
        response.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.emall,
            token: generateToken(user._id)
        })
    } else {
        response.status(400);
        throw new Error('Invalid user');
    }        
});


//@desc   Authenticate a user
//@route  POST /api/users/login
//@access public
export const loginUser = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })  
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


//@desc   Get user data
//@route  GET /api/users/me
//@access private
export const getMe = asyncHandler (async (req, res, next) => {
    console.log(`Getting user ...`);
    res.status(200).json(req.user);

    // auth middleware do this "protection" !!
    // const {_id, name, email} = await User.findById(req.user.id)
    // res.status(200).json({
    //     id: _id,
    //     name,
    //     email
    // })
})

//generate JWT
export const generateToken = (id) => {
    return jwt.sign( 
        {id}, 
        process.env.JWT_SECRET, 
        { expiresIn: '30d'}
    );
}


//npm i jsonwebtoken
//npm i bcryptjs
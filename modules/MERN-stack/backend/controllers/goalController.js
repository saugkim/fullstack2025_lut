import { Goal } from '../models/goalModel.js';
import asyncHandler from 'express-async-handler'

// piti teha jotain below 2 lines -- solved 
//import { asyncHandler } from 'express-async-handler'
//const asyncHandler = require('express-async-handler')


//@desc   get goals
//@route  GET /api/goals
//@access private
export const getGoals = asyncHandler (async (req, res) => {
    console.log({message: `Get Goals...`})

    const goals = await Goal.find({user: req.user.id});
    res.status(200).json(goals);
});


//@desc   set goal
//@route  POST /api/goals/
//@access private
export const setGoal = asyncHandler (async (req, res) => {
    console.log({message: `Set Goal...`})

    if (!req.body.text) {
        res.status(400);
        throw new Error('please add a text')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    
    res.status(200).json(goal);
});


//@desc   update goal
//@route  PUT /api/goals/:id
//@access private
export const updateGoal = asyncHandler( async (req, res) => {
    console.log(`Update Goal ${req.params.id}`);

    const goal = await Goal.findById(req.params.id);
    console.log(goal);

    if(!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }
    
    //const user = await User.findById(req.user.id);
    
    //check user
    if(!req.user) {
        res.status(401)
        throw new Error('user not found')
    }
    //make sure only logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    console.log(req.body);

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, 
        {new: true});

    res.status(200).json(updatedGoal);
});


//@desc   delete goal
//@route  DELETE /api/goals/:id
//@access private
export const deleteGoal = asyncHandler (async (req, res) => {
    console.log(`Deleting Goal ${req.params.id} ...`);

    const goal = await Goal.findById(req.params.id);

    if(!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }
    
    //check user from middleware (req.user)
    if(!req.user) {
        res.status(401)
        throw new Error('user not found')
    }
    
    //make sure only logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    await goal.deleteOne();

    res.status(200).json({ id: req.params.id });
});


//npm i express-async-handler ** installed
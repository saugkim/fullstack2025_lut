import express from 'express'
import {getGoals,setGoal,updateGoal,deleteGoal} from '../controllers/goalController.js'
import {protect} from '../middleware/authMiddleware.js'

const goalRouter = express.Router()

goalRouter.route('/').get(protect, getGoals).post(protect, setGoal);
goalRouter.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

export default goalRouter;

// router.get('/', getGoals);
// router.post('/', setGoal);
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)


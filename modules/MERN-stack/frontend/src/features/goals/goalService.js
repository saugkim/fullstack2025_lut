import axios from 'axios'

const API_URL = '/api/goals/'

//Create goal 
const createGoal = async (goalData, token) => {
    
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    const response = await axios.post(
        API_URL, 
        goalData, 
        config
    );
    
    return response.data;
}

//Get Goals
const getGoals = async (token) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    console.log(`console: get goals token: ${token}`)

    const response = await axios.get(API_URL, config);
    
    console.log(`console: after getting axios.get()`);
    return response.data;
}


//update goal
const updateGoal = async (goalId, data, token) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    const response = await axios.put(API_URL+goalId, data, config);
    return response.data;

}

//delete goal
const deleteGoal = async (goalId, token) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    const response = await axios.delete(API_URL+goalId, config);
    return response.data;
}

const goalService = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal
}

export default goalService;

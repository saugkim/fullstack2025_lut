import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService.js'


const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createGoal = createAsyncThunk(
    'goals/create', 
    async (goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.createGoal(goalData, token);
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message ) || e.message || e.toString();
            return thunkAPI.rejectWithValue(message);
        }
    })

export const getGoals = createAsyncThunk(
    'goals/getAll',
    async (_, thunkAPI) => {
         try {
            const token = thunkAPI.getState().auth.user.token;
            console.log(token);
            return await goalService.getGoals(token);
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message ) || e.message || e.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//delete goal
export const deleteGoal = createAsyncThunk(
    'goals/delete',
    async (id, thunkAPI) => {
         try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.deleteGoal(id, token);
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message ) || e.message || e.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)
//update goal
export const updateGoal = createAsyncThunk(
    'goals/update',
    async (id, goalData, thunkAPI) => {
         try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.updateGoal(id, goalData, token);
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message ) || e.message || e.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const goalSlice = createSlice({
    name: 'goals',

    initialState,
    
    reducers: {
        reset: (state) => {
            state.goals = []
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) =>{
                state.isLoading =true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message=action.payload
            })
            .addCase(getGoals.pending, (state) =>{
                state.isLoading =true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) =>{
                state.isLoading =true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((g) => g._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // .addCase(updateGoal.pending, (state) =>{
            //     state.isLoading =true
            // })
            // .addCase(updateGoal.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     state.goals = state.goals.map((g) => g._id === action.payload.id ? g=action.payload : g)
            // })
            // .addCase(updateGoal.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.isError = true
            //     state.message = action.payload
            // })
    }
})

export const {reset} =goalSlice.actions;
export default goalSlice.reducer

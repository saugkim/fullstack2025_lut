import {useState} from 'react'
import {useDispatch} from 'react-redux'
//import {updateGoal} from '../features/goals/goalSlice.js'

function GoalUpdatingForm({goalID}) {

    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        // dispatch(updateGoal(goalID, text));
        setText('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit} >
                <div className="form-group">
                    <label htmlFor="text"> Goal</label>
                    <input 
                        type="text" 
                        name='text' 
                        id='text' 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}>
                    </input>
                </div>
                <div className="form-group">
                    <button 
                        className='btn'
                        type='submit'> 
                            UPDATE
                    </button>
                    <button 
                        className='btn'
                        onClick={() => {return }}> 
                            CANCEL
                    </button>
                </div>
            </form>
        </section>    
    )
}


export default GoalUpdatingForm
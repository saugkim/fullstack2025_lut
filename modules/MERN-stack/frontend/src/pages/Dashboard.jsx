import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner.jsx'
import GoalForm from '../components/GoalForm.jsx'
import { getGoals, reset} from '../features/goals/goalSlice.js'
import GoalItem from '../components/GoalItem.jsx'


function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {user} = useSelector((state) => state.auth)
  console.log('user state')
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)
  console.log('goals state', goals)


  useEffect(() => {

      if (!user) {
        console.log("first in useEffect")
        navigate('/login')
      }


      if (isError) {
        console.log("second isError?");
        console.log(message)
      }
      
      dispatch(getGoals())

      // return () => {
      //   console.log("return in useEffect?")
      //   dispatch(reset())
      // }

    }, [user, navigate, isError, message, dispatch] ) 
  
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        { goals.length >0 ? (
          <div>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : ( <h3>you have not set any goals</h3>)} 
      </section>
    </>
  )
}

export default Dashboard
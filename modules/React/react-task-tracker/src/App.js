import { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'


const tdata = [
    {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: true
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "Feb 6th at 1:30pm",
      reminder: true
    },
    {
      id: 3,
      text: "Food shopping",
      day: "Feb 5th at 2:30pm",
      reminder: false
    },
  ]


function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async() => {
      const tasksFromJsonDB = await fetchTasks();
      setTasks(tasksFromJsonDB)  
    }

    getTasks()
  }, [])
  

  //Fetch tasks
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    console.log(data)
    return data
  }

  //Fetch task
  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    console.log(data)
    return data
  }

  //Add task
  const addTask = async (task) => {
    console.log('adding new task ...', task)
    
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)  
    })

    const data = await res.json()
    setTasks([...tasks, data])
  
    // const id = Math.floor(Math.random() *10000) + 1
    // const newTask = {id, ...task}
    //setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = async (id) => {
      console.log("deleting ...", id)

      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE'
      })

      setTasks(tasks.filter((t) => t.id !== id));
  } 

  //Update Task, Toggle reminder
  const toggleReminder = async (id) => {
    console.log('toggling...', id)
//    const old = await fetch(`http://localhost:5000/tasks/${id}`)
//    const task = await old.json()
//    task.reminder = !task.reminder
    const task = await fetchTask(id);
    const updated = { ...task, reminder: !task.reminder}

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updated)  
    })
    
    setTasks(
      tasks.map((t) => (t.id===id) ? {...t, reminder:!t.reminder } : t)
    )
  }


  return (
    <BrowserRouter>
      <div className="container">
        
        <Header 
          title="Task Tracker"
          onAdd={() => setShowAddTask(!showAddTask)} 
          showAdd={showAddTask}
        />

        <Routes>
          <Route 
            path='/'
            element={ 
              <>
                { showAddTask && 
                  <AddTask 
                    onAdd={addTask}
                  />}

                {tasks.length>0 ? (
                  <Tasks 
                    tasks={tasks} 
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  /> ) : (
                    "No Tasks To Show"
                  )
                }
              </>
            } />
          
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
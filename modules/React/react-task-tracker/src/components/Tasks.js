import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((t, index) => (
        <Task 
          key={index} 
          task={t}
          onDelete={onDelete}
          onToggle={onToggle} 
        />
      ))}
    </>
  )
}

export default Tasks
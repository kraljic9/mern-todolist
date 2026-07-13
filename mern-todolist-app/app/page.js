'use client'

import { useEffect, useState } from "react";


export default function Home() {
  
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    
    async function fetchTodos(){
      try{
        const response = await fetch('http://localhost:3000/api/task')

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        console.log(data)

        setTasks(data)
      }catch(err){
        console.log(err.message);
        setError(err.message)
      }
    }

    async function removeTodo(id) {
  try{
      const response = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: 'DELETE',
      })

      if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      setTasks(tasks.filter(task => task._id !== id ))

      } catch(err){
          console.log(err.message);
          setError(err.message)
      }
    } 

    useEffect(() => {
      fetchTodos()
    },[])


  return (
    <div className="container">
    <div className="top">
    <h1>To do list app, add, edit, delete your tasks</h1>
    <input placeholder="Write todo here"></input>
    <button>Add todo</button>
    </div>
    
    <main>
      <div className="todos-container">
        {tasks.map((task) => (
           <div className="todo" key={task._id}><p className="todo-title">{task.title}</p><button className="edit-btn">EDIT</button><button className="delete-btn" onClick={() => removeTodo(task._id)}>DELETE</button></div>
          ))}
      </div>
    </main>
    </div>
  )
}

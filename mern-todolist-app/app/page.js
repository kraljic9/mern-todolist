'use client'

import { useEffect, useState } from "react";


export default function Home() {
  
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [newTask, setNewTask] = useState('')
  
    // Display todo to ui
    async function fetchTodos(){
      try{
        const response = await fetch('http://localhost:3000/api/task')

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        setTasks(data)
      }catch(err){
        console.log(err.message);
        setError(err.message)
      }
    }

    // Delete todo from UI
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

    // Add todo to UI
    async function addTodo(task) {
      try{
        const response = await fetch('http://localhost:3000/api/task', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({title: task}) 
        });

         if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      setTasks([...tasks, data])
      }catch(err){
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
    <input placeholder="Write todo here" onChange={(e) => setNewTask(e.target.value)}></input>
    <button className="add-btn" onClick={() => addTodo(newTask)}>Add todo</button>
    </div>
    
    <main>
      <div className="todos-container">
        {tasks ? tasks.map((task) => (
           <div className="todo" key={task._id}><p className="todo-title">{task.title}</p><button className="edit-btn">EDIT</button><button className="delete-btn" onClick={() => removeTodo(task._id)}>DELETE</button></div>
          )) : null}
      </div>
    </main>
    </div>
  )
}

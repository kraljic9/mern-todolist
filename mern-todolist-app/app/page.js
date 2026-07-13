'use client'

import Image from "next/image";
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

    useEffect(() => {
      fetchTodos()
    },[])


  return (
    <>
    <div className="top">
    <h1>To do list app, add, edit, delete your tasks</h1>
    </div>
    
    <main>
      <div className="todos-container">
        {tasks.map((task) => (
           <div className="todo" key={'task-id'}><p className="todo-title">{task.title}</p><button className="edit-btn">EDIT</button><button className="delete-btn">DELETE</button></div>
          ))}
      </div>
    </main>
    </>
  )
}

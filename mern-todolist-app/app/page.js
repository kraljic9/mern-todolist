'use client'
import { useEffect, useState } from "react";
import "./Todo.css"
import { useSession, signIn, signOut } from "next-auth/react";


export default function Home() {

    const {data: session, status} = useSession();

  
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [newTask, setNewTask] = useState('')
    const [editingTaskId, setEditingTaskId] = useState(null);

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

      setNewTask('')
      }catch(err){
         console.log(err.message);
          setError(err.message)
      }
    }

    // Edit todo

    async function editTodo(updatedText, id) {
      try{

        const response = await fetch(`http://localhost:3000/api/task/${id}`, {
          method:'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({title: updatedText})
        })

        if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json();

        setTasks(tasks.map(t => t._id === id ? data.newTask : t));

        setEditingTaskId(null);
        setCurrentTask('');

      }catch(err) {
        console.log(err.message);
        setError(err.message)
      }
    }

    useEffect(() => {
      if (session) {
      fetchTodos()
      }
    },[session])

    if (status === "loading") {
    return <div className="container" style={{ textAlign: "center", marginTop: "100px" }}>Checking authentication...</div>;
  }

  //SCREEN A: If not logged in, show a Sign In button

  if (!session) {
    return(
      <div className="container" style={{textAlign: 'Center', marginTop: '100px'}}>
          <h1>To Do List App</h1>
          <p>Please log in to manage your private task.</p>
          <button className="add-btn" onClick={() => signIn("github")}>
            Sign In with Github
          </button>
        </div>
    )
  }

  // SCREEN B: Logged in! Show the full UI dashboard
  return (
    <div className="container">

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
        <span>Logged in as: <strong>{session.user.name || session.user.email}</strong></span>
        <button onClick={() => signOut()} style={{ padding: "5px 10px", cursor: "pointer", backgroundColor: "#ff4d4d", color: "#fff", border: "none", borderRadius: "4px" }}>
          Log Out
        </button>
      </div>

    <div className="top">
    <h1>To do list app, add, edit, delete your tasks</h1>
    <input placeholder="Write todo here" onChange={(e) => setNewTask(e.target.value)} value={newTask}></input>
    <button className="add-btn" onClick={() => addTodo(newTask)}>Add todo</button>
    </div>
    
    <main>
      <div className="todos-container">
        {tasks ? tasks.map((task) => (
        editingTaskId !== task._id ? (
        <div className="todo" key={task._id}><p className="todo-title">{task.title}</p>
        <button className="edit-btn" onClick={() => {
         setEditingTaskId(task._id)
         setCurrentTask(task.title)
        }
          }>EDIT</button>
        <button className="delete-btn" onClick={() => removeTodo(task._id)}>DELETE</button>
        <button className="status-btn">({task.isCompleted === true ? 'Completed' : 'Not completed'})</button> 
        </div>
        )
        :
      (
        <div className="todo" key={task._id}>
        <input className="todo-title-input" value={currentTask} onChange={(e) => setCurrentTask(e.target.value)}></input>
        <button className="save-change" onClick={() => editTodo(currentTask, task._id)}>Save</button>
        <button className="cancel-btn" onClick={() => setEditingTaskId(null)}>Cancel</button>
</div>
       )   )) : null}
      </div>
    </main>
    </div>
  )
}

/* eslint-disable no-unused-vars */

// eslint-disable-next-line no-unused-vars
import React, { useState,useEffect} from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState('');
  const [todos, settodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
    let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
  
  }
  }, [])
  

  const saveToLS = ()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const togglefinished = () => {
    
      setshowfinished(!showfinished); // Toggle the value of showfinished
  
    
  }
  

  const handleEdit = (id) => {
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    const filteredTodos = todos.filter((item) => item.id !== id);
    settodos(filteredTodos);
    saveToLS()

  };

  const handleDelete = (id) => {
    const filteredTodos = todos.filter((item) => item.id !== id);
    settodos(filteredTodos);
    saveToLS()
  };

  const handleAdd = () => {
    if (todo.trim() !== '') {
      const newTodo = { id: uuidv4(), todo: todo.trim(), isCompleted: false };
      settodos([...todos, newTodo]);
      settodo('');
      saveToLS()
    }
  };

  const handleChange = (e) => {
    settodo(e.target.value);
    
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    settodos(updatedTodos);
    saveToLS()
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100  min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-3xl'>itask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className='flex '>
          <input className='my-4' onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} className="bg-violet-800 hover:bg-slate-950 mx-2 rounded-full p-2 py-1 text-sm font-bold text-white  ">
            Save
          </button>
          </div>
        </div>
        <input onChange={togglefinished} id='show' type="checkbox" checked={showfinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
        {todos.length === 0 && <div className='m-5'>No Todos To Dsiplay</div>}
          {todos.map((item) => {

             return (showfinished || !item.isCompleted) && <div key={item.id} className={"todo flex  my-3 justify-between"}>
            <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
            </div>
              <div className="buttons flex h-full">
                <button onClick={() => handleEdit(item.id)} className="bg-violet-800 hover:bg-slate-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">
                <FaEdit />
                </button>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">
                <MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;








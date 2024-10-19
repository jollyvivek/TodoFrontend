import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todo from './components/Todo'
import { AddTodo, getAllTodo,updateTodo,deleteTode } from './Utils/HnadleApi'
import { SiTruenas } from 'react-icons/si';

const App = () => {

  const[todo,setTodo]=useState([])
  const[text,setText]=useState("");
  const [isUpdate,setIsUpdate] = useState(false)
  const [todoId,setTodoId] = useState("")

  useEffect(()=>{
    getAllTodo(setTodo);
  },[]);

  const updateMode = (_id ,text)=>{
    setIsUpdate(true);
    setText(text);
    setTodoId(_id);
    // console.log(_id,text)
  }


  
  return (
    <div  className='container'>
      <ToastContainer/>
      <h1>Todo App</h1>
      <div className='top'>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder='Add Todo.....' />
        <div className='add' onClick={ isUpdate ? ()=>updateTodo(todoId,text,setText,setTodo,setIsUpdate) 
          :()=>AddTodo(text,setText,setTodo) }>
          {isUpdate ? "Update" :"Add"}
          </div>
      </div>
      <div className='list'>
        {todo.map((item,index)=><Todo
         key={item._id} text={item.text}
        deleteTodo={()=>deleteTode(item._id,setTodo)} 
        updateMode={()=>updateMode(item._id,item.text)}  
        />)}
      
      </div>



    </div>
  )
}

export default App
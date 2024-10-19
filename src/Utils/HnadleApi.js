import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:5000";

const AddTodo = async (text, setText, setTodo) => {
  const response = await axios.post(`${baseUrl}/api/todo/add`, { text });

  if (response.data.success) {
    setText("");
    getAllTodo(setTodo);
    toast.success(response.data.message);
  } else {
    toast.error(response.data.message);
    console.log("Error");
  }
};

const getAllTodo = async (setTodo) => {
  const response = await axios.get(`${baseUrl}/api/todo/list`);
  if (response.data.data) {
    setTodo(response.data.data);
  } else {
    console.log("Error");
  }
};

// delete

const deleteTode = async (todoId, setTodo) => {
  const response = await axios.post(`${baseUrl}/api/todo/remove`, {
    id: todoId,
  });
  if (response.data.success) {
    console.log(response.data.data);
    getAllTodo(setTodo);
    toast.success(response.data.message);
  } else {
    toast.error(response.data.message);
  }
};

// update

const updateTodo = async (todoId, text, setText, setTodo, setIsUpdate) => {
  try {
    const response = await axios.post(`${baseUrl}/api/todo/update`,{id:todoId,text})
    console.log(response)
    if (response.data.success) {
      setText("")
      setIsUpdate(false)
      getAllTodo(setTodo)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  } catch (error) {
    toast.error(error.message);
  }
 

  // axios
  //   .post(`${baseUrl}/api/todo/update`, { id: todoId, text })
  //   .then((res) => {
  //     if (res.data.success) {
  //       setText("");
  //       toast.success(res.data.message);
  //       setIsUpdate(false);
  //       getAllTodo(setTodo);
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   })
  //   .catch((err) => {
  //     toast.error(err.message);
  //   });
};

export { getAllTodo, AddTodo, deleteTode, updateTodo };

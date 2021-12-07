// All necessary dependences
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { BsCardList, BsPencil } from "react-icons/bs";
import './App.css';
import Alert from "./components/Alert";
import Container from './components/Container';
import TodoList from "./components/TodoList";

// Get the items from localStorage
const getLocalStorage = () => {
    let task = localStorage.getItem("task");
    if(task) {
        return JSON.parse(task)
    }
    else {
        return [];
    }
}
// App 
function App() {
    // All necessary states 
    const [name, setName] = useState('');
    const [task, setTask] = useState(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditId] = useState(null)
    const [alert, setAlert] = useState({show: false, msg: "", type: ""}); 

    // Form submit handler method 
    const submitHandler = (e) => {
        // Disable reload onClick the button 
        e.preventDefault();

        if(!name) {

            //if input is empy
            showAlert(true, "Please enter task !", "danger");

        } else if(name && isEditing) {

            // Update the item & states
            setTask(task.map((item)=> {
                if(item.id === editID) {
                    return {...item, title: name, complete: false}
                }
                return item;
            }))
            setName('')
            setEditId(null)
            setIsEditing(false)

            // Update item alert 
            setAlert({show: true, msg: "Task Updated !", type: "success"});
        }
        else {

            // Put new item 
            const newTask = {id: task.length + 1, complete: false, title: name};
            setTask([...task, newTask]);
            setName('');

            // Put new item Alert 
            showAlert(true, "Task added successfully !", "success");
        }
        
    }

    // Show alert method
    const showAlert = (show = false, msg = "", type = "") => {
        setAlert({show, msg, type});
    }

    // Edit specific task 
    const editHandler = (id) => {
        const spesificItem = task.find((item)=>item.id === id)
        setIsEditing(true);
        setEditId(id);
        setName(spesificItem.title)
        
    }
    // Remove specific task
    const removeItem = (id) => {
        showAlert(true, "Item removed", "warning")
        setTask(task.filter((item)=> item.id !== id))
    }
    // Complete task method 
    const completeItem = (id) => {
        setTask(task.map((item)=> {
            if(item.id === id) {
                return {...item, complete: true}
            }
            
            // Task Complete alert 
            showAlert(true, "Task Completed !", "success")
            return item;
        }))
        
    }

    // Save items to local storage 
    useEffect(() => {
        localStorage.setItem("task", JSON.stringify(task))
    }, [task])

  return (
    
  <Container>
        <div className="card">
            <div className="card-header p-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0"><BsCardList /> ToDo List</h5>
                {alert.show && <Alert {...alert} removeAlert={showAlert} list={task} />}
            </div>
            <div className="card-body" data-mdb-perfect-scrollbar="true" style={{position: "relative", height: "400px"}}>
                {task.length > 0 ? <TodoList items={task} editHandler={editHandler} removeItem={removeItem} completeItem={completeItem} /> : <p className="text-center">There is no item</p>}
            </div>
            <form onSubmit={submitHandler}>
                <div className="card-footer text-end p-3 d-flex justify-content-between">
                    <div className="input-group flex-4">
                        <span className="input-group-text"> <BsPencil /></span>
                        <textarea className="form-control" aria-label="With textarea" rows="1" cols="1" placeholder="Enter task" value={name} onChange={(e)=>{setName(e.target.value)}}></textarea>
                    </div>
                    <button className="btn btn-sm btn-primary flex-1 add-task">{isEditing ? "Edit Task" : "Add Task"}</button>
                </div>
            </form>
        </div>
  </Container>
  );
}

export default App;

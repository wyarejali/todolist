// All necessary dependences
import React, { useEffect, useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import './App.css'
import Alert from './components/Alert'
import TodoList from './components/TodoList'
import Logo from './assets/logo.png'
import DeleteModal from './components/DeleteModal'
import { useGlobalContext } from './context/appContext'

// App
function App() {
  // All necessary states
  const [text, setText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditId] = useState(null)

  const {
    isModalOpen,
    setIsModalOpen,
    tasks,
    setTasks,
    filterdTasks,
    setFilteredText,
    showAlert,
    alert,
    setAlert,
  } = useGlobalContext()

  console.log(tasks)

  // Form submit handler method
  const submitHandler = (e) => {
    // Reset default behavior
    e.preventDefault()

    if (!text) {
      //if input is empy
      showAlert(true, 'The field is required!', 'danger')
    } else if (text && isEditing) {
      // Update the item & states
      const updatedTasks = tasks.map((item) => {
        if (item.id === editID) {
          return { ...item, title: text, complete: false }
        } else {
          return item
        }
      })
      setTasks(updatedTasks)
      setText('')
      setEditId(null)
      setIsEditing(false)

      // Update item alert
      setAlert({ show: true, msg: 'Task Updated !', type: 'success' })
    } else {
      // Add item
      const newTask = { id: tasks.length + 1, complete: false, title: text }
      setTasks([newTask, ...tasks])
      setText('')

      // Success Alert
      showAlert(true, 'Task added successfully !', 'success')
    }
  }

  // Save items to local storage
  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(tasks))
  }, [tasks])

  // Edit specific task
  const editHandler = (id) => {
    const spesificItem = tasks.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setText(spesificItem.title)
  }
  // Remove specific task
  const removeItem = (id) => {
    showAlert(true, 'Item removed', 'warning')
    setTasks(tasks.filter((item) => item.id !== id))
  }

  // Complete task method
  const completeItem = (id) => {
    setTasks(
      tasks.map((item) => {
        if (item.id === id) {
          return { ...item, complete: true }
        }

        // Task Complete alert
        showAlert(true, 'Task Completed !', 'complete')
        return item
      })
    )
  }

  const onFilterChange = (e) => {
    setFilteredText(e.target.value)
  }

  return (
    <section id='wa_todo-list'>
      {isModalOpen && (
        <DeleteModal removeItem={removeItem} setIsModalOpen={setIsModalOpen} />
      )}
      <div className='wrapper'>
        <div className='wa_header'>
          <div className='wa_logo-area'>
            <div style={{ width: '148px' }}>
              <img width={'100%'} src={Logo} alt='to do list' />
            </div>
          </div>

          <div className='wa_alert'>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={tasks} />
            )}
          </div>
          <div className='wa_filter'>
            <label htmlFor='wa_filter'>Filter: </label>
            <select name='filter' id='wa_filter' onChange={onFilterChange}>
              <option value='all'>All</option>
              <option value='completed'>Completed</option>
              <option value='uncompleted'>Uncomplete</option>
            </select>
          </div>
        </div>
        <div className='wa_body'>
          {filterdTasks.length > 0 ? (
            <TodoList
              filterdTasks={filterdTasks}
              editHandler={editHandler}
              setIsModalOpen={setIsModalOpen}
              removeItem={removeItem}
              completeItem={completeItem}
            />
          ) : (
            <p className='empty'>There is no item</p>
          )}
        </div>
        <form onSubmit={submitHandler}>
          <div className='wa_footer'>
            <div className='wa_form-group'>
              <span>
                <BsPencil fill='#fff' />
              </span>
              <input
                className='wa_form-control'
                type='text'
                placeholder='Enter task'
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                }}
              />
              <button className='wa_btn'>
                {isEditing ? 'Update' : 'Add Item'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { getTasks, deleteTask, postTask, postGym, getGym } from './apis';
import './App.css';

function App() {
  const [taskName, setTaskName] = useState('')
  const [tasks, setTasks] = useState({})
  const [exercise, setExercise] = useState('')
  const [weight, setWeight] = useState()
  const [gymRecords, setGymRecords] = useState({})

  useEffect(() => {
    (async () => {
      const data = await getTasks()
      setTasks(data)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const data = await getGym()
      setGymRecords(data)
    })()
  }, [])

  const handleSubmit = async () => {
    const reqBody = {
      task_id: uuidv4(),
      task_name: taskName,
    }
    await postTask(reqBody)
    const data = await getTasks()
    setTasks(data)
  }
  const handleGym = async () => {
    const reqBody = {
      exercise: exercise,
      weight: weight,
      "date": null
    }
    await postGym(reqBody)
    const data = await getTasks()
    setGymRecords(data)
  }

  const handleDelete = async (task_id) => {
    console.log(task_id)
    await deleteTask(task_id)
    const data = await getTasks()
    setTasks(data)
  }

  const handleGymRecordDelete = async (task_id) => {
    console.log(task_id)
    await deleteTask(task_id)
    const data = await getTasks()
    setTasks(data)
  }

  return (
    <div className="main">
      <header className="title">
        <h1>Venkatesh's Todo Application</h1>
      </header>

      <div className='taskInputContanier'>
        <h3>Add New Task</h3>

        <div className='taskInput'>
          <input
            className='inputBox'
            id='task-name-input'
            type='text'
            placeholder='Enter task name'
            value={taskName}
            onChange={(event) => {
              setTaskName(event.target.value)
            }}
          />
          <button
            onClick={() => {
              handleSubmit()
              setTaskName('')
            }}
            className='button'
          >Add
          </button>
        </div>
      </div>

      {Object.keys(tasks).length === 0 &&
        <div className='tasks'>
          <h2>No pending tasks. Enjoy!!</h2>
        </div>
      }
      <div className='tasks'>
        {
          Object.keys(tasks).map((item) => (
            <div
              key={item}
              className='taskItem'
            >
              <p>{tasks[item].taskName}</p>
              <button onClick={() => handleDelete(item)}>Delete</button>
            </div>
          ))
        }
      </div>

      <h3>Add the data to the Gym Plan App</h3>
      <div className='taskInput'>
          <input
            className='inputBox'
            id='task-name-input'
            type='text'
            placeholder='Enter gymPlan name'
            value={exercise}
            onChange={(event) => {
              setExercise(event.target.value)
            }}
          />
          <input
            className='inputBox'
            id='task-name-input'
            type='number'
            placeholder='Enter weight'
            value={weight}
            onChange={(event) => {
              setWeight(event.target.value)
            }}
          />
          <button
            onClick={() => {
              handleGym()
              setExercise('')
              setWeight('')
            }}
            className='button'
          >Add Gym Record
          </button>
        </div>
        {Object.keys(gymRecords).length === 0 &&
        <div className='tasks'>
          <h2>No Gym Plans available. Enjoy!!</h2>
        </div>
      }

<div className='tasks'>
        {
          Object.keys(gymRecords).map((item) => (
            <div
              key={item}
              className='taskItem'
            >
              <p>{gymRecords[item].exercise}</p>
             
            </div>
          ))
        }
      </div>
      
    </div>
  );
}

export default App;

import React, { useState } from 'react'

import './App.css'
import TaskList from './components/TaskList'
import NewTaskForm from './components/NewTaskForm'
import Footer from './components/Footer'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('')
  const [timers, setTimers] = useState({}) // Состояние таймеров для всех задач

  const changeFilter = (value) => setFilter(value)

  const addTask = (description) => {
    const newTask = {
      description,
      date: new Date(),
      isDone: false,
      id: new Date().getTime().toString(),
    }
    setTasks([newTask, ...tasks])
  }

  const toggleDone = (index) => {
    const updatedTasks = [...tasks]
    const task = updatedTasks[index]

    // Переключаем статус задачи
    task.isDone = !task.isDone
    setTasks(updatedTasks)

    // Не останавливаем таймер, если задача была завершена, а только переключаем её состояние
    if (task.isDone) {
      // Таймер продолжает работать, не сбрасывается
      return
    }
  }

  const calc = () => tasks.filter((task) => !task.isDone).length

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.isDone))
    // Таймеры не очищаем при удалении выполненных задач
  }

  const removeTask = (index) => {
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
    setTasks(updatedTasks)

    // Удаляем задачу из таймеров при её удалении
    setTimers((prevTimers) => {
      const updatedTimers = { ...prevTimers }
      delete updatedTimers[tasks[index].id]
      return updatedTimers
    })
  }

  // Функция для запуска таймера
  const startTimer = (taskId) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [taskId]: {
        ...prevTimers[taskId],
        isRunning: true,
      },
    }))
  }

  // Функция для остановки таймера
  const stopTimer = (taskId) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [taskId]: {
        ...prevTimers[taskId],
        isRunning: false,
      },
    }))
  }

  // Функция для обновления оставшегося времени
  const setRemainingTime = (taskId, time) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [taskId]: {
        ...prevTimers[taskId],
        remainingTime: time,
      },
    }))
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={tasks}
          removeTask={removeTask}
          toggleDone={toggleDone}
          filter={filter}
          timers={timers}
          startTimer={startTimer}
          stopTimer={stopTimer}
          setRemainingTime={setRemainingTime}
        />
        <Footer counter={calc()} clearCompleted={clearCompleted} changeFilter={changeFilter} filter={filter} />
      </section>
    </section>
  )
}

export default App

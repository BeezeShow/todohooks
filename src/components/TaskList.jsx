import React from 'react'
import PropTypes from 'prop-types'

import { Task } from './Task'

const TaskList = ({ tasks, removeTask, toggleDone, filter, timers, startTimer, stopTimer, setRemainingTime }) => {
  // Фильтруем задачи по состоянию (активные или завершенные)
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.isDone // Показываем только завершенные задачи
    if (filter === 'active') return !task.isDone // Показываем только активные задачи
    return true // Показываем все задачи
  })

  return (
    <ul className="todo-list">
      {filteredTasks.map((task, index) => (
        <Task
          key={task.id}
          {...task}
          timers={timers}
          startTimer={startTimer}
          stopTimer={stopTimer}
          setRemainingTime={setRemainingTime}
          removeTask={removeTask}
          toggleDone={toggleDone}
          index={index}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      isDone: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.oneOf(['completed', 'active', '']),
  removeTask: PropTypes.func.isRequired,
  toggleDone: PropTypes.func.isRequired,
  timers: PropTypes.object.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  setRemainingTime: PropTypes.func.isRequired,
}

export default TaskList

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export const Task = ({
  index,
  isDone,
  description,
  date,
  toggleDone,
  removeTask,
  timers,
  startTimer,
  stopTimer,
  setRemainingTime,
  id,
}) => {
  const [time, setTime] = useState(timers[id]?.remainingTime || 3600) // Таймер начинается с 3600 секунд (1 час)
  const [isRunning, setIsRunning] = useState(timers[id]?.isRunning || false) // Статус таймера
  const [formattedDate, setFormattedDate] = useState(formatDistanceToNow(date, { includeSeconds: true }))
  const [desc, setDesc] = useState(description)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    return () => {
      // Сохраняем состояние времени в родительском компоненте
      setRemainingTime(id, time)
    }
  }, [time, id, setRemainingTime])

  // Обновляем дату задачи каждую секунду
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedDate(formatDistanceToNow(date, { includeSeconds: true }))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [date])

  // Таймер работает независимо от фильтра
  useEffect(() => {
    let timerID
    if (isRunning && time > 0) {
      timerID = setInterval(() => {
        setTime((prevTime) => Math.max(prevTime - 1, 0)) // Таймер не может быть отрицательным
      }, 1000)
    }
    return () => clearInterval(timerID)
  }, [isRunning, time])

  const startTimerHandler = () => {
    if (!isRunning) {
      setIsRunning(true)
      startTimer(id)
    }
  }

  const stopTimerHandler = () => {
    if (isRunning) {
      setIsRunning(false)
      stopTimer(id)
    }
  }

  const toggleEdit = () => {
    setIsEditing((prev) => !prev) // Переключаем режим редактирования
  }

  const updateDescription = (e) => {
    setDesc(e.target.value) // Обновляем описание задачи
    setIsEditing(false) // Завершаем редактирование
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <li className={isDone ? 'completed' : isEditing ? 'editing' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={isDone}
          onChange={() => {
            toggleDone(index) // Переключаем состояние задачи
            if (!isDone) stopTimerHandler() // Останавливаем таймер, если задача помечена как завершенная
          }}
        />
        <label>
          <span className="title">{desc}</span>
          <span className="description">
            <button className="icon icon-play" onClick={startTimerHandler}></button>
            <button className="icon icon-pause" onClick={stopTimerHandler}></button>
            {formatTime(time)}
          </span>
          <span className="created">{formattedDate}</span>
        </label>
        <button className="icon icon-edit" onClick={toggleEdit}></button>
        <button className="icon icon-destroy" onClick={() => removeTask(index)}></button>
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              updateDescription(e) // Завершаем редактирование при нажатии Enter
            }
          }}
        />
      )}
    </li>
  )
}

Task.propTypes = {
  index: PropTypes.number.isRequired,
  isDone: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  toggleDone: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  timers: PropTypes.object.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  setRemainingTime: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

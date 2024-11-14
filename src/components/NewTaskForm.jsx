import React, { useState } from 'react'

const NewTaskForm = ({ addTask }) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const addNewTask = () => {
    if (value.trim()) {
      addTask(value)
      setValue('')
    }
  }

  return (
    <input
      onChange={handleChange}
      value={value}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          addNewTask()
        }
      }}
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
    />
  )
}

export default NewTaskForm

import React from 'react'

import TasksFilter from './TasksFilter'

const Footer = ({ counter, clearCompleted, changeFilter, filter }) => (
  <footer className="footer">
    <span className="todo-count">{counter} items left</span>
    <TasksFilter changeFilter={changeFilter} filter={filter} />
    <button className="clear-completed" onClick={clearCompleted}>
      Clear completed
    </button>
  </footer>
)
export default Footer

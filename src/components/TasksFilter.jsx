import React from 'react'
import PropTypes from 'prop-types'

const TasksFilter = ({ changeFilter, filter }) => (
  <ul className="filters">
    <li>
      <button className={!filter ? 'selected' : ''} onClick={() => changeFilter('')}>
        All
      </button>
    </li>
    <li>
      <button className={filter === 'active' ? 'selected' : ''} onClick={() => changeFilter('active')}>
        Active
      </button>
    </li>
    <li>
      <button className={filter === 'completed' ? 'selected' : ''} onClick={() => changeFilter('completed')}>
        Completed
      </button>
    </li>
  </ul>
)

TasksFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
}

export default TasksFilter

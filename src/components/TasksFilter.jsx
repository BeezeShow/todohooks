import React from 'react'
import PropTypes from 'prop-types'

class TasksFilter extends React.Component {
  render() {
    return (
      <ul className="filters">
        <li>
          <button
            className={!this.props.filter ? 'selected' : ''}
            onClick={() => {
              this.props.changeFilter('')
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={this.props.filter == 'active' ? 'selected' : ''}
            onClick={() => {
              this.props.changeFilter('active')
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={this.props.filter == 'completed' ? 'selected' : ''}
            onClick={() => {
              this.props.changeFilter('completed')
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TasksFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
}
TasksFilter.defaultProps = {
  filter: '',
}
export default TasksFilter

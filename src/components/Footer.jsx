import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from './TasksFilter'

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">{this.props.counter} items left</span>
        <TasksFilter changeFilter={this.props.changeFilter} filter={this.props.filter} />
        <button className="clear-completed" onClick={this.props.clearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.propTypes = {
  counter: PropTypes.number.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}
Footer.defaultProps = {
  counter: 0,
  changeFilter: () => {},
  filter: '',
  clearCompleted: () => {},
}
export default Footer

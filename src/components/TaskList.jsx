import React from 'react';
import { Task } from './Task';
import PropTypes from 'prop-types';

class TaskList extends React.Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.tasks.map((task, index) => {
          const match = () => {
            if (!this.props.filter) {
              return true;
            }
            if (this.props.filter == 'completed') {
              return task.isDone;
            }
            if (this.props.filter == 'active') {
              return !task.isDone;
            }
          };
          if (match()) {
            return (
              <Task
                {...task}
                key={`task-${task.date.toDateString()}`}
                removeTask={this.props.removeTask}
                index={index}
                toggleDone={this.props.toggleDone}
              />
            );
          }
        })}
      </ul>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      isDone: PropTypes.bool.isRequired,
    })
  ).isRequired,
  filter: PropTypes.oneOf(['all', 'completed', 'active']),
  removeTask: PropTypes.func.isRequired,
  toggleDone: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  filter: 'all',
  tasks: [],
  removeTask: () => {},
  toggleDone: () => {},
};
export default TaskList;

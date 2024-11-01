import React from 'react'
import PropTypes from 'prop-types'

class NewTaskForm extends React.Component {
  state = {
    value: '',
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  addTask = () => {
    if (this.state.value) {
      this.props.addTask(this.state.value)
      this.setState({ value: '' })
    }
  }
  render() {
    return (
      <input
        onChange={this.handleChange}
        value={this.state.value}
        onKeyDown={(e) => {
          if (e.keyCode == 13) {
            this.addTask()
          }
        }}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    )
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}
export default NewTaskForm

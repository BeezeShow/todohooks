import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import NewTaskForm from './components/NewTaskForm';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    tasks: [],
    filter: '',
  };

  changeFilter = (value) => {
    this.setState({ filter: value });
  };

  addTask = (description) => {
    this.setState((prevState) => ({
      tasks: [{ description, date: new Date(), isDone: false }, ...prevState.tasks],
    }));
  };

  toggleDone = (index) => {
    const task = this.state.tasks[index];
    task.isDone = !task.isDone;
    this.setState((prevState) => ({
      tasks: [...prevState.tasks.slice(0, index), task, ...prevState.tasks.slice(index + 1)],
    }));
  };

  calc = () => {
    let count = 0;
    this.state.tasks.forEach((task) => {
      if (!task.isDone) {
        count++;
      }
    });
    return count;
  };

  clearCompleted = () => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => !task.isDone),
    }));
  };

  removeTask = (index) => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks.slice(0, index), ...prevState.tasks.slice(index + 1)],
    }));
  };
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={this.state.tasks}
            removeTask={this.removeTask}
            toggleDone={this.toggleDone}
            filter={this.state.filter}
          />
          <Footer
            counter={this.calc()}
            clearCompleted={this.clearCompleted}
            changeFilter={this.changeFilter}
            filter={this.state.filter}
          />
        </section>
      </section>
    );
  }
}
export default App;

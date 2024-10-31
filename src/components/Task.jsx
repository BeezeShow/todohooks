import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedDate: formatDistanceToNow(props.date, { includeSeconds: true }),
      desc: props.description,
      isEditing: false,
      time: 0,
      isRunning: false,
    };
    this.timerID = null;
  }

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(secs).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.timerID = setInterval(() => {
        this.setState((prevState) => ({
          time: prevState.time + 1,
        }));
      }, 1000);
    }
  };
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  stopTimer = () => {
    if (this.state.isRunning) {
      clearInterval(this.timerID);
      this.setState({ isRunning: false });
    }
  };
  updateDate = () => {
    this.setState({
      formattedDate: formatDistanceToNow(this.props.date, {
        includeSeconds: true,
      }),
    });
  };

  componentDidMount() {
    this.interval = setInterval(this.updateDate, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggleDone = () => {
    this.props.toggleDone(this.props.index);

    this.stopTimer();
  };

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  };

  updateDiscription = (e) => {
    this.setState({ desc: e.target.value });
    this.toggleEdit();
  };
  render() {
    return (
      <li className={this.props.isDone ? 'completed' : this.state.isEditing ? 'editing' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={this.props.isDone} onChange={this.toggleDone} />
          <label>
            <span className="title">{this.state.desc}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.startTimer}></button>
              <button className="icon icon-pause" onClick={this.stopTimer}></button>
              {this.formatTime(this.state.time)}
            </span>
            <span className="created">{this.state.formattedDate}</span>
          </label>
          <button className="icon icon-edit" onClick={this.toggleEdit}></button>
          <button
            className="icon icon-destroy"
            onClick={() => {
              this.props.removeTask(this.props.index);
            }}
          ></button>
        </div>
        {this.state.isEditing && (
          <input
            type="text"
            className="edit"
            value={this.state.desc}
            onChange={(e) => {
              this.setState({ desc: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                this.updateDiscription(e);
              }
            }}
          />
        )}
      </li>
    );
  }
}

Task.propTypes = {
  index: PropTypes.number.isRequired,
  isDone: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  toggleDone: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};

Task.defaultProps = {
  isDone: false,
  description: '',
  date: new Date(),
  toggleDone: () => {},
  removeTask: () => {},
  index: -1,
};

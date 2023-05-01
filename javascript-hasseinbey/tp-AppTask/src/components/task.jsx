import React from 'react';
import PriorityLevel from './priorityLevel.jsx'
import PriorityScale from './priorityScale.jsx'
import DoneButton from './doneButton.jsx'

import '../assets/style/taskApp.css';
import '../assets/style/task.css';

/*
 classe definissant le type Taches
*/
export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.doneTask = this.props.doneTask;
  }

  render() {
    return (
      <div className="task">
        {this.props.description} ({this.props.duration}mn)
        <PriorityScale priority = {this.props.priority} changePriority={this.props.changePriority} idTache={this.props.id} />
        <DoneButton doneTask={this.doneTask} task={this.props.id}/>
      </div>
    );
  }
}

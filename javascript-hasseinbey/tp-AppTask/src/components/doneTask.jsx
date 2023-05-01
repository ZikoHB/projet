import React from 'react';


import '../assets/style/taskApp.css';
import '../assets/style/task.css';

/*
 classe definissant le type Taches
*/
export default class DoneTask extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="doneTask">
        {this.props.description} ({this.props.duration}mn) ✔
      </div>
    );
  }
}

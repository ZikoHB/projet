import React from 'react';
import TaskApp from './taskApp.jsx'
import Task from './task.jsx'

import '../assets/style/taskApp.css';
import '../assets/style/addtask.css';

/*
 classe permettant de mettre en place l'ajout d'une tache
*/
export default class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state={ valueTask: '', valueTime : null};
  }

  valueTaskChange(text){
    this.setState({valueTask : text} );
  }


  valueTimeChange(time){
    this.setState({valueTime : parseInt(time)});
  }

  render() {
    return (
    <div className="addTask">
      <input id='description' type="text" placeholder="description" ref="description" onChange={event => {this.valueTaskChange(event.target.value);}}/>
      <input id="temps" type="number" placeholder="mn" min="0" ref="temps" onChange={e =>this.valueTimeChange(e.target.value)}/>
      <button onClick={() => {this.props.addTask(this.state.valueTask, this.state.valueTime);
        this.refs.description.value="";
        this.refs.temps.value="";}}> add </button>
    </div>
  )
  }
}

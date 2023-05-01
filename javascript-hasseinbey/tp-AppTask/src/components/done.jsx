import React from 'react';
import DoneTask from './doneTask.jsx'

import '../assets/style/taskApp.css';
import '../assets/style/tasklist.css';


/*
 classe listant les taches effectué
*/
export default class Done extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show : false}
  }

  createTask(){
    let priorities = [...this.props.priorities];
    priorities.sort((t1,t2) => t2[1] - t1[1] );
    const task_list = priorities.map( prio =>{
    const tache = this.props.tasksDone.find(tache => tache.id == prio[0]);
    if (tache!=undefined){
      return <DoneTask  {...tache } key={tache.id} doneTask={this.doneTask} priority = {prio[1]} changePriority={this.props.changePriority}/>;
    }
    })
    return task_list;
  }


  render() {
    const task_list_done = this.createTask();
    if (!this.state.show){
      return(
        <div>
          <h2> Tâche(s) éffectué(s) : </h2>
          <button onClick= {() => this.setState({show : true})}>
              + ({this.props.tasksDone.length})
          </button>
        </div>);
    }
    else{

    return (
      <div className="done">
      <h2> Tâche(s) éffectué(s) : </h2>
      <button onClick= {() => this.setState({show : false})}>
       - 
        </button>
      {task_list_done}

          </div>
    );
  }
}}

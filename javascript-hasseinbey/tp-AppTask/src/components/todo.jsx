import React from 'react';
import Task from './task.jsx'
import DoneButton from './doneButton.jsx'

import '../assets/style/taskApp.css';
import '../assets/style/tasklist.css';


/*
 classe qui défini la liste de taches restantes a faire
*/
export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.doneTask = this.props.doneTask;
    this.state = {filter : ''};
    this.changePriority = this.props.changePriority;
  }

  filterChanged(text){
    this.setState({filter : text});
  }

  createTask(){
    let priorities = [...this.props.priorities];
    priorities.sort((t1,t2) => t2[1] - t1[1] );
    const task_list = priorities.map( prio =>{
        const tache = this.props.tasksToDo.find(tache => tache.id == prio[0]);
        if (tache != undefined){
          if ( tache.description.includes(this.state.filter.toLowerCase())){
        return <Task {...tache } key={tache.id} doneTask={this.doneTask} priority = {prio[1]} changePriority={this.props.changePriority}/>;
    }}
    })
    return task_list;
  }

  render() {
    const task_list = this.createTask();
    const temps_total = task_list.reduce( (acc,task) => {return (task != undefined ? acc+task.props.duration : acc);}, 0);
    const nb_task = task_list.reduce( (acc, elt) => elt != undefined? acc+1 : acc, 0 );
    const information = `Il y a ${nb_task} taches en cours pour une durée de ${temps_total} mn`;
    return (
      <div className="tasklist">
      <input id='filtre' type="text" placeholder="filtre" ref="filtre" value={this.state.filter} onChange={(e) => this.filterChanged(e.target.value)}/>
        <h3>{information}</h3>
        <h2> Tâche(s) restante(s) : </h2>
         <br/>
        {task_list}
      </div>
    );
  }
}

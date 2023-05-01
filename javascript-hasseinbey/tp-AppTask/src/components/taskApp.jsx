import React from 'react';
import AddTask from './addTask.jsx'
import Todo from './todo.jsx'
import Done from './done.jsx'
import Task from './task.jsx';
import tasksData from '../data/tasksData.js'


import '../assets/style/taskApp.css';

/*
 define root component
*/
export default class TaskApp extends React.Component {
  constructor(props) {
    super(props);
    const initPriorities=this.initPriorities();
    this.state={tasksToDo:[], tasksDone:[], priorities : initPriorities, global:tasksData.length};
    this.doneTask=this.doneTask.bind(this);
    this.addTask=this.addTask.bind(this);
    this.changePriority=this.changePriority.bind(this);
  }

  async componentDidMount() {
    const tasksToDo = [];
    tasksData.forEach(task => tasksToDo.push({...task, priorities : 1}));
    this.setState({tasksToDo : tasksToDo });
 }

 initPriorities(){
    const prio = tasksData.map(tache => { return [tache.id,1];});
    return prio;
  }

  doneTask(task){
          const mytask = this.state.tasksToDo.find(e => e.id==task);
           this.setState({ tasksToDo : this.state.tasksToDo.filter(
           elt => elt.id != task  ), tasksDone : [...this.state.tasksDone, mytask]
         });
  }


  addTask(desc, time){
    let valeur=this.state.global+1;
    this.setState({global:valeur+1});
    const obj={id : `T${valeur}`,
    description : desc,
    duration : time
    };
    const new_prio=[...this.state.priorities, [obj.id, 1]];
    this.setState({ tasksToDo : [...this.state.tasksToDo,obj ], priorities : new_prio,});
  }

  changePriority(id, prio){
    const new_prio = [...this.state.priorities];
    new_prio.forEach(item => {
      if (item[0] == id){
        item[1] = prio;
        }
      }
    );
    this.setState({priorities : new_prio});
  }

  render() {
    return (
      <div className="taskApp">
        <AddTask addTask={this.addTask}/>
        <Todo tasksToDo={this.state.tasksToDo} doneTask={this.doneTask} priorities={this.state.priorities} changePriority={this.changePriority}/>
        <Done tasksDone={this.state.tasksDone} priorities={this.state.priorities} changePriority={this.changePriority}/>
      </div>
    );
  }

}

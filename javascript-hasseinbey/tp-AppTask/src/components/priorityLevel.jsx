import React from 'react';

import '../assets/style/taskApp.css';
import '../assets/style/priorityLevel.css';

/*
 classe definissant le niveau de priorité d'une tache
*/
export default class PriorityLevel extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.changePriority(this.props.idTache,this.props.level);
  }


  render() {

    const set = this.props.etat ? <div className="level on" onClick={this.handleClick}></div> :
    <div className="level off" onClick={this.handleClick}></div>
    return (
      <div>
      {set}
      </div>
    );
  }
}

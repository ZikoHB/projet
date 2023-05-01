import React from 'react';
import PriorityLevel from './priorityLevel.jsx'

import '../assets/style/priorityScale.css';

/*
 classe qui sert juste a rangé les taches par ordre de niveau de priorité
*/
export default class PriorityScale extends React.Component {
  constructor(props) {
    super(props);
}
  render() {

    const levels = [1,2,3,4,5,6].map( n =>   <PriorityLevel level={n} etat={n <= this.props.priority?true:false}  key={n} changePriority={this.props.changePriority} idTache={this.props.idTache}/>);
    return (
      <div className="scale">
      {levels}({this.props.priority})
      </div>
    );
  }
}

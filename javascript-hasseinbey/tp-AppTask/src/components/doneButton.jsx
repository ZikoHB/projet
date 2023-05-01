import React from 'react';

import '../assets/style/taskApp.css';
import '../assets/style/doneButton.css';

/*
 classe qui établi le bouton Done
*/
export default class DoneButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="doneButton" onClick={() => this.props.doneTask(this.props.task)}>
              <button className = "doneButton">✔</button>
          </div>
    );
  }
}

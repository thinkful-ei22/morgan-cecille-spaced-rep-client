import React from 'react';
import { getQuestionLevels } from '../actions/users';
import '../components-css/summary-progress.css';

export default class SummaryProgress extends React.Component {
  componentWillMount(){
    this.props.dispatch(getQuestionLevels());
  }

  render() {
    if(!this.props.questionLevels){
      return <p>Fetching Progress...</p>
    }

    let total = 0;
    const progressList = this.props.questionLevels.map(country => {
        total = total + country.level
        return (
          <li className="stats-li" key={country.country}>
            {country.country}: Level {country.level}/5
          </li>
        )
      })
    const averageLevel = total/this.props.questionLevels.length;

    return(
      <div className="summary-progress-container">
          <h3 className="average">Average Proficiency Level: {averageLevel.toFixed(1)}/5</h3>
          <ul className="stats">
            {progressList}
          </ul>
      </div>
    )
  }
}

import React from 'react';
import { getQuestionLevels } from '../actions/users';

export default class SummaryProgress extends React.Component {
  componentWillMount(){
    this.props.dispatch(getQuestionLevels());
  }

  render() {
    let total = 0;
    const progressList = this.props.questionLevels.map(country => {
      total = total + country.level
      return (
        <li>
          {country.country}: Level {country.level}/5
        </li>
      )
    })

    const averageLevel = total/this.props.questionLevels.length;
    return(
      <div>
        <h3>Average Level: {averageLevel.toFixed(1)}/5</h3>
        <ul>
          {progressList}
        </ul>
      </div>
    )
  }
}
import React from 'react';

export default function SummaryProgress(props){
  console.log(props.questionLevels);
  let total = 0;
  const progressList = props.questionLevels.map(country => {
    total = total + country.level
    return (
      <li>
        {country.country}: Level {country.level}/5
      </li>
    )
  })

  const averageLevel = total/props.questionLevels.length;
  return(
    <div>
      <h3>Average Level: {averageLevel.toFixed(2)}/5</h3>
      <ul>
        {progressList}
      </ul>
    </div>
  )
}
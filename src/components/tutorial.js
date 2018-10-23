import React from 'react';
import '../components-css/tutorial.css';
import { displayTutorial } from '../actions/game';

export default class Tutorial extends React.Component {

  render() {
    return(
      <div className="tutorial-container">
        <h1 className="tutorial-text">How To Play</h1>
        <br/>
        <p className="tutorial-text">Upon registration and login, you will be redirected to the landing page where you will see a table with your current proficiencies on each geography question. It will also display your average proficiency.</p>
        <br/>
        <p className="tutorial-text">A few other tidbits...</p>
        <br/>
        <ul>
          <li className="tutorial-text">
            <i class="fas fa-globe-americas"></i>
            <span className='tidbit'>When you get a question correct, your proficiency for than question will increase.</span>
          </li>
          <li className="tutorial-text">
            <i class="fas fa-globe-americas"></i>
            <span className='tidbit'>When you get a question incorrect, your proficiency for that question will decrease.</span>
          </li>
          <li className="tutorial-text">
            <i class="fas fa-globe-americas"></i>
            <span className='tidbit'>The frequency of receiving certain questions is dependent on your proficiency.</span>
          </li>
          <li className="tutorial-text">
            <i class="fas fa-globe-americas"></i>
            <span className='tidbit'>If you have a higher proficiency in a question, you will see it less frequently.</span>
          </li>
          <li className="tutorial-text">
            <i class="fas fa-globe-americas"></i>
            <span className='tidbit'>If you have a lower proficiency in a question, you will see it more frequently.</span>
          </li>
        </ul>
        <br/>
        <p className="tutorial-text">In time, our unique algorithm will be jiving well with your brain functions to teach you all the geography you will want to know!</p>
        <br/>
        <p className="tutorial-text">Are you ready?</p>
        <br/>
        <div className="tutorial-button-container">
          <button type="button" className="tutorial-button" onClick={() => this.props.dispatch(displayTutorial(false))}>Play!</button>
        </div>
      </div>
    )
  }
}

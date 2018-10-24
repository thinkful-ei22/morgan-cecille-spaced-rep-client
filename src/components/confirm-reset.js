import React from 'react';
import { resetUserLevels } from '../actions/users';
import { displayGameplay } from '../actions/game';
import '../components-css/confirm-reset.css';


export default function ConfirmReset(props) {
  return(
    <section className='confirm-reset'>

      <form id='confirm-reset' name='confirm-reset'>
        <p>Are you sure you want to reset your proficiency levels?</p>
        <p className='reset-level-warning'>(This will reset ALL questions back to level 1)</p>

        <button type='reset' onClick={() => props.toggleConfirmReset(false)}>No, keep my progress</button>

        <button type='submit' onClick={ () => {
            props.dispatch(resetUserLevels())
            .then( () => props.dispatch(displayGameplay(false)))
            .then(() => props.toggleConfirmReset(false));
          }}>Yes, reset my proficiency</button>
      </form>
      
    </section>
  )
}

import React from 'react';

export default class Gameplay extends React.Component {

  render() {
    return (
      <div>
        <h2>What is this country?</h2>

        {/*Image src within this div will take the url from the question database*/}
        <div style={{ position: "relative" }}>
          <img style={{ height: "200px", width: "200px", }} src='https://upload.wikimedia.org/wikipedia/commons/5/5f/Mexico_in_the_world_%28W3%29.svg' />
        </div>
        <form>
          <label htmlFor="user-input-field">Type your guess here</label>
          <input id="user-input-field" type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

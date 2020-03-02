import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const userInput = props => {
  const points = props.points.map(
    ({ name, id }) => {
      return (
        <li key={id}>{name}</li>
      )
    }
  );
  return (
    <Aux>
      <div className="col-md-6 col-lg-6">
        <p>User input</p>
        <input type="text"
          value={props.value}
          placeholder="Новая точка"
          onChange={props.onChange}
          onKeyPress={props.keyPress} />

          <ul className="col-md-12 col-lg-12">
            {points}
          </ul>
      </div>
    </Aux>
  )
};

export default userInput;
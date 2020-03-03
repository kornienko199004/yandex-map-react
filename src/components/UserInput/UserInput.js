import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const userInput = props => {
  const points = props.points.map(
    ({ name, id }) => {
      return (
        <li className="list-group-item" key={id}>
          <div className="d-flex justify-content-between">
            <div>{name}</div>
            <button
              className="btn btn-danger"
              title="Удалить точку">х</button>
            </div>
        </li>
      )
    }
  );
  return (
    <Aux>
      <div className="col-md-6 col-lg-6">
        <input type="text"
          className="form-control"
          value={props.value}
          placeholder="Новая точка"
          onChange={props.onChange}
          onKeyPress={props.keyPress} />

          <ul className="col-md-12 col-lg-12 list-group list-group-flush pt-1">
            {points}
          </ul>
      </div>
    </Aux>
  )
};

export default userInput;
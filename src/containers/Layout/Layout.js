import React, { Component } from 'react';
import UserInput from '../../components/UserInput/UserInput';
import Map from '../../components/Map/Map';

const DEFAULT_COORDS = [55.76, 37.64];

class Layout extends Component {
  state = {
    inputValue: '',
    points: [
      // { name: string; coords: number[], id: number }
    ]
  }

  inputHandler = (event) => {
    this.setState({
      inputValue: event.target.value
    });
  }

  inputKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.setState((state, props) => ({
        points: [...state.points,
          { name: state.inputValue, coords: DEFAULT_COORDS, id: Date.now() }
        ],
        inputValue: '',
      }));
    }
  }

  render() {
    return (
      <div className="container row text-center col-md-12">
        <UserInput
          value={this.state.inputValue}
          onChange={this.inputHandler}
          keyPress={this.inputKeyPress}
          points={this.state.points}
          />
        <Map />
      </div>
    );
  }
}

export default Layout;
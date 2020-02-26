import React, { Component } from 'react';
import UserInput from '../../components/UserInput/UserInput';
import Map from '../../components/Map/Map';

class Layout extends Component {
  render() {
    return (
      <div className="container row text-center col-md-12">
        <UserInput />
        <Map />
      </div>
    )
  }
}

export default Layout;
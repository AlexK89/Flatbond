import React, { Component } from 'react';
import {fetchMembershipFee} from "./API";
import CreatePage from './containers/CreatePage';
import './App.scss';

class App extends Component {
  async componentDidMount() {
    const data = await fetchMembershipFee();

    this.setState({...data})
  }

  render() {
    return (
      <div className="App">
        <CreatePage />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { fetchMembershipFee } from "./API";
import CreatePage from './containers/CreatePage/CreatePage';
import DetailsPage from './containers/DetailsPage';
import './App.scss';

class App extends Component {
  state = {
    membership: null
  };

  async componentDidMount() {
    const membership = await fetchMembershipFee();

    this.setState({membership})
  }

  render() {
    return (
      <div className="App">
        {
          this.state.membership &&
            <Switch>
              <Route exact path={'/details'} component={DetailsPage} />
              <Route path={'/'} component={CreatePage} />
            </Switch>

        }
      </div>
    );
  }
}

export default App;

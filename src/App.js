import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { fetchMembershipFee } from "./API";
import CreatePage from './containers/CreatePage/CreatePage';
import DetailsPage from './containers/DetailsPage';
import './App.scss';

const WEEK = 'week';
const MONTH = 'month';

class App extends Component {
  state = {
    membership: null,
    feeFormDefault: {
      currencySym: '£',
      timeRange: [WEEK, MONTH],
      week: {
        min: '25',
        max: '2000'
      },
      month: {
        min: '110',
        max: '8660'
      },
      postCode: ''
    }
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
              <Route path={'/'} component={() => <CreatePage feeFormDefault={this.state.feeFormDefault} membership={this.state.membership}/>} />
            </Switch>

        }
      </div>
    );
  }
}

export default App;

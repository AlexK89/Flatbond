import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {fetchMembershipFee} from "./API";
import FeeForm from './components/FeeForm/FeeForm';
import DetailsPage from './components/DetailsPage/DetailsPage';
import './App.scss';

const timeFrames = {
    WEEK: 'week',
    MONTH: 'month'
};

class App extends Component {
    state = {
        membership: null,
        feeFormDefault: {
            currencySym: '£',
            timeFrame: [timeFrames.WEEK, timeFrames.MONTH],
            week: {
                min: '25',
                max: '2000'
            },
            month: {
                min: '110',
                max: '8660'
            },
            postCode: ''
        },
        userData: null
    };

    async componentDidMount() {
        const membership = await fetchMembershipFee();

        this.setState({membership})
    }

    submitFormHandler = (userData) => {
        this.setState({userData})
    };

    resetForm = () => {
        this.setState({userData: null});
    };


    render() {
        return (
            <div className="App">
                {
                    this.state.membership &&
                    <div className="create_page">
                        <div className="create_page__header">
                            <p className={!this.state.userData ? 'fill' : ''}><span>1</span></p>
                            <p className={this.state.userData ? 'fill' : ''}><span>2</span></p>
                        </div>
                        <Switch>
                            <Route exact path={'/details'} component={() =>
                                <DetailsPage userData={this.state.userData}
                                             resetForm={this.resetForm}
                                             currencySym={this.state.feeFormDefault.currencySym}
                                             fixedMembership={this.state.membership.fixed_membership_fee}/>
                            }/>
                            <Route path={'/'} component={() =>
                                <FeeForm feeFormDefault={this.state.feeFormDefault}
                                         membership={this.state.membership}
                                         submitFormHandler={this.submitFormHandler}/>}
                            />
                        </Switch>
                    </div>
                }
            </div>
        );
    }
}

export default App;

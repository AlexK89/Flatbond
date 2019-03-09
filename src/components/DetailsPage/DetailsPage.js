import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import './DetailsPage.scss';

class DetailsPage extends Component {
    componentDidMount() {
        if (!this.props.userData) {
            this.props.history.push('/');
        }
    }

    clickHandler = () => {
        this.props.resetForm();
        this.props.history.push('/');
    };

    render() {
        const {userData} = this.props;
        const fixedMembership = this.props.fixedMembership ? 'Yes' : 'No';

        return userData ? (
            <div className="details_page">
                <div className="details_page__back_btn">
                    <button onClick={this.clickHandler}><img src={require('../../img/left-arrow.png')} alt="Back button"/></button>
                </div>
                <ul className="details_page__list">
                    <li className="details_page__list__item">
                        <p className="details_page__list__item__label">Time frame:</p>
                        <p className="details_page__list__item__value">{userData.timeFrame}</p>
                    </li>
                    <li className="details_page__list__item">
                        <p className="details_page__list__item__label">Post code:</p>
                        <p className="details_page__list__item__value">{userData.postCode}</p>
                    </li>
                    <li className="details_page__list__item">
                        <p className="details_page__list__item__label">Rent:</p>
                        <p className="details_page__list__item__value">200</p>
                    </li>
                    <li className="details_page__list__item">
                        <p className="details_page__list__item__label">Fixed membership:</p>
                        <p className="details_page__list__item__value">{fixedMembership}</p>
                    </li>
                    <li className="details_page__list__item">
                        <p className="details_page__list__item__label">Member fee:</p>
                        <p className="details_page__list__item__value">{userData.memberFee}</p>
                    </li>
                </ul>
            </div>
        ) : <h1>Loading...</h1>;
    }
}

export default withRouter(DetailsPage);
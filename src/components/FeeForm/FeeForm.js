import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {postUserData} from "../../API";
import './FeeForm.scss';

const UK_POST_CODE = "([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})";

class FeeForm extends Component {
    state = {};

    componentDidMount() {
        const timeFrame = this.props.feeFormDefault.timeFrame;

        this.setState({
            timeFrame: timeFrame[0],
            selectedPrice: this.props.feeFormDefault[timeFrame[0]].min,
            memberFee: 0
        });

        this.calculateMembershipFee(this.props.feeFormDefault[timeFrame[0]].min)
    }

    selectChangeHandler = (event) => {
        const timeFrame = event.target.value;
        this.setState({
            timeFrame,
            selectedPrice: this.props.feeFormDefault[timeFrame].min
        });

        this.calculateMembershipFee(this.props.feeFormDefault[timeFrame].min)
    };

    sliderHandler = (event) => {
        this.setState({
            selectedPrice: parseInt(event.target.value)
        });

        this.calculateMembershipFee(parseInt(event.target.value))
    };

    renderSelect = () => {
        const {feeFormDefault} = this.props;

        return (
            <select defaultValue={feeFormDefault.timeFrame[0]}
                    name="duration_type"
                    id="duration_type"
                    onChange={this.selectChangeHandler}>
                {
                    feeFormDefault.timeFrame.map((time, index) => {
                        return <option key={index} value={time}>{time}</option>
                    })
                }
            </select>
        )
    };

    sliders = () => {
        const {feeFormDefault} = this.props;
        const {timeFrame, selectedPrice} = this.state;
        const minPrice = selectedPrice ? selectedPrice : feeFormDefault[timeFrame].min;

        return (
            <div className="fee_form__price_range__slider">
                <p>Price {[feeFormDefault.currencySym, minPrice]}</p>
                <div className="sliders">
                    <input type="range" className="slider_min" onChange={this.sliderHandler}
                           value={minPrice}
                           min={feeFormDefault[timeFrame].min} max={feeFormDefault[timeFrame].max} step={1}/>
                </div>
            </div>
        )
    };

    calculateMembershipFee = (price) => {
        const {membership} = this.props;
        const pricePerWeek = this.state.timeFrame === 'month' ? (price / 30 * 7) : price;
        let memberFee = 0;

        (membership.fixed_membership_fee) ?
            memberFee = membership.fixed_membership_fee_amount * 1.2 :
            ((pricePerWeek > 0 && pricePerWeek < 120) ? memberFee = 120 : memberFee = pricePerWeek * 1.2);

        this.setState({memberFee: Math.floor(memberFee)})
    };

    postCodeHandler = (event) => this.setState({postCode: event.target.value});

    handleSubmit = async (event) => {
        event.preventDefault();
        const response = await postUserData();

        if (response.status === "created") {
            this.props.submitFormHandler(this.state);
            this.props.history.push('/details')
        }

    };

    render() {
        return Object.keys(this.state).length ? (
            <form onSubmit={this.handleSubmit} className="fee_form">
                <fieldset className="fee_form__price_range">
                    <div className="fee_form__price_range__duration">
                        <h4>Time Frame:</h4>
                        <div className="fee_form__price_range__duration__select">
                            <p>
                                <img src={require('../../img/calendar.png')} alt="calendar"/>
                                {this.state.timeFrame}
                                {this.renderSelect()}
                            </p>

                        </div>

                    </div>
                    {this.sliders()}
                </fieldset>
                <div className="fee_form__post_code">
                    <p><label htmlFor="postcode">Post code</label></p>
                    <div className={"fee_form__post_code__input_wrapper"}>
                        <input type="text" id="postcode" pattern={UK_POST_CODE} required
                               onChange={this.postCodeHandler}
                               title="Please provide valid post code"/>
                    </div>

                </div>
                <div className="fee_form__membership_fee">
                    <p>Membership fee: <span>{this.state.memberFee}</span> inc. 20% VAT</p>
                </div>
                <div className="fee_form__submit">
                    <button type="submit">Submit</button>
                </div>
            </form>) : <h1>Loading...</h1>
    }
}

FeeForm.defaultProps = {
    feeFormDefault: {
        currencySym: '£',
        timeFrame: ['week', 'month'],
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

export default withRouter(FeeForm);
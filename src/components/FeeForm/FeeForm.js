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
            priceRange: {
                min: this.props.feeFormDefault[timeFrame[0]].min,
                max: this.props.feeFormDefault[timeFrame[0]].max
            },
            memberFee: 0
        })
    }

    selectChangeHandler = (event) => {
        const timeFrame = event.target.value;
        this.setState({
            timeFrame,
            priceRange: {
                min: this.props.feeFormDefault[timeFrame].min,
                max: this.props.feeFormDefault[timeFrame].max
            }
        })
    };

    sliderHandler = (event) => {
        const slidersParent = event.target.parentNode;
        const sliderMinVal = parseInt(slidersParent.querySelector('.slider_min').value);
        const sliderMaxVal = parseInt(slidersParent.querySelector('.slider_max').value);
        // Sorting values as values order might be wrong
        const sortedArr = [sliderMinVal, sliderMaxVal].sort((a, b) => a - b);

        this.setState({
            priceRange: {min: sortedArr[0], max: sortedArr[1]}
        })
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
        const {timeFrame, priceRange} = this.state;
        const minPrice = priceRange ? priceRange.min : feeFormDefault[timeFrame].min;
        const maxPrice = priceRange ? priceRange.max : feeFormDefault[timeFrame].max;

        return (
            <div className="fee_form__price_range__slider">
                <p>Min {[feeFormDefault.currencySym, minPrice]}</p>
                <div className="sliders">
                    <input type="range" className="slider_min" onChange={this.sliderHandler}
                           value={minPrice}
                           min={feeFormDefault[timeFrame].min} max={feeFormDefault[timeFrame].max} step={1}/>
                    <input type="range" className="slider_max" onChange={this.sliderHandler}
                           value={maxPrice}
                           min={feeFormDefault[timeFrame].min} max={feeFormDefault[timeFrame].max} step={1}/>
                </div>
                <p>Max {[feeFormDefault.currencySym, maxPrice]}</p>
            </div>
        )
    };

    calculateMembershipFee = (event) => {
        const {membership} = this.props;
        const rentValue = event.target.value ? parseInt(event.target.value) : 0;
        let memberFee = 0;

        (membership.fixed_membership_fee) ?
            memberFee = membership.fixed_membership_fee_amount * 1.2 :
            ((rentValue > 0 && rentValue < 120) ? memberFee = 120 : memberFee = rentValue * 1.2);

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
                               onChange={this.postCodeHandler}/>
                    </div>

                </div>
                <div className="fee_form__membership_fee">
                    <div className="fee_form__membership_fee__input_container">
                        <p><label htmlFor="membership">Rent price per week:</label></p>
                        <div className={"fee_form__membership_fee__input_container__input_wrapper"}>
                            <input type="number" min="0" id="membership"
                                   required
                                   onChange={this.calculateMembershipFee}/>
                        </div>
                    </div>

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
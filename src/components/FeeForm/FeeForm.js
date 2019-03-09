import React, {Component} from 'react';
import './FeeForm.scss';

class FeeForm extends Component {
    state = {

    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="fee_form">
                <fieldset className="fee_form__price_range">
                    <div className="fee_form__price_range__duration">
                        <h4>Price:</h4>
                        <div className="fee_form__price_range__duration__select">
                            <p>Week</p>
                            <select name="duration_type" id="duration_type">
                                <option value="Week">Week</option>
                                <option value="Month">Month</option>
                            </select>
                        </div>

                    </div>
                    <div className="fee_form__price_range__slider">
                        <p>Min</p>
                        <div className="slider">
                            <input type="range" defaultValue={0} min={0} max={30} step={1}/>
                            <input type="range" defaultValue={30} min={0} max={30} step={1}/>
                        </div>
                        <p>Max</p>
                    </div>
                </fieldset>
                <fieldset className="fee_form__post_code">
                    <label for="postcode">Post code</label>
                    <input type="text" id="postcode" pattern="[A-Za-z]{6}" required />
                </fieldset>
                <fieldset className="fee_form__submit">
                    <button type="submit">Submit</button>
                </fieldset>
            </form>
        );
    }
}

export default FeeForm;
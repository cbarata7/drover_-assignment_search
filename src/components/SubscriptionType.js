import React, { Component } from 'react';
import { Radio } from 'react-bootstrap';
import CustomSelectBox from './customs/CustomSelectBox';

/**
* The subscription type area of the side bar component of the application
*/
class SubscriptionType extends Component {

  /**
  * Constructor that initializes the component
  * and sets its state
  */
  constructor () {
    super();

    this.state = {
      hideDuration: false,
      defaultDuration: 12
    }
  }

  /**
  * Function that handles the change of the subscription type option
  * and calls the callback function from the App component
  *
  * @param selectedOption the selectedOption of radio button
  */
  radioChanged = (selectedOption) => {
    let newValue;
    let option = parseInt(selectedOption.target.value) !== 1;

    this.setState({hideDuration: option});

    if(this.props.vehicleType === 'Consumer') {
      if(option) {
        this.forceUpdate();
      }
      newValue = {number_of_months: option ? 1 : 12};
    }
    else if(this.props.vehicleType === 'PCO') {
      newValue = {number_of_weeks: option ? 1 : 52};
    }

    this.props.onSelectCustomBox(newValue);
  }

  /**
  * Function that returns the options to the duration select box
  *
  * @param lastValue the last generated value
  * @param unity can be weeks or months
  *
  * @returns An array with the filter options
  */
  buildOptionsForDuration (lastValue, unity) {
    let options = [];

    for(let i = 2; i < lastValue; i++){
      options.push({value: i, label: i + unity});
    }

    return options;
  }

  /**
  * Function that creates the duration select box
  *
  * @param hide boolean that tells if the duration should be hidden or not
  * @param prop the metadata property
  * @param options the options for the select box
  * @param defaultDuration the selected option of the select box
  *
  * @returns The JSX of duration select box
  */
  addDuration (hide, prop, options, defaultDuration) {
    if(hide) {
      return <div>
      </div>;
    } else {
      return <div>
        <CustomSelectBox
          hide={this.state.hideDuration}
          name={'Duration'}
          metadataKey={prop}
          options={options}
          defaultOptionIndex={defaultDuration}
          onSelectCustomBox={this.props.onSelectCustomBox}/>
      </div>
    }
  }

  /**
  * Function that renders the JSX to the subscription type
  */
  render () {
    let lastValue, prop, defaultDuration, options, subscriptionOption;

    if(this.props.vehicleType) {
      if(this.props.vehicleType === 'Consumer') {
        lastValue = 13;
        prop = 'number_of_months';
        defaultDuration = 10;
        options = this.buildOptionsForDuration(lastValue, ' Months');
        subscriptionOption = 'Month to month subscription';
      } else if(this.props.vehicleType === 'PCO'){
        lastValue = 53;
        prop = 'number_of_weeks';
        defaultDuration = 50;
        options = this.buildOptionsForDuration(lastValue, ' Weeks');
        subscriptionOption = 'Weekly rolling subscription';
      }

      return <div className='subscription-area'>
        <label>
          Subscription type
        </label>
        <Radio
          className='subscription-label'
          checked={this.state.hideDuration}
          name='groupOptions'
          value={0}
          onChange={this.radioChanged}>
          {subscriptionOption}
        </Radio>
        <Radio
          className='subscription-label'
          checked={!this.state.hideDuration}
          name='groupOptions'
          value={1}
          onChange={this.radioChanged}>
          Commit and save subscription
        </Radio>
        {this.addDuration(this.state.hideDuration, prop, options, defaultDuration)}
      </div>
    }
    else {
      return <div></div>
    }
  }
}
export default SubscriptionType;

import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

/** Objects that create a ranger slider */
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

/**
* The custom slider component
*/
class CustomSlider extends Component {

  /**
  * Constructor that initializes the component
  * and sets its state
  *
  * @param props the properties sent by the parent component
  */
  constructor (props) {
    super();

    this.state = {
      minValue: props.defaultOptionIndex[0],
      maxValue: props.defaultOptionIndex[1]
    }
  }

  /**
  * Function that handles the change of a range slider
  * and calls the callback function from the parent component
  *
  * @param selectedOption the selectedOption of both ends of the range slider
  */
  handleDroped = (selectedOption) => {
    let newValue = {};

    newValue[this.props.metadataKeys[0]] = selectedOption[0];
    newValue[this.props.metadataKeys[1]] = selectedOption[1];

    this.props.onDropSlider(newValue);
  }

  /**
  * Function that handles the changes of the range slider ends
  *
  * @param selectedOption the selectedOption of both ends of the range slider
  */
  changeValue = (selectedOption) => {
    this.setState({minValue: selectedOption[0], maxValue: selectedOption[1]})
  }

  /**
  * Function that renders the JSX to the custom slider
  */
  render () {
    return <div className='side-bar-option'>
      <div className='row side-bar-labels'>
        { this.props.name }
      </div>
      <div className='row'>
        { this.state.minValue } - { this.state.maxValue }
      </div>
      <div className='row' >
        <Range
          min={this.props.defaultOptionIndex[0]}
          max={this.props.defaultOptionIndex[1]}
          defaultValue={[this.props.defaultOptionIndex[0], this.props.defaultOptionIndex[1]]}
          onChange={this.changeValue}
          onAfterChange={this.handleDroped}
          />
      </div>
    </div>
  }
}
export default CustomSlider;

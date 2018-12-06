import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

/**
* The custom input component
*/
class CustomInput extends Component {

  /**
  * Constructor that initializes the component
  * and sets its state
  */
  constructor () {
    super();

    this.state = {
      location: null,
      inputValue: ''
    }
  }

  /**
  * Function that handles the change of an input field
  * and calls the callback function from the parent component
  *
  * @param selectedOption the selectedOption of the inputed text
  */
  handleChange = (selectedOption) => {
    let newValue = {};

    newValue[this.props.metadataKey] = selectedOption.value;
    this.props.onBlurCustomInput(selectedOption);
  }

  /**
  * Function that handles the pressing of the enter key
  * and calls the input change funtion
  *
  * @param e the event object
  */
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.inputChange();
    }
  }

  /**
  * Function that handles the typping changes of the text value in the input field
  *
  * @param e the event object
  */
  handleText = (e) => {
    this.setState( {inputValue: e.target.value} );
  }

  /**
  * Function that handles the final changes of the text value in the input field
  */
  inputChange = () => {
    this.handleChange( {location: this.state.inputValue} );
  }

  /**
  * Function that renders the JSX to the custom input field
  */
  render () {
    return <div className='side-bar-option'>
      <div className='row side-bar-labels'>
        { this.props.name }
      </div>
      <div className='row'>
        <FormControl
          type='text'
          ref={ this.state.inputValue }
          onChange={ this.handleText }
          onBlur={ this.inputChange }
          defaultValue={ this.props.defaultOption }
          onKeyPress={ this._handleKeyPress }
          />
      </div>
    </div>
  }
}

export default CustomInput

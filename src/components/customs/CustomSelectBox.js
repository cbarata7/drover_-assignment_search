import React, { Component } from 'react';
import SelectBox from 'react-select';

/**
* The custom select box component
*/
class CustomSelectBox extends Component {

  /**
  * Constructor that initializes the component
  * and sets its state
  */
  constructor () {
    super();

    this.state = {
      selectedOption: undefined
    }
  }

  /**
  * Function that handles the change of a select box
  * and calls the callback function from the parent component
  *
  * @param selectedOption the selectedOption of the select box
  */
  handleChange = (selectedOption) => {
    if(this.state.selectedOption !== selectedOption) {
      let newValue = {};

      this.setState( {selectedOption} );
      newValue[this.props.metadataKey] = selectedOption.value;
      this.props.onSelectCustomBox(newValue);
    }
  }

  /**
  * Function that renders the JSX to the custom select box
  */
  render () {
    return <div className='side-bar-option'>
      <div className='row side-bar-labels'>
        { this.props.name }
      </div>
      <div className='row' >
        <SelectBox
          defaultValue={ this.props.options[this.props.defaultOptionIndex] }
          className='select'
          value={ this.state.selectedOption }
          onChange={ this.handleChange }
          options={ this.props.options }
          />
      </div>
    </div>
  }
}
export default CustomSelectBox;

import React, { Component } from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

/**
* The search type toggle component of the application
*/
class ToggleSearchType extends Component {

  /**
  * Function that handles the change of vehicle Type
  * and calls the callback function from the App component
  *
  * @param selectedOption the selectedOption (Consumer or PCO)
  */
  handleChange = (selectedOption) => {
    this.props.callback({ 'vehicle_type': selectedOption });
  }

  /**
  * Function that renders the JSX to toggle search type
  */
  render () {
    return <ButtonToolbar>
      <ToggleButtonGroup
        className='radioGroupToggleSearchType'
        type='radio'
        name='options'
        defaultValue={ this.props.vehicleType }
        onChange={ this.handleChange }>
        <ToggleButton className='buttonToggleSearchType' value={ 'Consumer' }>
          Consumer
        </ToggleButton>
        <ToggleButton className='buttonToggleSearchType' value={ 'PCO' }>
          PCO
        </ToggleButton>
      </ToggleButtonGroup>
    </ButtonToolbar>
  }
}
export default ToggleSearchType;

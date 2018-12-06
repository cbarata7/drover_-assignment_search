import React, { Component } from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class ToggleSearchType extends Component {

  handleChange = (selectedOption) => {
    this.props.callback({ 'vehicle_type': selectedOption });
  }

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

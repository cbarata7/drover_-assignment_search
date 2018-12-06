import React, { Component } from 'react';
import CustomSelectBox from './customs/CustomSelectBox';

/**
* The status bar component of the application
*/
class StatusBar extends Component {

  /**
  * Function that handles the change of the order filter
  * and calls the callback function from the App component
  *
  * @param selectedOption the selectedOption of the filter select box
  */
  handleChange = (selectedOption) => {
    const order = selectedOption.order_by;
    let option;

    switch (order) {
      case 0:
      option = { order_by: 'price', order_direction: 'asc' };
      break;
      case 1:
      option = { order_by: 'price', order_direction: 'desc' };
      break;
      case 2:
      option = { order_by: 'distance', order_direction: 'asc' };
      break;
      case 3:
      option = { order_by: 'recommended', order_direction: 'asc' };
      break;
      default:
      break;
    }

    this.props.callback(option);
  }

  /**
  * Function that returns the options to the filter select box
  *
  * @returns An array with the filter options
  */
  getSortOptions () {
    return [
      {value: 0, label: 'Price - Low to High'},
      {value: 1, label: 'Price - High to Low'},
      {value: 2, label: 'Distance - Close to Far'},
      {value: 3, label: 'Recomended'}
    ];
  }

  /**
  * Function that renders the JSX to the status bar
  */
  render () {
    const message = !this.props.isLoading && this.props.metadata ?
    this.props.metadata.total_count + ' vehicles available' :
    'Searching for vehicles';

    return <div className='w-100'>
      <div className='row'>
        <div className='col-xs-12 col-sm-6 col-lg-8'>
          <h2>
            { message }
          </h2>
        </div>
        <div className='col-xs-12 col-sm-6 col-lg-4 no-padding'>
          <CustomSelectBox
            metadataKey={ 'order_by' }
            options={ this.getSortOptions() }
            defaultOptionIndex={ 3 }
            onSelectCustomBox={ this.handleChange }/>
        </div>
      </div>
    </div>
  }
}

export default StatusBar;

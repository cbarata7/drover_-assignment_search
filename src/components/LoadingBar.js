import React, { Component } from 'react';

/**
* The loading bar component of the application
*/
class LoadingBar extends Component {

  /**
  * Function that renders the JSX to the loading bar
  */
  render () {
    const style = this.props.hide ? {} : { display: 'none' };

    return <div className='w-100' style={style}>
      <div className='row text-center'>
        <i className='fas fa-spinner fa-spin fa-2x'></i>
      </div>
    </div>
  }
}

export default LoadingBar;

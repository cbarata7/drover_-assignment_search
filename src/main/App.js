import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Grid from '../components/Grid';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import StatusBar from '../components/StatusBar';
import LoadingBar from '../components/LoadingBar';

/** Object that contains the initial state of the application
* that can be used to reset its state */
const getInitialState = () => {
  return {
    isLoading: false,
    cars: [],
    metadata: null,
    currentOptions: {
      per_page: 30,
      page: 1,
      vehicle_type:'Consumer',
      number_of_months: 12,
      number_of_weeks: 52,
      order_by: 'recommended',
      order_direction: 'asc',
      location: 'London, United Kingdom',
      max_distance: 1000,
      number_of_seats_max: 9,
      number_of_seats_min: 2,
      price_max: 3000,
      price_min: 100,
      rolling: false,
      subscription_start_days: 30,
      tags: {}
    }
  }
}

/**
* The main component of the application
*/
class App extends Component {

  /**
  * Constructor that initializes the application
  * and sets its state
  */
  constructor () {
    super();

    this.state = getInitialState();
  }

  /**
  * Function that is invoked after this component is mounted
  * It does the default request to the server
  */
  componentDidMount() {
    this.requestCars();
  }

  /**
  * Function that filters the parameters for the server request
  *
  * @param options the object that contains all the properties
  * that are going to be sent to the server
  *
  * @returns the final object containing the properties to be sent to the server
  */
  createRequestParams (options) {
    let request = this.state.currentOptions;

    if(options) {
      //Formats the request
      if(options.vehicle_type) {
        //Resets everything with new type
        let resetOptions = getInitialState();
        resetOptions.currentOptions.vehicle_type = options.vehicle_type;
        request = resetOptions.currentOptions;
        this.setState(resetOptions);
      } else {
        Object.assign(this.state.currentOptions, options);
        request = this.state.currentOptions;
      }
    }
    return request;
  }

  /**
  * Arrow function that does the request to the server
  * It creates a promise that when is fulfilled can is call two functions
  * depending of the server's answer
  * It also sets the loading
  * and resets the scroll bar position to the top of the page
  *
  * @param options the object that contains all the properties
  * that are going to be sent to the server
  */
  requestCars = (options) => {
    this.setState({isLoading: true});
    window.scrollTo(0, 0);
    axios.post('https://app.joindrover.com/api/web/vehicles', this.createRequestParams(options)
  ).then((response) => {
    this.setState({cars: response.data.data, metadata: response.data.metadata, isLoading: false});
  }).catch((error) => {
    this.setState({isLoading: false});
    alert(error);
  })}

  /**
  * Function that renders the JSX to the main page
  */
  render () {
    return <div>
      <div className='header-division-line'>
        <div className='container'>
          <Header
            vehicleType={this.state.currentOptions.vehicle_type}
            callback={this.requestCars}>
          </Header>
        </div>
      </div>
      <div>
        <div className='container'>
          <div className='row'>
            <div className='row'>
              <div className='col-xs-12 col-sm-3 col-lg-3'>
                <SideBar
                  metadata={this.state.metadata}
                  callback={this.requestCars}
                  />
              </div>
              <div className='col-xs-12 col-sm-9 col-lg-9'>
                <StatusBar
                  isLoading={this.state.isLoading}
                  metadata={this.state.metadata}
                  cars={this.state.cars}
                  callback={this.requestCars}
                  />
                <LoadingBar hide={this.state.isLoading}/>
                <Grid
                  isLoading={this.state.isLoading}
                  cars={this.state.cars}
                  numberOfMonths={this.state.currentOptions.number_of_months}
                  numberOfWeeks={this.state.currentOptions.number_of_weeks}
                  metadata={this.state.metadata}
                  callback={this.requestCars}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
export default App;

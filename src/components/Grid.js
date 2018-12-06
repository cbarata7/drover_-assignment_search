import React, { Component } from 'react';
import CustomPagination from './customs/CustomPagination';

/**
* The grid component of the application
*/
class Grid extends Component {

  /**
  * Function that returns a price of the giving car
  * from the number of months (if the vehicle type were Consumer)
  * or the number of weeks (if the vehicle type were PCO)
  *
  * @param car the object with every car information
  *
  * @returns the price of the car
  */
  getPriceForCar (car) {
    let priceKey, time;

    if(this.props.metadata.vehicle_type === 'Consumer') {
      priceKey = 'subtotal_price_pounds';
      time = this.props.numberOfMonths;
    } else {
      priceKey = 'driver_price_pounds_after_discount_including_insurance';
      time = this.props.numberOfWeeks;
    }

    return this.calculatePriceForCar(car.price_discount_and_deposit_schedule_hash, time, priceKey);
  }

  /**
  * Function that calculates the price of the giving car
  * If there isn't a position in the prices array that matches the given time
  * it returns the price of the previous position
  *
  * @param pricesObj the object with every car prices
  * @param time the number of weeks or months
  * @param priceKey the key of the pricesObj that contains the price information
  *
  * @returns the price of the car
  */
  calculatePriceForCar (pricesObj, time, priceKey) {
    let result, lastKey;

    for (let key of Object.keys(pricesObj)) {
      if(time === parseInt(key)) {
        return Math.round(pricesObj[key][priceKey]);
      }
      else if(time < parseInt(key)) {
        return Math.round(pricesObj[lastKey][priceKey]);
      }
      lastKey = key;
    }

    return result;
  }

  /**
  * Function that generates an array with the JSX of each car
  *
  * @param cars an array with the cars information
  *
  * @returns An array with the JSX of each car
  */
  loadGridContent (cars) {
    const namesList = cars.map((car, index) => {
      const image = car.stock_image ? car.stock_image.main_image_url: car.images[0].small_image_url;

      return <div key={index} className='col-xs-12 col-sm-4 col-lg-4 gridCols'>
        <div className='carImage' style={{backgroundImage: 'url('+ image +')'}}>
          <div className='carInfo'>
            <div className='titleDiv'>
              <h4 className='title font-weight-medium'>{ car.year } { car.vehicle_make }</h4>
              <p>{car.vehicle_model} {car.engine_size_information ? '-': ' '} {car.engine_size_information} </p>
            </div>
            <div className='text-right price-label'>
              <h3 className='price font-weight-medium'>{'£' + this.getPriceForCar(car)}</h3>
              <p>A month</p>
            </div>
          </div>
        </div>
      </div>
    });

    return namesList;
  }

  /**
  * Function that renders the JSX to the grid
  */
  render () {
    return <div>
      <div className='row'>
        <div className='row vehicle-list-container w-100'>
          { this.loadGridContent(this.props.cars) }
        </div>
        <CustomPagination
          hide={ this.props.isLoading || this.props.cars.length === 0 }
          pageMetadata={ this.props.metadata }
          callback={ this.props.callback }
          />
      </div>
    </div>;
  }
}
export default Grid

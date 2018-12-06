import React, { Component } from 'react';
import CustomSelectBox from './customs/CustomSelectBox';
import CustomInput from './customs/CustomInput';
import CustomSlider from './customs/CustomSlider';
import SubscriptionType from './SubscriptionType';
import getSideBarComponents from '../config';

/**
* The side bar component of the application
*/
class SideBar extends Component {

  /**
  * Function that handles the change of every side bar option
  * and calls the callback function from the App component
  *
  * @param selectedOption the selectedOption of the changed option
  */
  handleChange = (selectedOption) => {
    if(selectedOption.tags) {
      selectedOption['tags'] = [selectedOption.tags];
    }

    this.props.callback(selectedOption);
  }

  /**
  * Function that renders the JSX to the side bar
  */
  render () {
    let sideBarList = [];
    let vehicleType;

    if(this.props.metadata) {
      vehicleType = this.props.metadata.vehicle_type;

      const sideBarComponents = getSideBarComponents(this.props.metadata.aggregations, this.props.metadata.vehicle_type);

      sideBarList = sideBarComponents
      .filter(component => component.toAdd)
      .map((component, index) => {
        if(component.type === 'select') {
          return <div key={index}>
            <CustomSelectBox
              name={component.label}
              metadataKey={component.metadataKey}
              options={component.options}
              defaultOptionIndex={component.defaultOptionIndex}
              onSelectCustomBox={this.handleChange}/>
          </div>
        } else if(component.type === 'input') {
          return <div key={index}>
            <CustomInput
              name={component.label}
              metadataKey={component.metadataKey}
              defaultOption={component.defaultOptions}
              onBlurCustomInput={this.handleChange}/>
          </div>
        }
        else if(component.type === 'slider') {
          return <div key={index}>
            <CustomSlider
              name={component.label}
              metadataKeys={component.metadataKeys}
              defaultOptionIndex={component.defaultOptionIndex}
              onDropSlider={this.handleChange}/>
          </div>
        }
        else {
          return <div></div>
        }
      })
    }

    return <div className='side-bar'>
      <SubscriptionType
        vehicleType={vehicleType}
        onSelectCustomBox={this.handleChange}
        />
      { sideBarList }
    </div>
  }
}

export default SideBar;

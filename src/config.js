/** A stateless component to define all the configurations
for the side bar menu **/


/**
* Function that builds a select box options
* from the metadata object returned by the server
*
* @param metadataKey the key of the metadata object
* @param metadata the metadata object
*
* @returns the object with the options for the select box
*/
const buildOptionsFromMetadata = (metadataKey, metadata) => {
  let options = [{value: undefined, label: 'Any'}];

  if(metadata) {
    const prop = metadata[metadataKey];
    for (let key in prop) {
      if (prop.hasOwnProperty(key)) {
        if (metadataKey === 'year') {
          key = parseInt(key);
        }
        options.push({value: key, label: key + '('  + prop[key] + ')'});
      }
    }
  }

  return options;
}

/**
* Function that builds the subscription start days select box
*
* @param vehicleType the key of the metadata object
*
* @returns the object with the options for the select box
*/
const buildOptionsForSubscriptionStartDays = (vehicleType) => {
  let numberOfDays = [];

  if(vehicleType === 'Consumer') {
    numberOfDays = [2, 14, 30];
  }
  else if(vehicleType === 'PCO'){
    numberOfDays = [2, 7, 21];
  }

  let options = numberOfDays.map(function(day, index) {
    return {value: day, label: 'Next ' + day + ' Days'}
  });

  return options;
}

/**
* Function that builds the distance select box
*
* @returns the object with the options for the select box
*/
const buildOptionsForDistance = () => {
  const distance = [25, 50, 75, 100, 150, 200];

  let options = distance.map(function(distance, index) {
    return {value: distance, label: distance}
  });

  options.push({value: 1000, label: 'Nationwide'});

  return options;
}

/**
* Function that returns every option of the side bar menu
*
* @param metadata the metadata object
* @param vehicleType the vehicle type (Consumer or PCO)
*
* @returns an array with every menu option
*/
const getConfig = (metadata, vehicleType) => {
  return [
    {
      type: 'select',
      label: 'Subscription starts within the',
      metadataKey: 'subscription_start_days',
      options: buildOptionsForSubscriptionStartDays(vehicleType),
      defaultOptionIndex: 2,
      toAdd: true
    },
    {
      type: 'input',
      label: 'Location',
      metadataKey: 'location',
      options: metadata,
      defaultOptions: 'London, United Kingdom',
      toAdd: true
    },
    {
      type: 'select',
      label: 'Distance (radius in miles)',
      metadataKey: 'max_distance',
      options:  buildOptionsForDistance(),
      defaultOptionIndex: 6,
      toAdd: true
    },
    {
      type: 'slider',
      label: vehicleType === 'PCO' ? 'Weekly Budget' : 'Monthly Budget',
      metadataKeys: ['price_min', 'price_max'],
      defaultOptionIndex: [100, 3000],
      toAdd: true
    },
    {
      type: 'select',
      label: 'City Jurisdiction',
      metadataKey: 'city_jurisdiction',
      options:  buildOptionsFromMetadata('city_jurisdiction', metadata),
      defaultOptionIndex: 0,
      toAdd: vehicleType === 'PCO'
    },
    {
      type: 'select',
      label: 'Uber Type',
      metadataKey: 'sub_type ',
      options:  buildOptionsFromMetadata('sub_type', metadata),
      defaultOptionIndex: 0,
      toAdd: vehicleType === 'PCO'
    },
    {
      type: 'select',
      label: 'Vehicle Make',
      metadataKey: 'vehicle_make',
      options:  buildOptionsFromMetadata('vehicle_make', metadata),
      defaultOptionIndex: 0,
      toAdd: true
    },
    {
      type: 'select',
      label: 'Gearbox',
      metadataKey: 'transmission',
      options: buildOptionsFromMetadata('transmission', metadata),
      defaultOptionIndex: 0,
      toAdd: true
    },
    {
      type: 'slider',
      label: 'Number of Seats',
      metadataKeys: ['number_of_seats_min', 'number_of_seats_max'],
      defaultOptionIndex: [2, 9],
      toAdd: true
    },
    {
      type: 'select',
      label: 'Year',
      metadataKey: 'year',
      options: buildOptionsFromMetadata('year', metadata),
      defaultOptionIndex: 0,
      toAdd: true
    },
    {
      type: 'select',
      label: 'Fuel Type',
      metadataKey: 'fuel',
      options: buildOptionsFromMetadata('fuel', metadata),
      defaultOptionIndex: 0,
      toAdd: true
    },
    {
      type: 'select',
      label: 'Car Type',
      metadataKey: 'tags',
      options: buildOptionsFromMetadata('tags', metadata),
      defaultOptionIndex: 0,
      toAdd: vehicleType === 'Consumer'
    },
    {
      type: 'select',
      label: 'Body Type',
      metadataKey: 'body_information',
      options: buildOptionsFromMetadata('body_information', metadata),
      defaultOptionIndex: 0,
      toAdd: true
    },
  ];
};

export default getConfig;

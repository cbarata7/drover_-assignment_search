import React, { Component } from 'react';
import Pagination from 'react-bootstrap/lib/Pagination';

/**
* The custom pagination component
*/
class CustomPagination extends Component {

  /**
  * Constructor that initializes the component
  * and sets its state
  */
  constructor () {
    super();

    this.state = {
      active: 1,
      total: 5
    }
  }

  /**
  * Function that is invoked after this an update occurs and it updates
  * the state object with the received property from the parent component
  *
  * @param prevProps the previous properties that were changed
  */
  componentDidUpdate(prevProps) {
    if (this.props.pageMetadata && this.props.pageMetadata !== prevProps.pageMetadata) {
      let active = this.props.pageMetadata.page;
      let total = Math.ceil(this.props.pageMetadata.total_count/this.props.pageMetadata.per_page);

      this.setState({active: active, total: total});
    }
  }

  /**
  * Function that handles the change the pagination number
  * and calls the callback function from the parent component
  *
  * @param pageNumber the selected number
  */
  paginationChange = (pageNumber) => {
    if(pageNumber !== this.props.pageMetadata.page && pageNumber > 0 && pageNumber <= this.state.total) {
      this.props.callback( {page: pageNumber} );
    }
  }

  /**
  * Function that generates an array with the JSX of each pagination item
  *
  * @returns An array with the JSX of each pagination item
  */
  loadPaginationNumber () {
    let items = [];

    if(this.props.pageMetadata) {
      let active = this.state.active;
      let total = this.state.total;

      let firstValue, lastValue;

      if(active - 2 < 1) {
        firstValue = 1;
        lastValue = total < 5 ? total : 5;
      }
      else if(active + 2 > total) {
        firstValue = total - 4;
        lastValue = total;
      }
      else {
        firstValue = active - 2;
        lastValue = active + 2;
      }

      for (let number = firstValue; number <= lastValue; number++) {
        items.push(
          <Pagination.Item
            key={ number }
            active={ number === active }
            onClick={ () => this.paginationChange(number) }>
            { number }
          </Pagination.Item>
        );
      }

      return items;
    }
  }

  /**
  * Function that renders the JSX to the custom pagination
  */
  render () {
    const style = this.props.hide ? { display: 'none' } : {};

    return <div className='text-center' style={ style }>
      <Pagination bsSize='large'>
        <Pagination.First onClick={ () => this.paginationChange(1) }/>
        <Pagination.Prev onClick={ () => this.paginationChange(this.state.active - 1) }/>
        { this.loadPaginationNumber() }
        <Pagination.Next onClick={ () => this.paginationChange(this.state.active + 1) }/>
        <Pagination.Last onClick={ () => this.paginationChange(this.state.total) }/>
      </Pagination>
    </div>;
  }
}

export default CustomPagination;

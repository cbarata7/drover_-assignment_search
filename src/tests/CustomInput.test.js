import React from 'react';
import { shallow } from 'enzyme';
import CustomInput from '../components/customs/CustomInput';

const clickFn = jest.fn();

describe('CustomInput', () => {
  it('should render correctly in debug mode', () => {
    const component = shallow(<CustomInput debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<CustomInput/>);

    expect(component).toMatchSnapshot();
  });

  it('should render banner text correctly with given props', () => {
    const name = 'test';
    const metadataKey = 'test_key';
    const defaultOption = 'test label';
    const onBlurCustomInput = () => { return 'success!'};

    const component = shallow(
      <CustomInput
        name={name}
        metadataKey={metadataKey}
        defaultOption={defaultOption}
        onBlurCustomInput={onBlurCustomInput}/>
    );
    expect(component).toMatchSnapshot();
  });

  it('input blur should call the callback function with the value', () => {
    const name = 'test';
    const metadataKey = 'test_key';
    const defaultOption = 'test label';
    const onBlurCustomInput = () => { return 'success!'};

    const component = shallow(
      <CustomInput
        name={name}
        metadataKey={metadataKey}
        defaultOption={defaultOption}
        onBlurCustomInput={clickFn}/>
    );
    component
    .find('FormControl')
    .simulate('change', { target: { value: 'London' } })
    .simulate('blur');
    expect(clickFn).toHaveBeenCalledWith({'location': 'London'});
  });

  it('input change should change the state', () => {
    const name = 'test';
    const metadataKey = 'test_key';
    const defaultOption = 'test label';
    const onBlurCustomInput = () => { return 'success!'};

    const component = shallow(
      <CustomInput
        name={name}
        metadataKey={metadataKey}
        defaultOption={defaultOption}
        onBlurCustomInput={clickFn}/>
    );
    component
    .find('FormControl')
    .simulate('change', { target: { value: 'London' } });

    expect(component.state().inputValue).toEqual('London');
  });

  it('input blur should call the callback function with the value', () => {
    const name = 'test';
    const metadataKey = 'test_key';
    const defaultOption = 'test label';
    const onBlurCustomInput = () => { return 'success!'};

    const component = shallow(
      <CustomInput
        name={name}
        metadataKey={metadataKey}
        defaultOption={defaultOption}
        onBlurCustomInput={clickFn}/>
    );
    component
    .find('FormControl')
    .simulate('change', { target: { value: 'London' } })
    .simulate('blur');
    expect(clickFn).toHaveBeenCalledWith({'location': 'London'});
  });

});

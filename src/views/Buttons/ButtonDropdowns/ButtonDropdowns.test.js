import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme'
import Review from './Review';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Review />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('toggle click without crashing', () => {
  const wrapper = mount(<Review />);
  for (let i=0; i<19; i++) {
    let ButtonDropdown = wrapper.find('button.dropdown-toggle').at(i);
    ButtonDropdown.simulate('click');
    expect(wrapper.state().dropdownOpen[i]).toEqual(true);
  }
  wrapper.unmount()
});


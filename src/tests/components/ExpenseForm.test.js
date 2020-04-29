import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

// the problem with the below is that createdAt looks at the current moment
// so when we are testing, this will change
// we need to mock the moment library

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});

// we have to do something with e.preventDefault, so we have to pass a second argument 
// in the simulate function to stop Jest from throwing an error
// we should have a state with error

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot(); // make sure no error shows before it runs
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot(); // make sure no error shows after it reruns
});

// we have to match with the first input = .at(0)
// we also have to make sure that e.target.value exists

test('should set description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
    const value = 'New note value';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
    const value = '12.222';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});

// we need to make sure that the onSubmit prop was called with the correctly submitted info
// that's why we need spies
// we can create fake functions and test them, for example:
    // onSubmitSpy('Andrew', 'Miami');
    // expect(onSubmitSpy).toHaveBeenCalledWith('Andrew', 'Miami');
// we have to pass in onSubmit because this is what we are calling

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn(); // this returns the spy and stores it in a variable
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', { // this is where we submit the form
        preventDefault: () => { }
    });
    // we now expect the state to be an empty string AND 
    expect(wrapper.state('error')).toBe('');
    // we expect the spy to be called with specific! arguments
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused').focused).toBe(true);
  });

  
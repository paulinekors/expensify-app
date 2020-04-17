import { createStore, combineReducers } from "redux";

// ADD_EXPENSE
// REMOVE_EXPENSE
// EDIT__EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// EXPENSES REDUCER

// default value for state of expenses = empty array = []
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

// FILTERS REDUCER

// default value for state of filters = text '', sortBy date, startDate undefined, endDate undefined
const filtersReducerDefaultState = {
    text: '', 
    sortBy: 'date', 
    startDate: undefined, 
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

// STORE CREATION

const store = createStore(
    combineReducers({
        expenses: expensesReducer, //this makes sure that the empty array gets moved off of the root/state to an expenses object
        filters: filtersReducer
    })
    );

// check to see if it works and get the default state
console.log(store.getState());

const demoState = {
  expenses: [
    {
      id: "asfa",
      description: "January rent",
      note: "This as the final payment for that address",
      amount: 54500,
      createdAt: 0
    }
  ],
  filters: {
      text: 'rent', 
      sortBy: 'amount', // date or amount
      startDate: undefined,
      endDate: undefined
  }
};

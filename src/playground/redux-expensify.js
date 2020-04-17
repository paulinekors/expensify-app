import { createStore, combineReducers } from "redux";
import { v1 as uuid } from "uuid";

// ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// EXPENSES REDUCER

// default value for state of expenses = empty array = []
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    // = same as above this returns a new array and doesn't change state - push would change the state
    //state.concat(action.expense)
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
          if (expense.id === action.id) {
              return {
                ...expense, //grab the existing expense and properties
                ...action.updates //overwrite the ones that are passed in
              };
          } else {
              return expense; //do nothing
          }
      });
    default:
      return state;
  }
};

// FILTERS REDUCER

// default value for state of filters = text '', sortBy date, startDate undefined, endDate undefined
const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
      case "SET_TEXT_FILTER": //return a new object so do not filter on state
          return {
              ...state,
              text: action.text
          };
    default:
      return state;
  }
};

// STORE CREATION

const store = createStore(
  combineReducers({
    expenses: expensesReducer, //this makes sure that the empty array gets moved off of the root/state to an expenses object
    filters: filtersReducer,
  })
);

// track changes
store.subscribe(() => {
  console.log(store.getState());
});

// This action is going to get dispatched to BOTH reducers: filters and expenses
// But adding an expense doesn't do anything to filtersReducer so we do not need to add a case here
const expenseOne = store.dispatch(
  addExpense({ description: "Coffee", amount: 300 })
);
console.log(expenseOne);
const expenseTwo = store.dispatch(
  addExpense({ description: "Rent", amount: 100 })
);
console.log(expenseTwo);

const removeExpenseOne = store.dispatch(
  removeExpense({ id: expenseOne.expense.id })
);
console.log(removeExpenseOne);

store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter());


// check to see if it works and get the default state > prints it once
// console.log(store.getState());

const demoState = {
  expenses: [
    {
      id: "asfa",
      description: "January rent",
      note: "This as the final payment for that address",
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // date or amount
    startDate: undefined,
    endDate: undefined,
  },
};

// OBJECT SPREAD OPERATOR
// we need to change the babel settings

const user = {
  name: "Jen",
  age: 24,
};

console.log({
  ...user,
  location: "Philly",
  age: 27,
});

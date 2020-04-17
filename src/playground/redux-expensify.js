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
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});

// SET_START_DATE
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

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
            ...action.updates, //overwrite the ones that are passed in
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
        text: action.text,
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};

// timestamps (milliseconds)
// Januray 1st 1970 (unix epoch)
// 33400, 10, -203

// GET VISIBLE EXPENSES
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}

// STORE CREATION

const store = createStore(
  combineReducers({
    expenses: expensesReducer, //this makes sure that the empty array gets moved off of the root/state to an expenses object
    filters: filtersReducer,
  })
);

// track changes
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

// This action is going to get dispatched to BOTH reducers: filters and expenses
// But adding an expense doesn't do anything to filtersReducer so we do not need to add a case here
const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 300, createdAt: -21000 })
);
// console.log(expenseOne);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 100, createdAt: -1000 })
);
// console.log(expenseTwo);

// const removeExpenseOne = store.dispatch(
//   removeExpense({ id: expenseOne.expense.id })
// );
// console.log(removeExpenseOne);

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate(0));
// store.dispatch(setEndDate(1250));

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

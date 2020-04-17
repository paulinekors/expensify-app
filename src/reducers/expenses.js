// default value for state of expenses = empty array = []
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
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

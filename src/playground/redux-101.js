import { createStore } from "redux";

// ACTION GENERATORS - functions that return action objects

//use 1 by default and use the value if it is actually passed in
const incrementCount = ( {incrementBy = 1 } = {}) => ({
      type: 'INCREMENT',
      incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET',
});


// REDUCERS
// 1. Reducers are pure functions = the output is only determined by the input (state,action)
// 2. They never change state or action directly > return it on the new object

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
      case "INCREMENT":
          //const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
        return {
          count: state.count + action.incrementBy,
        };
      case "DECREMENT":
          //const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
        return {
          count: state.count - action.decrementBy,
        };
        case "SET":
          return {
            count: action.count,
          };
      case "RESET":
        return {
          count: 0,
        };
      default:
        return state;
    }
  };

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

// ACTIONS - objects that get sent to the store

// I'd like to increment the count
// store.dispatch({
//   type: "INCREMENT",
//   incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5 }));

//To not console log changes anymore
//unsubscribe();

store.dispatch(incrementCount());

// I'd like to reset the count to zero
store.dispatch(resetCount());

// I'd like to decrement the count

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

// store.dispatch({
//   type: "DECREMENT",
//   decrementBy: 6
// });

// store.dispatch({
//     type: "SET",
//     count: 101
// })
store.dispatch(setCount({ count: 101 }));

//Not needed anymore cause we're using store.subscribe
//console.log(store.getState());

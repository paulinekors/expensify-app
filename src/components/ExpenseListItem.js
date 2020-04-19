import React from "react";
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';

// data is not persisted yet, refreshing brings the deleted items back
const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
   <div>
       <h3>{description}</h3>
       <p>{amount} - {createdAt}</p>
       <button onClick={() => {
           dispatch(removeExpense({ id }));
       }}>Remove</button>
   </div>
);

// we dont need anything from the state so we do not need mapStateToProps
export default connect()(ExpenseListItem);
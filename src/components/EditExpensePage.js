// only difference here is that edit needs a prop to get passed to ExpenseListItem
// so it knows which Id needs to be changed

import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

const EditExpensePage = (props) => {
  // console.log(props);
  return (
    <div>
      {/* Editing the expense with id of {props.match.params.id} */}
      <ExpenseForm
        expense={props.expense}
        onSubmit={(expense) => {
          // dispatch the action to edit the expense
          props.dispatch(editExpense(props.expense.id, expense));
          // redirect to the dashboard
          props.history.push("/");
          console.log("updated", expense);
        }}
      />
      {/* remove expense via dispatch and then redirect to dashboard */}
      <button
        onClick={() => {
          props.dispatch(removeExpense({ id: props.expense.id }));
          props.history.push("/");
        }}
      >
        Remove
      </button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      (expense) => expense.id === props.match.params.id
    ),
  };
};

export default connect(mapStateToProps)(EditExpensePage);

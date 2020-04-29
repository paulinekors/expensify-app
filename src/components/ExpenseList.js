import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

// we test ExpenseList without interactng with the state
// = the unconnected version, that's why we also export the below
export const ExpenseList = (props) => (
  <div>
    {props.expenses.length === 0 ? (
      <p>No expenses</p>
    ) : (
      props.expenses.map((expense) => {
        return <ExpenseListItem key={expense.id} {...expense} />;
      })
    )}
  </div>
);

const mapStateToProps = (state) => {
  return {
    // expenses: state.expenses,
    // filters: state.filters
    // expenses: selectExpenses(state.expenses, state.filters)
    expenses: state.expenses,
  };
};

export default connect(mapStateToProps)(ExpenseList);

//for testing purposes:
{
  /* {props.filters.text} */
}
{
  /* {props.expenses.length} */
}

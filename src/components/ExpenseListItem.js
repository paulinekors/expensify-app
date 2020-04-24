import React from "react";
import { Link } from "react-router-dom";

// data is not persisted yet, refreshing brings the deleted items back
const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {amount} - {createdAt}
    </p>
  </div>
);

// we dont need anything from the state so we do not need mapStateToProps
export default ExpenseListItem;

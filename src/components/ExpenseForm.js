import React from "react";

export default class ExpenseForm extends React.Component {
    state = {
        description: '', //this is the only thing the user needs to add
        amount: '',
        note: ''
    };
    onDescriptionChange = (e) => {
        const description = e.target.value; //we have to pull out the const description first
        this.setState(() => ({ description }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (amount.match(/^\d*(\.\d{0,2})?$/)) { //only accept number and .XX
        this.setState(() => ({ amount }));
        }
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
  render() {
    return (
      <div>
        <form>
          <input 
          type="text" 
          placeholder="Description" 
          autoFocus 
          value={this.state.description}
          onChange={this.onDescriptionChange}
          />
          <input 
          type="number" 
          placeholder="Amount" 
          value={this.state.amount}
          onChange={this.onAmountChange}
          />
          <textarea 
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
          >
          </textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}

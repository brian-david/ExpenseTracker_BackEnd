const sql = require("./db.js");

// constructor
const ExpenseEntry = function(expense_entry) {
  this.date = expense_entry.date;
  this.comment = expense_entry.comment;
  this.value = expense_entry.value;
  this.expense_type_id = expense_entry.expense_type_id
};

//GET ALL EXPENSE ENTRIES
ExpenseEntry.getAll = result => {
  sql.query("SELECT * FROM expenseEntries", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("expense entries: ", res);
    result(null, res);
  });
};

ExpenseEntry.getByType = (expense_type_id, result) => {
    sql.query(`SELECT date, value, expenseEntries.comment FROM expenseEntries INNER JOIN expenseType ON expenseEntries.expenseType_id = ${expense_type_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          // not found Customer with the id
          result(null, res);
        });
}

module.exports = ExpenseEntry;

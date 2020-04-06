const sql = require("./db.js");

// constructor
const ExpenseEntry = function(expense_entry) {
  this.date = expense_entry.date;
  this.comment = expense_entry.comment;
  this.value = expense_entry.value;
  this.expenseType_id = expense_entry.expenseType_id
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

ExpenseEntry.create = (new_entry, result) => {
    sql.query("INSERT INTO expenseEntries SET ?", new_entry, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return
        }
        console.log("new expense ENTRY inserted into the db: ", { id: res.insertId, ...ExpenseEntry});
        result(null, { id: res.insertId, ...ExpenseEntry });
    })
}


ExpenseEntry.remove = (id, result) => {
    sql.query("DELETE FROM expenseEntries WHERE id = ?", id, (err, res) => {
        if(err){
            console.log("ERROR: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0){
            //couldn't find the entry with the given ID
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`entry_model -> removed entry ${id} from expenseEntries`);
        result(null, res);
    });
}

ExpenseEntry.updateById = (id, entry, result) => {
    sql.query(
      "UPDATE expenseEntries SET date = ?, value = ?, comment = ? WHERE id = ?",
      [entry.date, entry.value, entry.comment, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found entry with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated entry: ", { id: id, ...customer });
        result(null, { id: id, ...entry });
      }
    );
  };

module.exports = ExpenseEntry;

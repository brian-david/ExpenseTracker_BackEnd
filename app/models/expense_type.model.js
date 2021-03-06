const sql = require("./db.js");

// constructor
const ExpenseType = function(expesne_type) {
  this.name = expesne_type.name;
  this.comment = expesne_type.comment;
};

//INSERT NEW EXPENSE TYPE
ExpenseType.create = (new_expense_type, result) => {
  sql.query("INSERT INTO expenseType SET ?", new_expense_type, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("new expense type inserted into db: ", { id: res.insertId, ...ExpenseType });
    result(null, { id: res.insertId, ...ExpenseType });
  });
};

//FIND EXPENSE TYPE BY ID
ExpenseType.findById = (expense_type_id, result) => {
  sql.query(`SELECT * FROM expenseType WHERE id = ${expense_type_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found expense type: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found expense tpye with the id
    result({ kind: "not_found" }, null);
  });
};

//GET ALL EXPENSE TYPES
ExpenseType.getAll = result => {
  sql.query("SELECT * FROM expenseType", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("expense types: ", res);
    result(null, res);
  });
};

//UPDATE EXPENSE TYPE BY ID
ExpenseType.updateById = (id, type, result) => {
  sql.query(
    "UPDATE expenseType SET name = ?, comment = ? WHERE id = ?",
    [type.name, type.comment, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated expense type: ", { id: id, ...type });
      result(null, { id: id, ...type });
    }
  );
};

//DELETE SPECIFIC EXPENSE TYPE
ExpenseType.remove = (id, result) => {
  sql.query("DELETE FROM expenseType WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted expense type with id: ", id);
    result(null, res);
  });
};

//DELETE ALL EXPENSE TYPES / CLEAR THE TABLE
ExpenseType.removeAll = result => {
    sql.query("DELETE FROM expenseType", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} expense types`);
      result(null, res);
    });
  };

module.exports = ExpenseType;

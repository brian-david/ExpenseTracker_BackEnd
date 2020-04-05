const ExpenseType = require("../models/expense_type.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Customer
    const expense_type = new ExpenseType({
      name: req.body.name,
      comment: req.body.comment
    });

    // Save Customer in the database
    ExpenseType.create(expense_type, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    ExpenseType.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };

// Find a single Customer with a customerId
exports.findOne = (req, res) => {

};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {

};

// Delete an expense type with the specified id in the request
exports.delete = (req, res) => {
    ExpenseType.remove(req.params.expense_type_ID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Cant find the expense type with id: ${req.params.expense_type_ID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete the expense type with id " + req.params.expense_type_ID
          });
        }
      } else res.send({ message: `Expense tpye was deleted successfully!` });
    });
  };

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    ExpenseType.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all the expense types."
        });
      else res.send({ message: `All expense types were deleted successfully!` });
    });
  };

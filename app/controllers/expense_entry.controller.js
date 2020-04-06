const ExpenseEntry = require("../models/expense_entry.model.js");

exports.findByType = (req, res) => {
    ExpenseEntry.getByType(req.params.type_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Customer with id ${req.params.customerId}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Customer with id " + req.params.customerId
              });
            }
          } else res.send(data);
    });
}

exports.findAll = (req, res) => {
    ExpenseEntry.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving entries."
        });
      else res.send(data);
    });
  };

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    //create an entry object
    const entry = new ExpenseEntry({
        date: req.body.date,
        comment: req.body.comment,
        value: req.body.value,
        expenseType_id: req.body.expenseType_id
    });
    //save the entry to the db
    ExpenseEntry.create(entry, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "couldnt add the new entry"
            });
        else res.send(data);
    });
}

exports.delete = (req, res) => {
    ExpenseEntry.remove(req.params.id, (err, data) => {
        if (err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `entry_controller -> Can't find entry ${req.params.id}`
                });
            }else{
                res.status(500).send({
                    message: `entry_controller -> Couldn't delete entry no. ${req.params.id}`
                });
            }
        }else res.send({message: `entry_controller -> Entry was deleted`});
    });
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    ExpenseEntry.updateById(
        req.params.id,
        new ExpenseEntry(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found entry with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating entry with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

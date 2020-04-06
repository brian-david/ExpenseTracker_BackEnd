module.exports = app => {
    const expense_entry = require("../controllers/expense_entry.controller.js");

    // Get all the expense entries
    app.get("/api/expense_entries", expense_entry.findAll);

    // Retrieve all expense entries for specific expense type
    app.get("/api/expense_type/:type_id/entries", expense_entry.findByType);

    //add new expense entry
    app.post("/api/expense_entry", expense_entry.create);

    //delete an expense entry by id
    app.delete("/api/expense_entry/:id", expense_entry.delete);

    //update an expense entry by id
    app.put("/api/expense_entry/:id", expense_entry.update);

  };

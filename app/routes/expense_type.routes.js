module.exports = app => {
    const expense_type = require("../controllers/expense_type.controller.js");

    // Create a new expense type
    app.post("/api/expense_type", expense_type.create);

    // Retrieve all expense types
    app.get("/api/expense_types", expense_type.findAll);

    // Retrieve an expense type with id
    app.get("/api/expense_type/:expense_type_ID", expense_type.findOne);

    // Update an expense type with id
    app.put("/api/expense_type/:expense_type_ID", expense_type.update);

    // Delete an expense type with id
    app.delete("/api/expense_type/:expense_type_ID", expense_type.delete);

    //DELETE ALL EXPENSE TYPES
    app.delete("/api/expense_types", expense_type.deleteAll);

  };

module.exports = app => {
    const expense_entry = require("../controllers/expense_entry.controller.js");

    // Retrieve all expense entries for specific expense type
    app.get("/api/expense_entries", expense_entry.findAll);

    app.get("/api/expense_type/:type_id/entries", expense_entry.findByType);

  };

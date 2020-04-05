module.exports = app => {
    const expense_type = require("../controllers/expense_type.controller.js");

    // Create a new Customer
    app.post("/api/expense_type", expense_type.create);

    // Retrieve all Customers
    app.get("/api/expense_types", expense_type.findAll);

    // Retrieve a single Customer with customerId
    app.get("/api/expense_type/:expense_type_ID", expense_type.findOne);

    // Update a Customer with customerId
    app.put("/customers/:customerId", expense_type.update);

    // Delete a Customer with customerId
    app.delete("/customers/:customerId", expense_type.delete);
  };

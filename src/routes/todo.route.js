'use strict';

const express = require("express");
const router = express.Router();

const {
    addTodo,
    getAllTodos,
    getTodo,
    updateTodo,
} = require("../controllers/todo.controller");


// Use to create new todo
router.post("/todo", addTodo);

// Use to get all todos
router.get("/todo/", getAllTodos);

// Use to get a single todo
router.get("/todo/:todoId/", getTodo);

// to update the todo
router.put("/todo/:todoId", updateTodo);

module.exports = router;

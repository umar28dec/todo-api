'use strict';

const express = require("express");
const router = express.Router();

const {
    addTodo, getAllTodos, getTodo, updateTodo, deleteTodo,
} = require("../controllers/todo.controller");

const {bodyValidator, idValidator} = require('../middleware/validators/todoValidator.middleware');

// Use to create new todo
router.post("/todo", bodyValidator, addTodo);

// Use to get all todos
router.get("/todo/", getAllTodos);

// Use to get a single todo
router.get("/todo/:todoId/", idValidator, getTodo);

// to update the todo
router.put("/todo/:todoId", [idValidator, bodyValidator], updateTodo);

// to update the todo
router.delete("/todo/:todoId", idValidator, deleteTodo);

module.exports = router;

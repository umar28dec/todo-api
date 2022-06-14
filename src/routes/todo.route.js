'use strict';

const express = require("express");
const router = express.Router();
const verifyToken = require('../auth/verifyToken');

const {
    addTodo, getAllTodos, getTodo, updateTodo, deleteTodo,
} = require("../controllers/todo.controller");

const {bodyValidator, idValidator} = require('../middleware/validators/todoValidator.middleware');

// Use to create new todo
router.post("/todo", [verifyToken, bodyValidator], addTodo);

// Use to get all todos
router.get("/todo/", verifyToken, getAllTodos);

// Use to get a single todo
router.get("/todo/:todoId/", [verifyToken, idValidator], getTodo);

// Use to update the todo
router.put("/todo/:todoId", [verifyToken, idValidator, bodyValidator], updateTodo);

// Use to update the todo
router.delete("/todo/:todoId", [verifyToken, idValidator], deleteTodo);

module.exports = router;

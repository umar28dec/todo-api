'use strict';

const express = require("express");
const router = express.Router();
const VerifyToken = require('../auth/verifyToken');

const {
    addTodo, getAllTodos, getTodo, updateTodo, deleteTodo,
} = require("../controllers/todo.controller");

const {bodyValidator, idValidator} = require('../middleware/validators/todoValidator.middleware');

// Use to create new todo
router.post("/todo", [VerifyToken, bodyValidator], addTodo);

// Use to get all todos
router.get("/todo/", VerifyToken, getAllTodos);

// Use to get a single todo
router.get("/todo/:todoId/", [VerifyToken, idValidator], getTodo);

// Use to update the todo
router.put("/todo/:todoId", [VerifyToken, idValidator, bodyValidator], updateTodo);

// Use to update the todo
router.delete("/todo/:todoId", [VerifyToken, idValidator], deleteTodo);

module.exports = router;

'use strict';

const express = require("express");
const router = express.Router();

const {
    addTodo,
    getAllTodos,
} = require("../controllers/todo.controller");


// Use to create new todo
router.post("/todo", addTodo);

// Use to get all todos
router.get("/todo/", getAllTodos);
module.exports = router;

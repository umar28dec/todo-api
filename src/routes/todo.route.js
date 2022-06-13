'use strict';

const express = require("express");
const router = express.Router();

const {
    addTodo,
} = require("../controllers/todo.controller");


// Use to create new todo
router.post("/todo", addTodo);

module.exports = router;

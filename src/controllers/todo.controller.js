const Todo = require("../documents/todo.document");

exports.addTodo = (req, res) => {
    const todo = new Todo(req.body);
    var responseData = {};
    todo.save((err, task) => {
        if (err || !task) {
            responseData['status'] ='failure';
            responseData['data'] ={};
            responseData['message'] ='Some error occurred.';
            return res.status(400).json(responseData);
        }
        responseData['status'] ='success';
        responseData['data'] =task;
        responseData['message'] ='Todo created successfully.';
        res.json(responseData);
    });
};


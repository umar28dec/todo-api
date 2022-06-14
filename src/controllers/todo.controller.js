const Todo = require("../documents/todo.document");
const {validationResult} = require("express-validator");

exports.addTodo = (req, res) => {
    let error = sendValidationMessage(req, res);
    if (error) {
        return false;
    }
    let todoData = req.body;
    todoData.user_id =req.userId
    const todo = new Todo(todoData);
    let responseData = {};
    todo.save((err, task) => {
        if (err || !task) {
            responseData['status'] = 'failure';
            responseData['data'] = {};
            responseData['message'] = 'Some error occurred.';
            return res.status(500).json(responseData);
        }
        responseData['status'] = 'success';
        responseData['data'] = task;
        responseData['message'] = 'Todo created successfully.';
        res.json(responseData);
    });
};

exports.getAllTodos = (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const user_id =req.userId;
    let responseData = {};
    Todo.find()
        .where({user_id})
        .sort({createdAt: -1})
        .limit(limit).skip(limit * (page-1))
        .exec((err, data) => {
            if (err || !data) {
                responseData['status'] = 'failure';
                responseData['data'] = {};
                responseData['message'] = 'Some error occurred.';
                return res.status(500).json(responseData);
            }

            Todo.count((err, count) => {
                const totalPages = Math.ceil(count / limit)

                let responseWithMeta = {
                    data, meta: {
                        total_record: count, page: page, pages: totalPages,
                    },
                }
                responseData['status'] = 'success';
                responseData['data'] = responseWithMeta;
                responseData['message'] = 'Todo fetched successfully.';
                res.json(responseData);
            })

        });
};

exports.getTodo = function (req, res) {
    let responseData = {};
    let error = sendValidationMessage(req, res);
    if (error) {
        return false;
    }

    Todo.findById(req.params.todoId, function (err, task) {
        if (err || !task) {
            responseData['status'] = 'failure';
            responseData['data'] = {};
            responseData['message'] = 'Some error occurred.';
            return res.status(500).json(responseData);
        }
        responseData['status'] = 'success';
        responseData['data'] = task;
        responseData['message'] = 'Todo fetched successfully.';
        res.json(responseData);
    });
};

exports.updateTodo = (req, res) => {
    let responseData = {};
    let error = sendValidationMessage(req, res);
    if (error) {
        return false;
    }
    Todo.findByIdAndUpdate(req.params.todoId, {
        title: req.body.title,
    }, {new: true})
        .then(task => {
            if (!task) {
                responseData['status'] = 'failure';
                responseData['data'] = {};
                responseData['message'] = 'Todo not found';
                return res.status(404).json(responseData);
            }
            responseData['status'] = 'success';
            responseData['data'] = task;
            responseData['message'] = 'Todo updated successfully.';
            res.json(responseData);
        }).catch(err => {
        responseData['status'] = 'failure';
        responseData['data'] = {};
        responseData['message'] = 'Some error occurred.';
        return res.status(500).json(responseData);
    });
};

exports.deleteTodo = (req, res) => {
    let error = sendValidationMessage(req, res);
    if (error) {
        return false;
    }
    let todoId = req.params.todoId;
    let responseData = {};


    Todo.findByIdAndRemove(todoId)
        .then(task => {
            if (!task) {
                responseData['status'] = 'failure';
                responseData['data'] = {};
                responseData['message'] = 'Todo not found';
                return res.status(404).json(responseData);
            }
            responseData['status'] = 'success';
            responseData['data'] = '';
            responseData['message'] = 'Todo deleted successfully.';
            res.json(responseData);
        }).catch(err => {
        responseData['status'] = 'failure';
        responseData['data'] = {};
        responseData['message'] = 'Some error occurred.';
        return res.status(500).json(responseData);
    });
};

sendValidationMessage = (req, res) => {
    let errors = validationResult(req).mapped()
    if (!(Object.keys(errors).length === 0)) {
        let errorData = {
            status: 'failure', errors: errors, message: 'Todo validation failed'
        }
        return res.status(400).json(errorData);
    }
    return false;
}


const Todo = require("../documents/todo.document");

exports.addTodo = (req, res) => {
    const todo = new Todo(req.body);
    let responseData = {};
    todo.save((err, task) => {
        if (err || !task) {
            responseData['status'] = 'failure';
            responseData['data'] = {};
            responseData['message'] = 'Some error occurred.';
            return res.status(400).json(responseData);
        }
        responseData['status'] = 'success';
        responseData['data'] = task;
        responseData['message'] = 'Todo created successfully.';
        res.json(responseData);
    });
};

exports.getAllTodos = (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;

    let responseData = {};
    Todo.find()
        .sort({createdAt: -1})
        .limit(limit).skip(limit * page)
        .exec((err, data) => {
            if (err || !data) {
                responseData['status'] = 'failure';
                responseData['data'] = {};
                responseData['message'] = 'Some error occurred.';
                return res.status(500).json(responseData);
            }

            Todo.count((err, count) => {
                const totalPages = Math.ceil(count / limit)
                const currentPage = Math.ceil(count % page)

                let responseWithMeta = {
                    data, meta: {
                        total_record: count, page: currentPage, pages: totalPages,
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
        })
};

exports.deleteTodo = (req, res) => {
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
        })
};


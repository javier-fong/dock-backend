const Todo = require('../models/todo-model');

module.exports = {
    async createTodo(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a todo'
            })
        }

        const todo = new Todo({
            email: body.email,
            description: body.description,
            completed: body.completed
        })

        if (!todo) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        try {
            await todo.save();
            return res.status(201).json({
                success: true,
                id: todo._id,
                message: 'Todo created!'
            })
        } catch (err) {
            return res.status(400).json({
                err,
                message: 'Todo not created!'
            })
        }
    },
    async getTodos(req, res) {
        try {
            await Todo.find({ email: req.body.email }, (err, todos) => {
                if (err) return res.status(400).json({ success: false, error: err });
                if (!todos.length) return res.status(404).json({ success: false, error: 'Todos not found' });
                return res.status(200).json(todos);
            })
        } catch (err) {
            console.log(err);
        }
    },
    async updateTodo(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }

        Todo.findOne({ _id: req.params.id }, async (err, todo) => {
            if (err) return res.status(404).json({ err, message: 'Todo not found!' });

            todo.description = body.description;

            try {
                await todo.save();
                return res.status(200).json({
                    success: true,
                    id: todo._id,
                    message: 'Todo updated!'
                })
            } catch (err) {
                console.log(err);
                return res.status(400).json({
                    err,
                    message: 'Todo not updated!'
                })
            }
        })
    },
    async deleteTodo(req, res) {
        try {
            await Todo.findOneAndDelete({ _id: req.params.id }, (err, todo) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }

                if (!todo) {
                    return res.status(404).json({
                        success: false,
                        error: 'Todo not found'
                    })
                }

                return res.status(200).json({
                    success: true,
                    data: todo
                })
            })
        } catch (err) {
            console.log(err)
        }
    }
}
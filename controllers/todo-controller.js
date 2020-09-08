const Todo = require('../models/todo-model');

module.exports = {
    async createToDoList(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a todo'
            })
        }

        const todo = new Todo({
            owner: body.owner,
            toDoListName: body.toDoListName,
            email: body.email,
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
    async addToDoItems(req, res) {
        const body = req.body; 
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to create a To Do item'
            })
        }
        Todo.findOneAndUpdate(
            { _id: req.params.id},
            {
                $push: {
                    description: {
                        item: body.item,
                        completed: body.completed
                    }
                }
            },
            async (err,result) => {
                if(err) {
                    return res.status(404).json({
                        err,
                        message: `unable to post To Do item due to ${err.message}`
                    })
                }
                try {
                    await result.save();
                    return res.status(200).json({
                        success:true,
                        id: result._id,
                        message: 'To Do item posted'
                    })
                } catch (err) {
                    return res.status(400).json({
                        err,
                        message :`unable to post To Do item due to ${err.message}`
                    })
                }
            }
        );
    },
    async getTodos(req, res) {
        try {
            await Todo.find({ email: req.params.email }, (err, todos) => {
                if (err) return res.status(400).json({ success: false, error: err });
                if (!todos.length) return res.status(404).json({ success: false, error: 'Todos not found' });
                return res.status(200).json(todos);
            })
        } catch (err) {
            console.log(err);
        }
    },
    async updateToDoListName(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }

        Todo.findOne({ _id: req.params.id }, async (err, todo) => {
            if (err) return res.status(404).json({ err, message: 'Todo not found!' });

            todo.toDoListName = body.toDoListName;

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
    async updateToDoItem(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }

        Todo.updateOne({ _id: req.params.id }, {
            $set: {
                [`description.${body.index}.item`]: body.description
            }
        }, async (err, result) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: `unable to update To Do item due to ${err.message}`
                })
            }
            try {
                return res.status(200).json({
                    success:true,
                    id: result._id,
                    message: 'To Do item updated'
                })
            } catch (err) {
                return res.status(400).json({
                    err,
                    message :`unable to update To Do item due to ${err.message}`
                })
            }
        })
    },
    async updateTodoCompleted(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }

        Todo.updateOne({ _id: req.params.id }, {
            $set: {
                [`description.${body.index}.completed`]: body.completed
            }
        }, async (err, result) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: `unable to update To Do item due to ${err.message}`
                })
            }
            try {
                return res.status(200).json({
                    success: true,
                    id: result._id,
                    message: 'To Do item updated'
                })
            } catch (err) {
                return res.status(400).json({
                    err,
                    message :`unable to update To Do item due to ${err.message}`
                })
            }
        })
    },
    async deleteToDoItem(req, res) {
        try {
            await Todo.updateOne({ _id: req.params.id }, {
                $pull: {
                    description: {
                        item: {
                            $in: req.params.description
                        }
                    }
                }
            }, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }
                if (!result) {
                    return res.status(404).json({
                        success: false,
                        error: 'Todo not found'
                    })
                }
                return res.status(200).json({
                    success: true,
                    data: result
                })
            })
        } catch(err) {
            console.log(err);
        }
    },
    async deleteToDoList(req, res) {
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
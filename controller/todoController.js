import Todo from "../model/todoModel.js"

export const addTodo = async(req, res) => {
    const {content, memo, status} = req.body;
    try{
        const todoData = new Todo({
            content,
            memo,
            status
        });
        await todoData.save();

        res.redirect('/todos');
    } catch(error) {
        res.status(500).json({error: "저장 안됨"})
    }
}

export const updateTodo = async(req, res) => {
    try{
        const id = req.params.id;
        const todoExist = await Todo.findOne({_id: id});
        if(!todoExist){
            return res.status(404).json({message: "Not found"})
        }
        const updateTodo = await Todo.findByIdAndUpdate(id, req.body,{
            new: true,
        })
        updateTodo;
        res.redirect('/todos');

    } catch(error) {
        res.status(500).json({error: "server error"});
    }
}

export const deleteTodo = async(req, res) => {
    try{
        const id = req.params.id;
        const todoExist = await Todo.findOne({_id: id});

        if(!todoExist){
            return res.status(404).json({message: "Not found"})
        }

        await Todo.findByIdAndDelete(id);
        res.redirect('/todos');
    } catch(error) {
        console.error("Error: ", error);
        res.status(500).json({error: "server error"});
    }
}

export const showUpdateForm = async(req, res) => {
    try{
        const id = req.params.id;
        const todo = await Todo.findById({_id: id});
        if(!todo){
            return res.status(404).json({message: "Not found"})
        }
        // res.json(todo);
        res.render("updateForm", { todo });

    } catch(error) {
        res.status(500).json({error: "server error"});
    }
    
}

export const showDetails = async(req, res) => {
    try{
        const id = req.params.id;
        const todo = await Todo.findById({_id: id});
        if(!todo){
            return res.status(404).json({message: "Not found"})
        }

        res.render("showDetails", { todo });

    } catch(error) {
        res.status(500).json({error: "server error"});
    }
}

export const filterTodo = async (req, res) => {
    const { category } = req.body;

    try {
        let todos;
        if (category === 'All') {
            todos = await Todo.find();
        } else {
            todos = await Todo.find({ status: category });
        }
        res.render('index', { todos });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Server error' });
    }
}
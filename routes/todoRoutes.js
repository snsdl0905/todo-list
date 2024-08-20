import express from 'express'
import { addTodo, updateTodo, deleteTodo, showUpdateForm, showDetails, filterTodo} from '../controller/todoController.js'
import Todo from '../model/todoModel.js';

const router = express.Router();

router.get("/", async(req, res) => {
    try{
        const todos = await Todo.find();
        res.render("index", {todos});
    } catch(error) {
        console.error('Error: ', error);
        res.status(500).json({error: "server error"});
    }
});

router.post("/add", addTodo);
router.get("/showDetail/:id", showDetails);
router.get("/update/:id", showUpdateForm);
router.post("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);
router.get('/filter', filterTodo);

export default router;
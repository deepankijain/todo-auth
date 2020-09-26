const router = require('express').Router();
const Todo = require('../models/todoModel');
const auth = require('../middleware/auth');

router.post("/", auth, async (req, res) => {
    try {
        const { item } = req.body;

        // validation	

        if (!item)
            return res.status(400).json({ msg: "Not all fields have been entered." });

        const newTodo = new Todo({
            item,
            userId: req.user,
        });
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/all", auth, async (req, res) => {
    const todos = await Todo.find({ userId: req.user });
    res.json(todos);
});

router.delete("/:id", auth, async (req, res) => {
    await Todo.deleteOne({ userId: req.user, _id: req.params.id })
        .then(() => {
            res.send("Item deleted");
        });
    //   if (!todo)	
    //     return res.status(400).json({	
    //       msg: "No todo found with this ID that belongs to the current user.",	
    //     });	
    //   const deletedTodo = await Todo.findByIdAndDelete(req.params.id);	
    //   res.json(deletedTodo);	
});


module.exports = router;
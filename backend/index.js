const express = require('express');
const cors = require('cors');
const {createTodo, createUpdate, UpdateTodo} = require("./types");
const { todo } = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post("/todo", async function(res,req){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createTodo);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })

})

app.get("/todos", async function(res,req){
    const todos = await todo.find({});
    
    res.json({
        todos
    })
})

app.put("/completed", async function(res,req){
    const updatePayload = req.body;
    const parsedPayload = UpdateTodo.safeParse(UpdateTodo);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }

    await todo.update({
        _id: req.body.id
    },{
        completed: true
    })

    res.json({
        msg: "Todo marked as completed"
    })

})

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})
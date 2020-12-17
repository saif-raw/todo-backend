const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask.js");
const TodoUpdate = require("./controller/todoUpdate.js");

dotenv.config({
    path: "./config.env"
});
app.use("/static", express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {

    console.log("Connected to the database");

});

app.get('/', async (req, res) => {
    try {
        const allTask = await TodoTask.find();
        res.send(allTask);
    } catch (err) {
        res.send(`Cannot retrieve tasks ${err}`);
    }

});

//Create
app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        task: req.body.task
    });
    console.log(todoTask);
    try {
        await todoTask.save();
        res.send(todoTask);
    } catch (err) {
        console.log(err);
    }
});

//READ by ID
app.get('/:id', async (req, res) => {
    try {
        res.send(await TodoTask.findOne({taskId : req.params.id}));
    } catch (err) {
        res.send(`Task does not exist ${err}`);
    }
});


//UPDATE
app.put('/update/:id', async (req, res) => {
    try {

        const updatedTask = await TodoTask.updateOne({ taskId: req.params.id}, {task: req.body.task
        });
        res.send(updatedTask);
    } catch (err) {
        console.log(err);
        res.send("Failed to Edit");
    }
});


//DELETE

app.delete('/delete/:id', async (req, res) => {
    try{
        res.send(await TodoTask.deleteOne({taskId : req.params.id}));
        
    }
    catch (err) {
        res.send("Could not be deleted");
    }
});


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT }`));
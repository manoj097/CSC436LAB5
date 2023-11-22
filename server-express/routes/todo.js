const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo"); // Update with the correct path to your Todo model
const privateKey = "";

router.use(async function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      // Verify the JWT token
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing" });
  }
});

router.post("/", async function (req, res) {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    dateCreated: req.body.dateCreated, // You might need to adjust this based on your requirements
    completed: req.body.completed || false, // Assuming completed is optional in the request
    dateCompleted: req.body.dateCompleted || null, // Assuming dateCompleted is optional in the request
  });

  todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        title: savedTodo.title,
        description: savedTodo.description,
        author: savedTodo.author,
        dateCreated: savedTodo.dateCreated,
        completed: savedTodo.completed,
        dateCompleted: savedTodo.dateCompleted,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ author: req.payload.id });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      author: req.payload.id,
    });

    if (todo) {
      return res.status(200).json({
        id: todo._id,
        title: todo.title,
        description: todo.description,
        author: todo.author,
        dateCreated: todo.dateCreated,
        completed: todo.completed,
        dateCompleted: todo.dateCompleted,
      });
    } else {
      const existingTodo = await Todo.findById(req.params.id);

      if (existingTodo) {
        // Todo with the provided ID exists, but user is not authorized
        return res.status(403).json({ error: "User not authorized" });
      } else {
        // Todo with the provided ID does not exist
        return res.status(404).json({ error: "Todo not found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      author: req.payload.id,
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found or unauthorized" });
    }

    // Toggle the completion status and update the completed time
    todo.completed = !todo.completed;
    todo.dateCompleted = todo.completed ? new Date() : null;

    // Save the updated todo
    const updatedTodo = await todo.save();

    return res.status(200).json({
      id: updatedTodo._id,
      title: updatedTodo.title,
      description: updatedTodo.description,
      author: updatedTodo.author,
      dateCreated: updatedTodo.dateCreated,
      completed: updatedTodo.completed,
      dateCompleted: updatedTodo.dateCompleted,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;

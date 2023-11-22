const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo"); // Update with the correct path to your Todo model
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;

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

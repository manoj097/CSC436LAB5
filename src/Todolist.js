import React from "react";
import Todo from "./Todo";


export default function Todolist({ todo = [], handleDeleteTodo, toggleTodo }) {
  return (
    <div>
      {todo.map((todos) => (
        <div key={todos.id}> 
          <Todo {...todos} toggleTodo={() => toggleTodo(todos.id)} />
          <button onClick={() => handleDeleteTodo(todos)}>DELETE</button>
        </div>
      ))}
    </div>
  );
}


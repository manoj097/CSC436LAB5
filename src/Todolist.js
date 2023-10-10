import React from "react";
import Todo from "./Todo";
import { v4 as uuidv4 } from 'uuid';  

export default function Todolist({ todo = [] }) {
  return (
    <div>
      {todo.map((p, i) => <Todo {...p} key={uuidv4()} />)}
    </div>
  );
}

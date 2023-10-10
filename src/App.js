import React, { useState } from "react";
import UserBar from "./UserBar";
import Createtodo from "./Createtodo";
import Todolist from "./Todolist";

function App() {
  const [user, setUser] = useState("");
  const [todo, setTodo] = useState([]);

  const handleTodo = (newTodo) => {
    setTodo([newTodo, ...todo]);
  };

  return (
    <div>
      <UserBar user={user} setUser={setUser} />
      {user && (
        <>
          <Createtodo user={user} handleTodo={handleTodo} />
          <Todolist todo={todo} />
        </>
      )}
    </div>
  );
}

export default App;

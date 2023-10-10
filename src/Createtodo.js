import React, { useState } from "react";

export default function Createtodo({ user, handleTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  function handleTitle(evt) {
    setTitle(evt.target.value);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  

  function handleCreate() {
    const newTodo = {
      title,
      description,
      author: user,
      dateCreated: Date.now()
    };

    handleTodo(newTodo);

    
    setTitle("");
    setDescription("");

  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="create-title">TITLE:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          name="create-title"
          id="create-title"
        />
      </div>

      <div>
        <label htmlFor="create-description">DESCRIPTION:</label>
        <textarea
          value={description}
          onChange={handleDescription}
          name="create-description"
          id="create-description"
        />
      </div>
    
      
      <input type="submit" style={{ backgroundColor: 'blue', color: 'white' }} value="Create" onClick={handleCreate} />

    
    </form>
  );
}

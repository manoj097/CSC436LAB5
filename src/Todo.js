import React from "react";
import { useState } from "react";

export default function Todo({ title, description, author, dateCreated}) {

    const [checked, setIsChecked] = useState(false);
    const [completedTime, setCompletedTime] = useState(null);
    const dateCreate = new Date(dateCreated).toLocaleString();

  function handleCheckboxChange(evt) {
    if (evt.target.checked) {
      setCompletedTime(new Date().toLocaleString()); 
    } else {
      setCompletedTime(null); 
    }
    setIsChecked(evt.target.checked);
  }
  return (
    <div>
      <h3>{title}</h3>
      <div>{description}</div>
      <div>
        <strong>Author:</strong> {author}
      </div>
      <div>
        <strong>Created on:</strong> {dateCreate}
      </div>
      <div>
        <strong>Completed:</strong> 
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
      </div>
      {completedTime && <div><strong>Completed on:</strong> {completedTime}</div>}


      

      
    </div>
  );
}

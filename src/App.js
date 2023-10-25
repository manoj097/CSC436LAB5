import React, {  useReducer, useEffect, useState } from "react";
import UserBar from "./UserBar";
import Createtodo from "./Createtodo";
import Todolist from "./Todolist";
import { ThemeContext,StateContext } from "./context";
import appReducer from "./todoReducer";
import Header from "./Header";
import ChangeTheme from "./ChangeTheme";



function App() {

  const [state, dispatch]=useReducer(appReducer,{
    user:"",
    todo:[]
  });

   
  const{user,todo}=state;
  const[theme, setTheme]=useState({primaryColor:"orange", secondaryColor:"purple"});
  
  useEffect(() => {
    if (user) {
    document.title = `${user}'s Blog`
    } else {
    document.title = 'Blog'
    }
    }, [user]);


 

  const handleTodo = (newTodo) => {
    dispatch({ type: "CREATE_TODO", ...newTodo });
  };


  const toggleTodo = (id) => {
  dispatch({
    type: "TOGGLE_TODO",
    id: id,
  
  });
};


  const handleDeleteTodo = (todo) => {
    dispatch({type: "DELETE_TODO",todo });
  };


  
  
  


  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
<ThemeContext.Provider value={theme}>
      <Header text="My Blog" />
      <ChangeTheme theme={theme} setTheme={setTheme} />
      <UserBar  />
      {user && (
        <>
          <Createtodo user={user} handleTodo={handleTodo} />
          <Todolist todo={todo} handleDeleteTodo={handleDeleteTodo} toggleTodo={toggleTodo} />
    
          
        </>
      )}
       </ThemeContext.Provider>
       </StateContext.Provider>
  
    </div>
  );
}

export default App;

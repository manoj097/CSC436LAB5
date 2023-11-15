import React, { useReducer, useEffect, useState } from "react";
import UserBar from "./UserBar";
import Createtodo from "./Createtodo";
import Todolist from "./Todolist";
import { ThemeContext, StateContext } from "./context";
import appReducer from "./todoReducer";
import Header from "./Header";
import ChangeTheme from "./ChangeTheme";
import { useResource } from "react-request-hook";

function App() {
  // useEffect(() => {
  //   fetch("/api/todos")
  //     .then(result => result.json())
  //     .then(todos => dispatch({ type: 'FETCH_TODOS', todos })); // Dispatch todos, not todo
  // }, []);

  const [ todoResponse , getTodos ] = useResource(() => ({
    url: '/todos',
    method: 'get'
    }));

    useEffect(getTodos, []);
    useEffect(()=>
  {
    if(todoResponse && todoResponse.data ){
      dispatch({ type: 'FETCH_TODOS', todos: todoResponse.data.reverse() });
    }
  },[todoResponse]);
 
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todo: []
  });

  const { user,todos } = state;
  const [theme, setTheme] = useState({ primaryColor: "orange", secondaryColor: "purple" });

  useEffect(() => {
    if (user) {
      document.title = `${user}'s Blog`;
    } else {
      document.title = "Blog";
    }
  }, [user]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header text="My Blog" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <UserBar />
          {user && (
            <>
              <Createtodo />
              <Todolist />
            </>
          )}
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;

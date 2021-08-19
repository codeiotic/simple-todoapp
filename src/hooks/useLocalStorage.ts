import { useEffect, useState } from "react";

function useLocalStorage() {
  // We might also add the notifications function here only to simplify the code.

  const [todosArray, setTodos] = useState<string[]>([]);
  let todos: string[] = todosArray;
  let localStorageTodos = localStorage.getItem("todos");

  useEffect(() => {
    if (localStorageTodos) {
      setTodos(JSON.parse(localStorageTodos));
      todos = JSON.parse(localStorageTodos);
    }
  }, [localStorageTodos]);

  const clearTodos = (index?: number) => {
    if (index) {
      setTodos(todosArray.splice(index, 1));
      localStorage.setItem("todos", JSON.stringify(todosArray));
    } else {
      setTodos([]);
      localStorage.setItem("todos", JSON.stringify([]));
    }
  };

  const addTodo = (value: string, index?: number) => {
    if (index) {
      todos?.splice(index, 1, value);
      setTodos(todos);
      localStorage.setItem("todos", JSON.stringify(todosArray));
    } else {
      todos?.push(value);
      setTodos(todos);
      localStorage.setItem("todos", JSON.stringify(todosArray));
    }
  };

  const deleteTodo = (index: number) => {
    // There might be a nice way to do this!

    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    let newArr = localStorage.getItem("todos");
    if (newArr) {
      setTodos(JSON.parse(newArr));
    }
  };

  return { todosArray, clearTodos, addTodo, deleteTodo };
}

export default useLocalStorage;

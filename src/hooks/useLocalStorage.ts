import { useEffect, useState } from "react";

function useLocalStorage() {
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
    let newArr = todos.splice(index, 1);
    setTodos(newArr);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return { todosArray, clearTodos, addTodo, deleteTodo };
}

export default useLocalStorage;

import { useEffect, useState } from "react";

function useLocalStorage() {
  interface TodosSchema {
    id: number;
    todos: string;
  }

  // We might also add the notifications function here only to simplify the code.

  const [todosArray, setTodos] = useState<TodosSchema[]>([]);
  let todos: TodosSchema[] = todosArray;
  let localStorageTodos = localStorage.getItem("todos");

  useEffect(() => {
    if (localStorageTodos) {
      setTodos(JSON.parse(localStorageTodos));
      todos = JSON.parse(localStorageTodos);
    }
  }, [localStorageTodos]);

  useEffect(() => {
    todos = todosArray;
  }, [todosArray]);

  const clearTodos = (index?: number) => {
    if (index) {
      setTodos(todosArray.splice(index, 1));
      localStorage.setItem("todos", JSON.stringify(todosArray));
    } else {
      setTodos([]);
      localStorage.setItem("todos", JSON.stringify([]));
    }
  };

  const addTodo = (value: TodosSchema, index?: number) => {
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
    // There might be a better way to do this!
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    let newArr = localStorage.getItem("todos");
    if (newArr) {
      setTodos(JSON.parse(newArr));
    }
  };

  interface UpdateTodoProps {
    newTodosArr?: TodosSchema[];
    content?: TodosSchema;
    index?: number;
  }

  const updateTodo = ({ newTodosArr, content, index }: UpdateTodoProps) => {
    if (index && content) {
      todos[index] = content;
    } else {
      todos = newTodosArr;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    setTodos(todos);
  };

  return { todosArray, clearTodos, addTodo, deleteTodo, updateTodo, setTodos };
}

export default useLocalStorage;

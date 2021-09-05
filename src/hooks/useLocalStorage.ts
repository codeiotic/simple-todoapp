import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

export interface TodosSchema {
  index: number;
  todos: string;
  completed: boolean;
}
export interface UpdateTodoProps {
  newTodosArr?: TodosSchema[];
  content?: TodosSchema;
  index?: number;
}

export interface ReturnInterface {
  todosArray: TodosSchema[];
  /**
   * Some sort of comment!
   */
  clearTodos: (index?: number) => void;
  markTodoComplete: (
    value: TodosSchema,
    completeOrNot: boolean,
    element: HTMLSpanElement,
    index?: number
  ) => void;
  addTodo: (value: TodosSchema, index?: number) => void;
  deleteTodo: (index: number) => void;
  updateTodo: (props: UpdateTodoProps) => void;
  setTodos: React.Dispatch<React.SetStateAction<TodosSchema[]>>;
  completeTodo: (index: number, completed: boolean) => void;
}

function useLocalStorage(): ReturnInterface {
  const { enqueueSnackbar } = useSnackbar();
  const [todosArray, setTodos] = useState<TodosSchema[]>([]);
  let todos: TodosSchema[] = todosArray;
  let localStorageTodos = localStorage.getItem("todos");

  useEffect((): void => {
    if (localStorageTodos) {
      setTodos(JSON.parse(localStorageTodos));
      todos = JSON.parse(localStorageTodos);
    }
  }, [localStorageTodos]);

  useEffect((): void => {
    todos = todosArray;
  }, [todosArray]);

  /**
   * @method clearTodos
   * @memberof useLocalStorage
   * @description How are you soo good at life??
   */
  const clearTodos = (index?: number): void => {
    if (index) {
      setTodos(todosArray.splice(index, 1));
      localStorage.setItem("todos", JSON.stringify(todosArray));
    } else {
      setTodos([]);
      localStorage.setItem("todos", JSON.stringify([]));
    }
    enqueueSnackbar("Todos Cleared!", {
      variant: "success",
    });
  };

  const addTodo = (value: TodosSchema, index?: number): void => {
    if (index) {
      todos?.splice(index, 1, value);
      setTodos(todos);
      localStorage.setItem("todos", JSON.stringify(todosArray));
    } else {
      todos?.push(value);
      setTodos(todos);
      localStorage.setItem("todos", JSON.stringify(todosArray));
    }
    enqueueSnackbar("Todo added!", {
      variant: "success",
    });
  };

  const markTodoComplete = (
    todo: TodosSchema,
    completeOrNot: boolean,
    element: HTMLSpanElement,
    index?: number
  ): void => {
    if (completeOrNot) {
      todo.completed = true;
      todos[todo.index - 1] = todo;
      setTodos(todos);
      localStorage.setItem("todos", JSON.stringify(todosArray));
      element.innerHTML = todo.todos.strike();
    } else {
      todo.completed = false;
      todos[todo.index - 1] = todo;
      setTodos(todos);
      localStorage.setItem("todos", JSON.stringify(todosArray));
      element.innerHTML = todo.todos;
    }
  };

  const completeTodo = (index: number, completed: boolean): void => {
    console.log(todos);
    todos.map((todo: TodosSchema, todoIndex: number): void => {
      console.log("index", index);
      console.log("todoIndex", todoIndex);
      if (index === todoIndex) {
        todo.completed = completed;
        console.log(todos[todoIndex]);
        setTodos(todos);
      } else {
        todo.completed = todo.completed;
      }
    });
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todosArray));
  };

  /**
   * @method
   * @function
   * @description Deletes a todo at the index passed.
   * @param {number} index - The index of the todo to be deleted.
   */

  const deleteTodo = (index: number): void => {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    let newArr = localStorage.getItem("todos");
    setTodos(JSON.parse(newArr));
    enqueueSnackbar("Todo Deleted!", {
      variant: "error",
    });
  };

  /**
   * This is just a hook which helps to update the todos array, at any instance
   * @description Updates a todo at a specific index.
   * @param {UpdateTodoProps} props - The props to be passed to update the todo.
   * @param {TodosSchema[]} props.newTodosArr - The new todos array to be set.
   * @param {TodosSchema} props.content - The todo content to be updated.
   * @param {number} props.index - The index of the todo to be updated.
   */
  const updateTodo = ({
    newTodosArr,
    content,
    index,
  }: UpdateTodoProps): void => {
    if (content) {
      todos.map((todo: TodosSchema): void => {
        if (todo.index === index) {
          todo.todos = content.todos;
        }
      });
      enqueueSnackbar("Todo Updated!", {
        variant: "success",
      });
    } else {
      todos = newTodosArr;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    setTodos(todos);
  };

  return {
    todosArray,
    clearTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    setTodos,
    markTodoComplete,
    completeTodo,
  };
}

export default useLocalStorage;

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
  clearTodos: (index?: number) => void;
  completeTodo: (
    value: TodosSchema,
    completeOrNot: boolean,
    element: HTMLSpanElement,
    index?: number
  ) => void;
  addTodo: (value: TodosSchema, index?: number) => void;
  deleteTodo: (index: number) => void;
  updateTodo: (props: UpdateTodoProps) => void;
  setTodos: React.Dispatch<React.SetStateAction<TodosSchema[]>>;
}

/**
 * @description Returns the useLocalStorage hook.
 * @returns {ReturnInterface} Helper functions to use inside the whole app.
 */

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
   * @function
   * @method
   * @description Clear's all the todos if no index is passed. If an index is passed, it will clear the todo at the index passed.
   * @param {number} index - (Optional) Index of the todo to be deleted.
   * @inner
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

  /**
   * @description Adds a todo to the todos array relative to the parameters passed.
   * @param {TodosSchema} value - The todo to be added.
   * @param {number} [index] - (Optional) The index to add a todo.
   */
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

  const completeTodo = (
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
    completeTodo,
  };
}

export default useLocalStorage;

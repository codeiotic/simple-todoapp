import { TodosSchema } from "../hooks/useLocalStorage";

const getTodoIndex = (todoIndex: number, todosArray: TodosSchema[]): number => {
  return todosArray.findIndex((todo: TodosSchema): boolean => {
    return todo.index === todoIndex;
  });
};

export default getTodoIndex;

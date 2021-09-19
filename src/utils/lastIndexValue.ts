import { TodosSchema } from "../hooks/useLocalStorage";

const maxIndexValue = (todosArray: TodosSchema[]): number => {
  let maxIndexArray: number[] = [];
  todosArray.map(({ index }: TodosSchema): void => {
    maxIndexArray.push(index);
    return null;
  });
  maxIndexArray.sort((a: number, b: number): number => b - a);
  return maxIndexArray[0] || 0;
};

export default maxIndexValue;

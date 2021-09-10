import { TodosSchema } from "../hooks/useLocalStorage";

export interface ValidateTodoExports {
  /**
   * Array of errors.
   */
  errors: string[];
  /**
   * Valid status.
   */
  valid: boolean;
}

/**
 * Validates the todo on the basis of a fixed criteria
 * @param {string} value - The value to be validated.
 * @param {TodosSchema[]} todosArray - The array of todos already present in the local storage.
 * @exports Object containing an array of errors and the valid status.
 */

const validateTodo = (
  value: string,
  todosArray: TodosSchema[]
): ValidateTodoExports => {
  const errors: string[] = [];
  let valid: boolean = false;
  let todoAlreadyExists: boolean = false;

  todosArray.map((todo: TodosSchema): void => {
    if (Object.values(todo).includes(value.trim())) {
      todoAlreadyExists = true;
      valid = false;
      errors.push(`"${value}" is already in the list`);
    }
  });

  if (!todoAlreadyExists) {
    if (value.trim() === "") {
      valid = false;
      errors.push("Please enter text to add a Todo");
    } else if (value.trim().length >= 30) {
      valid = false;
      errors.push("Please enter todos which are less than 30 letters");
    } else if (value.trim() && !todoAlreadyExists) {
      valid = true;
    }
  }

  return { errors, valid };
};

export default validateTodo;

import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { DraggableProvided } from "react-beautiful-dnd";
import { AiFillDelete } from "react-icons/ai";
import useLocalStorage from "./hooks/useLocalStorage";
import AppStyles from "./styles/App";
import ReactHtmlParser from "react-html-parser";
import { useEffect, useState } from "react";
import { TodosSchema } from "./hooks/useLocalStorage";

export interface ListItemProps {
  todos: string;
  todoIndex: number;
  completed: boolean;
  todoArrayIndex: number;
  provided: DraggableProvided;
  handleModalOpen: (todo: string, completed: boolean, index: number) => void;
  deleteTodo: (index: number) => void;
}

const TodoItem = ({
  todos,
  completed,
  todoIndex,
  todoArrayIndex,
  provided,
  handleModalOpen,
  deleteTodo,
}: ListItemProps): JSX.Element => {
  const { todosArray, completeTodo } = useLocalStorage();
  const className = AppStyles();
  let checkedArray: boolean[] = Array(todosArray.length).fill(false);
  const [checked, setChecked] = useState<boolean[]>(
    Array(todosArray.length).fill(false)
  );

  useEffect((): void => {
    todosArray.map((todo: TodosSchema, todoIndex: number): void => {
      checkedArray[todoIndex] = todo.completed;
    });
    setChecked(checkedArray);
  }, [todosArray]);

  const markChecked = (index: number, completed: boolean): void => {
    checkedArray[index] = completed;
    completeTodo(index, completed);
    setChecked(checkedArray);
    console.log("bar");
  };

  // ! Here's what we are going to do:
  // ! First, make a array of booleans (true or false based on the `completed` property on the todos), and store it in state
  // ! Make react calculate the whole array again whenever the todosArray is updated
  // ! Then, create a function such that will mark the todo as completed or not completed
  // ! Almost done, just a few bit of bugs, which I will fix next week :)
  // ! Till then, deal with this

  return (
    <ListItem
      className={className.list}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Checkbox
        checked={!!checked[todoArrayIndex]}
        onChange={(_, boolean: boolean): void =>
          markChecked(todoArrayIndex, boolean)
        }
      />
      <ListItemText
        id={String(todoIndex)}
        onClick={(): void => handleModalOpen(todos, completed, todoIndex)}
      >
        {todosArray[todoArrayIndex]?.completed
          ? ReactHtmlParser(todos.strike())
          : todos}
      </ListItemText>
      <ListItemIcon>
        <AiFillDelete
          className={className.del}
          onClick={(): void => deleteTodo(todoArrayIndex)}
        />
      </ListItemIcon>
    </ListItem>
  );
};

export default TodoItem;

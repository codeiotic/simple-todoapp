import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { DraggableProvided } from "react-beautiful-dnd";
import { AiFillDelete } from "react-icons/ai";
import useLocalStorage, { TodosSchema } from "./hooks/useLocalStorage";
import AppStyles from "./styles/App";
import ReactHtmlParser from "react-html-parser";

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
  const { todosArray } = useLocalStorage();
  const className = AppStyles();
  return (
    <ListItem
      className={className.list}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <ListItemText
        id={String(todoIndex)}
        onClick={(): void => handleModalOpen(todos, completed, todoIndex)}
      >
        {todosArray[todoIndex - 1]?.completed
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

import {
  Button,
  Checkbox,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";
import { DraggableProvided } from "react-beautiful-dnd";
import useLocalStorage from "../hooks/useLocalStorage";
import ReactHtmlParser from "react-html-parser";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import TodoItemStyles from "../styles/TodoItem";
import moment from "moment";
import { truncate } from "../utils";

export interface ListItemProps {
  todos: string;
  todoIndex: number;
  completed: boolean;
  todoArrayIndex: number;
  time: string;
  provided: DraggableProvided;
  handleModalOpen: (
    todo: string,
    completed: boolean,
    index: number,
    time: string
  ) => void;
  deleteTodo: (index: number) => void;
}

const TodoItem: FC<ListItemProps> = ({
  todos,
  completed,
  todoIndex,
  todoArrayIndex,
  provided,
  time,
  handleModalOpen,
  deleteTodo,
}) => {
  const { todosArray } = useLocalStorage();
  const className = TodoItemStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [updatedTime, setUpdatedTime] = useState(moment(time).fromNow());

  let menuOpen: boolean = Boolean(anchorEl);
  const matches: boolean = useMediaQuery("(min-width:600px)");
  const { completeTodo } = useLocalStorage();

  const handleMenuClose: () => void = (): void => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };

  useEffect((): (() => void) => {
    let handle: NodeJS.Timer = setInterval((): void => {
      setUpdatedTime(moment(time).fromNow());
    }, 10000);

    return (): void => {
      clearInterval(handle);
    };
  }, [time]);

  return (
    <ListItem
      data-id={String(todoIndex)}
      className={className.list}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Checkbox
        value={completed}
        onChange={(e: ChangeEvent<HTMLInputElement>, b: boolean) => {
          // mark this todo as completed!
          completeTodo(
            todosArray[todoArrayIndex],
            b,
            document.getElementById(String(todoIndex)),
            todoArrayIndex
          );
          console.log(todosArray[todoArrayIndex]);
        }}
      />
      <ListItemText
        id={String(todoIndex)}
        onClick={(): void => handleModalOpen(todos, completed, todoIndex, time)}
      >
        {todosArray[todoIndex - 1]?.completed
          ? ReactHtmlParser(truncate(todos.strike()))
          : truncate(todos)}
      </ListItemText>
      <ListItemText className={className.time} id="time">
        {time
          ? window.innerWidth <= 600
            ? updatedTime.slice(0, -4)
            : updatedTime
          : "Please clear all todos to see the time"}
      </ListItemText>
      <ListItemIcon>
        <Button className={className.menuButton} onClick={handleMenuOpen}>
          {!menuOpen ? (
            <FiChevronDown
              className={className.arrowDown}
              style={{
                display: matches ? "none" : "flex",
              }}
            />
          ) : (
            <FiChevronUp className={className.arrowUp} />
          )}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          className={className.menu}
        >
          <MenuItem
            onClick={(): void => {
              handleMenuClose();
              handleModalOpen(todos, completed, todoIndex, time);
            }}
          >
            Edit
          </MenuItem>
          <Divider className={className.divider} />
          <MenuItem
            onClick={(): void => {
              handleMenuClose();
              deleteTodo(todoArrayIndex);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </ListItemIcon>
    </ListItem>
  );
};

export default TodoItem;

import {
  Button,
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
import { MouseEvent, useEffect, useState } from "react";
import TodoItemStyles from "../styles/TodoItem";
import truncate from "../utils/truncate";
import moment from "moment";

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

const TodoItem = ({
  todos,
  completed,
  todoIndex,
  todoArrayIndex,
  provided,
  time,
  handleModalOpen,
  deleteTodo,
}: ListItemProps): JSX.Element => {
  const { todosArray } = useLocalStorage();
  const className = TodoItemStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [updatedTime, setUpdatedTime] = useState(moment(time).fromNow());

  let menuOpen = Boolean(anchorEl);
  const matches = useMediaQuery("(min-width:600px)");

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };

  useEffect((): (() => void) => {
    let handle = setInterval((): void => {
      setUpdatedTime(moment(time).fromNow());
    }, 10000);

    return (): void => {
      clearInterval(handle);
    };
  }, [time]);

  return (
    <ListItem
      className={className.list}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
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

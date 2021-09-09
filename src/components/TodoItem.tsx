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
import { MouseEvent, useState } from "react";
import TodoItemStyles from "../styles/TodoItem";
import truncate from "../utils/truncate";

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
  const className = TodoItemStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  let menuOpen = Boolean(anchorEl);
  const matches = useMediaQuery("(min-width:600px)");

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };

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
          ? ReactHtmlParser(truncate(todos.strike()))
          : truncate(todos)}
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
              handleModalOpen(todos, completed, todoIndex);
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

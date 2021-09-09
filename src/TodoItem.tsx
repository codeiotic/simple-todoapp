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
import useLocalStorage from "./hooks/useLocalStorage";
import AppStyles from "./styles/App";
import ReactHtmlParser from "react-html-parser";
import { FiChevronDown } from "react-icons/fi";
import { MouseEvent, useState } from "react";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  let menuOpen = Boolean(anchorEl);
  const matches = useMediaQuery("(min-width:600px)");

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };

  const truncate = (input: string): string =>
    input.length > 15 ? `${input.substring(0, 15)}...` : input;

  return (
    <>
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
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleMenuOpen}
          >
            <FiChevronDown
              className={className.del}
              style={{
                display: matches ? "none" : "true",
              }}
            />
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
            <Divider
              style={{
                borderBottom: "1px solid gray",
              }}
            />
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
    </>
  );
};

export default TodoItem;

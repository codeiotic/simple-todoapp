import {
  Backdrop,
  Button,
  Fade,
  List,
  Modal,
  TextField,
} from "@material-ui/core";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useSnackbar } from "notistack";
import { ChangeEvent, MouseEvent, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import "./styles.css";
import modalBody from "./components/Modal";
import AppStyles from "./styles/App";
import FlipMove from "react-flip-move";
import { TodosSchema } from "./hooks/useLocalStorage";
import TodoItem from "./components/TodoItem";
import { DraggableProvided, DroppableProvided } from "react-beautiful-dnd";
import maxIndexValue from "./utils/lastIndexValue";

export default function App(): JSX.Element {
  const className = AppStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [todoContent, setTodoContent] = useState<TodosSchema>({
    todos: "",
    index: 0,
    completed: false,
  });

  const { todosArray, clearTodos, addTodo, deleteTodo, updateTodo } =
    useLocalStorage();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const addTodoHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    let todoAlreadyExists: boolean = false;
    todosArray.map((todo: TodosSchema): void => {
      if (Object.values(todo).includes(value.trim())) {
        todoAlreadyExists = true;
        setValue("");
        enqueueSnackbar(`"${value}" is already in the list`, {
          variant: "error",
        });
      }
    });
    if (!todoAlreadyExists) {
      if (value.trim().length >= 30) {
        enqueueSnackbar("Please enter todos which are less than 30 letters", {
          variant: "warning",
          autoHideDuration: 2000,
        });
        setValue("");
        return;
      }
      if (value.trim() && !todoAlreadyExists) {
        addTodo({
          index: maxIndexValue(todosArray) + 1,
          todos: value,
          completed: false,
        });
        setValue("");
        enqueueSnackbar("Todo created!", {
          variant: "success",
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar("Please enter text to add a Todo", {
          variant: "warning",
          autoHideDuration: 2000,
        });
      }
    }
  };

  const clearTodosHandler = (): void => {
    if (todosArray.length === 0) {
      enqueueSnackbar("No todos to clear", {
        variant: "warning",
        autoHideDuration: 2000,
      });
    } else {
      clearTodos();
    }
  };

  const handleModalOpen = (todo: string, completed: boolean, index: number) => {
    setModalOpen(true);
    setTodoContent({
      todos: todo,
      index: index,
      completed: completed,
    });
  };

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) return;
    let items = Array.from(todosArray);
    let [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateTodo({ newTodosArr: items });
  };

  const deleteHandler = (index: number): void => {
    deleteTodo(index);
  };

  return (
    <>
      <div className={className.parent}>
        <div className={className.main}>
          <form action="" className={className.form}>
            <TextField
              id="outlined-basic"
              label="Enter a Todo"
              value={value}
              onChange={onChangeHandler}
              variant="outlined"
              fullWidth
              className={className.input}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={className.button}
              onClick={addTodoHandler}
            >
              Add
            </Button>

            <Button
              className={className.button}
              variant="contained"
              color="secondary"
              onClick={clearTodosHandler}
              type="button"
            >
              Clear All
            </Button>
          </form>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
              {(provided: DroppableProvided): JSX.Element => (
                <List
                  className={className.listParent}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <FlipMove>
                    {todosArray.map(
                      (
                        { todos, index, completed }: TodosSchema,
                        index2: number
                      ): JSX.Element => {
                        return (
                          <div
                            key={index2}
                            className={className.listContentWrapper}
                          >
                            <Draggable
                              draggableId={String(index)}
                              index={index2}
                              key={index}
                            >
                              {(provided: DraggableProvided): JSX.Element => (
                                <TodoItem
                                  todos={todos}
                                  completed={completed}
                                  todoArrayIndex={index2}
                                  todoIndex={index}
                                  provided={provided}
                                  handleModalOpen={handleModalOpen}
                                  deleteTodo={deleteHandler}
                                />
                              )}
                            </Draggable>
                          </div>
                        );
                      }
                    )}
                  </FlipMove>
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="Edit Todo"
          aria-describedby="Edit Todo Modal"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            {modalBody({
              todoState: todoContent,
              todosArray: todosArray,
              modalOpenBoolean: setModalOpen,
              modalOpenBooleanValue: modalOpen,
            })}
          </Fade>
        </Modal>
      </div>
      <img
        src="/assets/wave-haikei.svg"
        alt="Waves ~~"
        className={className.waves}
      />
    </>
  );
}

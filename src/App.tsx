import { ChangeEvent, MouseEvent, useState } from "react";
import {
  Backdrop,
  Button,
  Fade,
  List,
  Modal,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useSnackbar } from "notistack";
import { TodosSchema } from "./hooks/useLocalStorage";
import { DraggableProvided, DroppableProvided } from "react-beautiful-dnd";
import FlipMove from "react-flip-move";
import TodoItem from "./components/TodoItem";
import modalBody from "./components/Modal";
import useLocalStorage from "./hooks/useLocalStorage";
import maxIndexValue from "./utils/lastIndexValue";
import validateTodo from "./utils/validate";
import AppStyles from "./styles/App";
import "./styles.css";

export default function App(): JSX.Element {
  const className = AppStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [todoContent, setTodoContent] = useState<TodosSchema>({
    todos: "",
    index: 0,
    completed: false,
    time: "",
  });

  const { todosArray, clearTodos, addTodo, deleteTodo, updateTodo } =
    useLocalStorage();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const addTodoHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    let { errors, valid } = validateTodo(value, todosArray);

    if (valid) {
      addTodo({
        index: maxIndexValue(todosArray) + 1,
        todos: value,
        completed: false,
        time: new Date().toISOString(),
      });
      setValue("");
    } else {
      enqueueSnackbar(errors[0], { variant: "error" });
      setValue("");
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

  const handleModalOpen = (
    todo: string,
    completed: boolean,
    index: number,
    time: string
  ): void => {
    setModalOpen(true);
    setTodoContent({
      todos: todo,
      index: index,
      completed: completed,
      time: time,
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
                  <FlipMove style={{ width: "100%" }}>
                    {todosArray.map(
                      (
                        { todos, index, completed, time }: TodosSchema,
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
                                  time={time}
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

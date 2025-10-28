import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import AddTask from "./AddTask";
import Task from "./Task";
import { useContext, useEffect, useState, useMemo } from "react";
import { ContextTodos } from "../contexts/contextTodos";
import FullPopupMessage from "./FullPopupMessage";
import PopupForm from "./PopupForm";
import MySnackBar from './MySnackBar';

export default function ToDo() {
    let { arrTodos, setArrTodos } = useContext(ContextTodos);
    let [finalTodos, setFinalTodos] = useState(arrTodos);
    let [todosStatus, setTodosStatus] = useState(0);
    let [openDeletePopup, setOpenDeletePopup] = useState(false);
    let [openEditPopup, setOpenEditPopup] = useState(false);
    let [currentTask, setCurrentTask] = useState({});
     let [showSnackBar, setShowSnackBar] = useState(null);
    

    // Just for practice
    useMemo(() => {
        
    }, [arrTodos]);


    // To to types Buttons
    const buttons = [
        <Button
            onClick={() => setTodosStatus(0)}
            style={{ color: todosStatus === 0 ? "white" : "" }}
            key="one">
            All
        </Button>,
        <Button
            onClick={() => setTodosStatus(1)}
            style={{ color: todosStatus === 1 ? "white" : "" }}
            key="two">
            In Proses
        </Button>,
        <Button
            onClick={() => setTodosStatus(2)}
            style={{ color: todosStatus === 2 ? "white" : "" }}
            key="three">
            Done
        </Button>,
    ];

    //Add or Update to localStorage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(arrTodos));
        filteringArrToDos();
    }, [arrTodos, todosStatus]);

    const filteringArrToDos = () => {
        if (todosStatus == 1) {
            setFinalTodos(arrTodos.filter((t) => t.isCompleted === false));
        } else if (todosStatus == 2) {
            setFinalTodos(arrTodos.filter((t) => t.isCompleted === true));
        } else {
            setFinalTodos(arrTodos);
        }
    };

    // ===Dialogs===
    // ** Delete btn event **
    const popupMessageWhenAccept = () => {
        setArrTodos(arrTodos.filter((t) => t.id !== currentTask.id));
        showSnackBar('Todo Deleted Successfully', 'success');
    };

    const handleDeleteBtnClick = (task) => {
        setOpenDeletePopup(true);
        setCurrentTask(task);
    };
    // ## delete btn event ##

    // ** edit btn event **
    const handleEditBtnClick = (task) => {
        setOpenEditPopup(true);
        setCurrentTask(task);

    };

    const handleEditSaveClick = (newInput) => {
        if (newInput) {
            setArrTodos(
                arrTodos.map((t) => {
                    if (currentTask.id === t.id) {
                        return { ...t, title: newInput };
                    }
                    return t;
                })
            );
            showSnackBar('Todo Edited Successfully', 'success');
        }
    };


    // Final Result to Show
    const showTodo = finalTodos.map((task) => {
        return <Task key={task.id} toDo={task} handleDeleteBtnClick={handleDeleteBtnClick} handleEditBtnClick={handleEditBtnClick}/>;
    });

    return (
        <>
            <Container
                style={{
                    backgroundColor: "#8877fe",
                    minHeight: "300px",
                    borderRadius: "12px",
                    padding: "15px",
                }}
                maxWidth="sm">
                <ButtonGroup
                    variant="contained"
                    aria-label="Medium-sized button group">
                    {buttons}
                </ButtonGroup>

                <hr />
                <div
                    style={{
                        maxHeight: "65vh",
                        overflowX: "hidden",
                        overflowY: "auto",
                    }}>
                    {showTodo}
                </div>

                <AddTask arrTodo={arrTodos} setArrTodo={setArrTodos} />
            </Container>

            {/* This Dialog I named: */}
            <FullPopupMessage
                open={openDeletePopup}
                setOpen={setOpenDeletePopup}
                popupMessageWhenAccept={popupMessageWhenAccept}
            />
            {/* This Dialog I named: */}
            <PopupForm
                handleEditSaveClick={handleEditSaveClick}
                state={{ open: openEditPopup, setOpen: setOpenEditPopup }}
                toDo={currentTask}
            />
            <MySnackBar setShowSnackBar={setShowSnackBar} />
        </>
    );
}

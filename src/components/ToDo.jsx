import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import AddTask from "./AddTask";
import Task from "./Task";
import { useContext, useEffect, useState } from "react";
import { ContextTodos } from "../contexts/contextTodos";

export default function ToDo() {
    let { arrTodos, setArrTodos } = useContext(ContextTodos);
    let [finalTodos, setFinalTodos] = useState(arrTodos);
    let [todosStatus, setTodosStatus] = useState(0);

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
        filtingArrToDos();
        console.log("useEffect working");
    }, [arrTodos, todosStatus]);

    const filtingArrToDos = () => {
        if (todosStatus == 1) {
            setFinalTodos(arrTodos.filter((t) => t.isCompleted === false));
        } else if (todosStatus == 2) {
            setFinalTodos(arrTodos.filter((t) => t.isCompleted === true));
        } else {
            setFinalTodos(arrTodos);
        }
    };

    const showTodo = finalTodos.map((task) => {
        return <Task key={task.id} toDo={task} />;
    });

    return (
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
            <div style={{maxHeight: "65vh", overflowX: "hidden", overflowY: "auto"}}>
            {showTodo}
            </div>

            <AddTask arrTodo={arrTodos} setArrTodo={setArrTodos} />
        </Container>
    );
}

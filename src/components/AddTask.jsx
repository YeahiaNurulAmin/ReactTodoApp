import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import "./addTask.css";
import { useState } from "react";
import { nanoid } from "nanoid";



export default function AddTask({ arrTodo, setArrTodo }) {
    let [inputTask, setInputTask] = useState({});
    let [textInputValue, setTextInputValue] = useState("");

    const hendleTextFieldChange = (event) => {
        setTextInputValue(event.target.value);

        setInputTask({
            id: nanoid(10),
            title: event.target.value,
            isCompleted: false,
        });
    };

    const hendleOnAddClick = () => {
        if (textInputValue) {
            setArrTodo([...arrTodo, inputTask]);
            setTextInputValue("");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") hendleOnAddClick();
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "15px",
                backgroundColor: "#5fa9fe",
                padding: "10px",
                borderRadius: "12px",
            }}>
            <TextField
                value={textInputValue}
                style={{ width: "75%" }}
                className="textField"
                color="secondary"
                id="standard-basic"
                label="Add Task"
                variant="standard"
                onChange={hendleTextFieldChange}
                onKeyDown={handleKeyDown}
            />

            <Button
                disabled={textInputValue <= 0}
                onClick={hendleOnAddClick}
                key={"enter"}
                style={{ color: "white", backgroundColor: "#8877fe" }}
                variant="contained"
                endIcon={<AddCircleIcon />}>
                Add
            </Button>
        </div>
    );
}

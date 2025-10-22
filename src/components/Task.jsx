import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import { useState, useContext } from "react";
import { ContextTodos } from "../contexts/contextTodos";
import "./task.css";

export default function Task({
    toDo,
    handleEditBtnClick,
    handleDeleteBtnClick,
}) {
    let { arrTodos, setArrTodos } = useContext(ContextTodos);

    let [showOption, setShowOption] = useState(false);
    // Delete popup message

    let checkBtnStatus;

    if (toDo.isCompleted) {
        checkBtnStatus = true;
    } else {
        checkBtnStatus = showOption;
    }

    // *** Even Handler ***
    const handleCheckBtnClick = (currentTask) => {
        setArrTodos(
            arrTodos.map((task) => {
                if (task.id == currentTask.id) {
                    task.isCompleted = !currentTask.isCompleted;
                }
                return task;
            })
        );
    };

    // ## edit btn event ##

    // ### End Even Handler ###

    return (
        <>
            <div
                onMouseEnter={() => setShowOption(true)}
                onMouseLeave={() => setShowOption(false)}
                className="taskDiv"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "15px",
                    backgroundColor: "#5fa9fe",
                    padding: "10px",
                    borderRadius: "12px",
                }}>
                <p
                    style={{
                        maxWidth: "70%",
                        textDecorationLine: toDo.isCompleted
                            ? "line-through"
                            : "",
                        textDecorationColor: "black",
                        textDecorationThickness: "2px",
                    }}>
                    {toDo.title}
                </p>
                <div
                    style={{
                        display: "flex",
                        padding: "0px 15px",
                        width: "30%",
                        justifyContent: "space-around",
                    }}>
                    {/* Start Check Btn  */}
                    <div style={{ paddingRight: "0" }} hidden={!checkBtnStatus}>
                        <IconButton
                            onClick={() => {
                                handleCheckBtnClick(toDo);
                            }}>
                            <CheckCircleIcon
                                style={{
                                    color: toDo.isCompleted
                                        ? "#14fa74ff"
                                        : "white",
                                    borderRadius: "50%",
                                    background: toDo.isCompleted ? "white" : "",
                                }}
                                className="iconButton"
                            />
                        </IconButton>
                    </div>
                    {/* End Check Btn  */}
                    {/* Start Delete and Edit Btn */}
                    <div hidden={!showOption}>
                        {/* Start Edit Btn  */}
                        <IconButton
                            onClick={() => {
                                handleEditBtnClick(toDo);
                            }}>
                            <EditNoteIcon
                                style={{ color: "#fedf49" }}
                                className="iconButton"
                            />
                        </IconButton>
                        {/* End edit btn */}
                        {/* Start Delete Button */}
                        <IconButton
                            onClick={() => {
                                handleDeleteBtnClick(toDo);
                            }}>
                            <DeleteForeverIcon
                                style={{ color: "#c62828" }}
                                className="iconButton"
                            />
                        </IconButton>
                        {/* End Delete Btn  */}
                    </div>
                    {/* End Delete and Edit Btn */}
                </div>
            </div>
        </>
    );
}

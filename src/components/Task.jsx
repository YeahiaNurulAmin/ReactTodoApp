import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { ContextTodos } from "../contexts/contextTodos";
import { useContext } from "react";
import FullPopupMessage from "./FullPopupMessage";
import PopupForm from "./PopupForm";
import "./task.css";

export default function Task({ toDo }) {
    let { arrTodos, setArrTodos } = useContext(ContextTodos);

    let [showOption, setShowOption] = useState(false);
    // Delete popup message
    let [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [openEditPopup, setOpenEditPopup] = useState(false);
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

    // ** Delete btn event **
    const popupMessageWhenAccept = () => {
        setArrTodos(arrTodos.filter((t) => t.id !== toDo.id));
    };

    const handleDeleteBtnClick = () => {
        setOpenDeletePopup(true);
    };
    // ## delete btn event ##

    // ** edit btn event **
    const handleEditBtnClick = () => {
        setOpenEditPopup(true);
    };

    const handleEditSaveClick = (newInput) => {
        if (newInput) {
            setArrTodos(
                arrTodos.map((t) => {
                    if (toDo.id === t.id) {
                        return { ...t, title: newInput };
                    }
                    return t;
                })
            );
        }
    };

    // ## edit btn event ##

    // ### Even Handler ###

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
                        textDecorationThickness: "2px"
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
                    {/* *** Check Btn *** */}
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
                    {/* ### Check Btn ### */}
                    <div hidden={!showOption}>
                        {/*** / Edit Btn *** */}
                        <IconButton onClick={handleEditBtnClick}>
                            <EditNoteIcon
                                style={{ color: "#fedf49" }}
                                className="iconButton"
                            />
                        </IconButton>
                        {/* End edit btn */}
                        {/* *** Delete Button *** */}
                        <IconButton
                            onClick={() => {
                                handleDeleteBtnClick();
                            }}>
                            <DeleteForeverIcon
                                style={{ color: "#c62828" }}
                                className="iconButton"
                            />
                        </IconButton>
                        {/* ### Delete Btn ### */}
                    </div>
                </div>
            </div>
            <FullPopupMessage
                open={openDeletePopup}
                setOpen={setOpenDeletePopup}
                popupMessageWhenAccept={popupMessageWhenAccept}
            />
            <PopupForm
                handleEditSaveClick={handleEditSaveClick}
                state={{ open: openEditPopup, setOpen: setOpenEditPopup }}
                toDo={toDo}
            />
        </>
    );
}

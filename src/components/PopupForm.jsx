import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ state, toDo, handleEditSaveClick }) {
    let [newInput, setNewInput] = React.useState(toDo.title);

// To get the latest value of the task
    React.useEffect(() => {
        // FormDialog();
        setNewInput(toDo.title);
    }, [state.open, toDo.title]);

    const handleClose = () => {
        state.setOpen(false);
        setNewInput(toDo.title);
    };

    return (
        <React.Fragment>
            <Dialog open={state.open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        fullWidth
                        variant="standard"
                        value={newInput}
                        onChange={(e) => {
                            setNewInput(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleEditSaveClick(newInput);
                                handleClose();
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleEditSaveClick(newInput);
                            handleClose();
                        }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

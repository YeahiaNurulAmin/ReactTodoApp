import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FullPopupMessage({
    open,
    setOpen,
    popupMessageWhenAccept,
}) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                onClick={() => {
                    handleClose(false);
                }}
                style={{ borderRadius: "20px" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle style={{ color: "" }} id="alert-dialog-title">
                    {"Are You Sure You Want To Remove This Task?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"></DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ color: "red" }}
                        onClick={() => {
                            popupMessageWhenAccept();
                        }}
                        autoFocus>
                        Remove
                    </Button>
                    <Button>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

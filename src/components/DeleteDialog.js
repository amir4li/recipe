import React from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, dialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { Delete } from '@mui/icons-material';

function DeleteDialog({ recipeId }) {
    const [open, setOpen] = React.useState(false);
    const token = useSelector((state) => state.auth.token);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleYes = async () => {
        const res = await axios.delete(`http://localhost:5000/api/v1/recipes/${recipeId}`,
            { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"} });
        window.location.reload(false);
        setOpen(false);
    };
    const handleNo = () => {
        setOpen(false);
    };

    return (
        <div>
        <IconButton onClick={handleClickOpen}>
            <Delete />
        </IconButton>
        <Dialog
            open={open}
            onClose={handleNo}
        >
            <DialogTitle>
            {"Are you sure you want to delete this recipe?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleYes}>Yes</Button>
                <Button onClick={handleNo}>No</Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}

export default DeleteDialog;


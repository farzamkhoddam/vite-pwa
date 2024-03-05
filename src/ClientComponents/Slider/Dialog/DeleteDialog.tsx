import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { HTMLAttributes } from "react";
interface Props extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  onDelete: () => void;
}
const DeleteDialog: React.FC<Props> = ({ open, setOpen, onDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        Delete Slide
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are You Sure You Want To Delete This Slide?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button color={"error"} onClick={onDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;

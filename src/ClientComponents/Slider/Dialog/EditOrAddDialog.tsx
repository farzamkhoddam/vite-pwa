import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import { HTMLAttributes, useState } from "react";
interface Props extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialTitleValue?: string;
  initialDescValue?: string;
  initialImageValue?: string | null;

  onSaveClicked: ({
    titleValue,
    descValue,
    imageValue,
  }: {
    titleValue: string;
    descValue: string;
    imageValue: string;
  }) => void;
}
const EditOrAddDialog: React.FC<Props> = ({
  open,
  setOpen,
  onSaveClicked,
  initialTitleValue,
  initialDescValue,
  initialImageValue,
}) => {
  const [titleInput, setTitleInput] = useState(initialTitleValue || "");
  const [descInput, setDescInput] = useState(initialDescValue || "");
  const [cardFile, setCardFile] = useState<string | null>(
    initialImageValue || null
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
       const reader = new FileReader();
       reader.onloadend = () => {
         setCardFile(reader.result as string);
       };
       reader.readAsDataURL(file);
      if (!file) {
        alert("Please select a file to upload.");
        return;
      }
    }
  };
  const handleSave = () => {
    setOpen(false);
    onSaveClicked({
      titleValue: titleInput,
      descValue: descInput,
      imageValue: cardFile || "",
    });
    setTitleInput("");
    setDescInput("");
    setCardFile("");
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={descInput}
          onChange={(e) => setDescInput(e.target.value)}
        />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="raised-button-file">
          <Button
            onChange={(event) => event.preventDefault()}
            variant="contained"
            component="span">
            Upload File
          </Button>
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          disabled={!titleInput || !descInput || !cardFile}
          onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditOrAddDialog;

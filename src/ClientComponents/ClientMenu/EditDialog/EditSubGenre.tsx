import {
  TextField,
  Divider,
  Box,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  handleSubGenreTitleChange,
  handleSubGenreHrefChange,
  handleDeleteSubGenre,
} from "./Utils";
import { MenuItems, SubGenre } from "@/Types";
import { SetStateAction } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  subGenre: SubGenre;
  itemIndex: number;
  genreIndex: number;
  subGenreIndex: number;
  editableMenuItems: MenuItems[];
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
}

const EditSubGenreComponent: React.FC<Props> = ({
  subGenre,
  itemIndex,
  genreIndex,
  subGenreIndex,
  editableMenuItems,
  setEditableMenuItems,
}) => {
  return (
    <Box sx={{ position: "relative", pt: 2 }}>
      <Tooltip
        sx={{ position: "absolute", top: 0, right: 0 }}
        title="Delete Menu Item">
        <IconButton
          onClick={() =>
            handleDeleteSubGenre({
              itemIndex,
              setEditableMenuItems,
              genreIndex,
              subGenreIndex,
            })
          }
          color={"error"}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Typography fontWeight={"bold"} variant="h6" sx={{ pb: 2 }}>
        {subGenre.text || "Title"}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <TextField
        autoFocus
        margin="dense"
        label="Title"
        type="text"
        fullWidth
        value={subGenre.text}
        onChange={(e) => {
          handleSubGenreTitleChange({
            e,
            itemIndex,
            genreIndex,
            subGenreIndex,
            editableMenuItems,
            setEditableMenuItems,
          });
        }}
      />
      <TextField
        margin="dense"
        label="URL"
        type="text"
        value={subGenre.href}
        onChange={(e) => {
          handleSubGenreHrefChange({
            e,
            itemIndex,
            genreIndex,
            subGenreIndex,
            editableMenuItems,
            setEditableMenuItems,
          });
        }}
        fullWidth
      />
      <Divider sx={{ my: 2 }} />
    </Box>
  );
};
export default EditSubGenreComponent;

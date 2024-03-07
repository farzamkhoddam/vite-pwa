import {
  TextField,
  Button,
  Divider,
  Box,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  handleGenreTitleChange,
  handleGenreHrefChange,
  handleAddSubGenre,
  handleDeleteGenre,
} from "./Utils";
import { Genre, MenuItems, MenuVariantTypes } from "@/Types";
import { SetStateAction, useEffect } from "react";
import { grey } from "@mui/material/colors";
import EditSubGenreComponent from "./EditSubGenre";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  genre: Genre;
  itemIndex: number;
  genreIndex: number;
  editableMenuItems: MenuItems[];
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
}

const EditGenreComponent: React.FC<Props> = ({
  genre,
  itemIndex,
  genreIndex,
  editableMenuItems,
  setEditableMenuItems,
}) => {
  useEffect(() => {
    if (
      genre.subGenres?.length === 0 &&
      genre.variant === MenuVariantTypes.GENRE
    ) {
      setEditableMenuItems((prevState) => {
        const genres = prevState[itemIndex].genres;
        return prevState.map((item, index) => {
          if (index === itemIndex) {
            return {
              ...item,
              genres: genres?.map((genreEl, i) => {
                if (i === genreIndex) {
                  return {
                    ...genreEl,
                    variant: MenuVariantTypes.LINK,
                    href: "",
                  };
                }
                return genreEl;
              }),
            };
          }
          return item;
        });
      });
    }
  }, [genre.subGenres?.length, genre.variant, genreIndex, itemIndex, setEditableMenuItems]);
  return (
    <Box sx={{ pt: 2, position: "relative" }}>
      <Tooltip
        sx={{ position: "absolute", top: 0, right: 0 }}
        title="Delete Menu Item">
        <IconButton
          onClick={() =>
            handleDeleteGenre({ itemIndex, setEditableMenuItems, genreIndex })
          }
          color={"error"}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Typography fontWeight={"bold"} variant="h5" sx={{ pb: 2 }}>
        {genre.text || "Title"}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <TextField
        autoFocus
        margin="dense"
        label="Title"
        type="text"
        fullWidth
        value={genre.text || ""}
        onChange={(e) => {
          handleGenreTitleChange({
            e,
            itemIndex,
            genreIndex,
            editableMenuItems,
            setEditableMenuItems,
          });
        }}
      />
      {genre.variant === MenuVariantTypes.LINK ? (
        <TextField
          margin="dense"
          label="URL"
          type="text"
          value={genre.href || ""}
          onChange={(e) => {
            handleGenreHrefChange({
              e,
              itemIndex,
              genreIndex,
              editableMenuItems,
              setEditableMenuItems,
            });
          }}
          fullWidth
        />
      ) : (
        <Box
          sx={{
            pl: 2,
            pr: 3,
            borderLeft: "1px solid",
            borderColor: grey[500],
          }}>
          {genre.subGenres?.map((subGenre, subGenreIndex) => {
            return (
              <EditSubGenreComponent
                subGenre={subGenre}
                itemIndex={itemIndex}
                genreIndex={genreIndex}
                subGenreIndex={subGenreIndex}
                editableMenuItems={editableMenuItems}
                setEditableMenuItems={setEditableMenuItems}
              />
            );
          })}
        </Box>
      )}
      <Button
        onClick={() => {
          handleAddSubGenre({
            itemIndex,
            genreIndex,
            editableMenuItems,
            setEditableMenuItems,
          });
        }}>
        Add Sub Genre
      </Button>
      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

export default EditGenreComponent;

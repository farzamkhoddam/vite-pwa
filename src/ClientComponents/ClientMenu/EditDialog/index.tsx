import { MenuItems, MenuVariantTypes } from "@/Types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { SetStateAction, useState } from "react";
import {
  handleTitleChange,
  handleHrefChange,
  handleAddGenre,
  handleAddItem,
  editableMenuItemsHasNoUndefined,
  handleDeleteItem,
} from "./Utils";
import EditGenreComponent from "./EditGenre";

interface Props {
  menuItems: MenuItems[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
}
const EditDialog: React.FC<Props> = ({
  menuItems,
  open,
  setOpen,
  setMenuItems,
}) => {
  const [editableMenuItems, setEditableMenuItems] =
    useState<MenuItems[]>(menuItems);
  function handleSave() {
    setMenuItems(editableMenuItems);
    setOpen(false);
  }
  function handleClose() {
    {
      setOpen(false);
      setEditableMenuItems(menuItems);
    }
  }

  const isSaveDisabled = editableMenuItemsHasNoUndefined(editableMenuItems);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          maxHeight: "calc(100% - 100px)",
          top: "2rem",
        },
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Edit Menu</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
          }}>
          {editableMenuItems.map((menuItem, itemIndex) => {
            if (
              menuItem.variant === MenuVariantTypes.GENRE &&
              menuItem?.genres?.length === 0
            ) {
              setEditableMenuItems((prevState) => {
                return prevState.map((item, i) => {
                  if (i === itemIndex) {
                    return {
                      ...item,
                      variant: MenuVariantTypes.LINK,
                      href: "",
                    };
                  }
                  return item;
                });
              });
            }

            return (
              <Box sx={{ position: "relative" }}>
                <Tooltip
                  sx={{ position: "absolute", top: 0, right: 0 }}
                  title="Delete Menu Item">
                  <IconButton
                    onClick={() =>
                      handleDeleteItem({ itemIndex, setEditableMenuItems })
                    }
                    color={"error"}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Typography fontWeight={"bold"} variant="h4" sx={{ pb: 2 }}>
                  {menuItem.text || "Title"}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Title"
                  type="text"
                  fullWidth
                  value={menuItem.text}
                  onChange={(e) => {
                    handleTitleChange({
                      e,
                      itemIndex,
                      editableMenuItems,
                      setEditableMenuItems,
                    });
                  }}
                />
                {menuItem.variant === MenuVariantTypes.LINK ? (
                  <TextField
                    margin="dense"
                    label="URL"
                    type="text"
                    value={menuItem.href}
                    onChange={(e) => {
                      handleHrefChange({
                        e,
                        itemIndex,
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
                      position: "relative",
                    }}>
                    {menuItem.genres?.map((genre, genreIndex) => {
                      return (
                        <EditGenreComponent
                          genre={genre}
                          itemIndex={itemIndex}
                          genreIndex={genreIndex}
                          editableMenuItems={editableMenuItems}
                          setEditableMenuItems={setEditableMenuItems}
                        />
                      );
                    })}
                  </Box>
                )}

                <Button
                  onClick={() => {
                    handleAddGenre({
                      itemIndex,
                      editableMenuItems,
                      setEditableMenuItems,
                    });
                  }}>
                  Add Genre
                </Button>
                <Divider sx={{ my: 2 }} />
              </Box>
            );
          })}
          <Button
            onClick={() => {
              handleAddItem({
                setEditableMenuItems,
              });
            }}
            variant="contained"
            fullWidth>
            Add Items
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        {" "}
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={isSaveDisabled} onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditDialog;

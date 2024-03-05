import { ClientSlider_Cards } from "@/Types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import EditOrAddDialog from "./Dialog/EditOrAddDialog";
import DeleteDialog from "./Dialog/DeleteDialog";

interface Props {
  setCards: React.Dispatch<React.SetStateAction<ClientSlider_Cards[]>>;
  card: ClientSlider_Cards;
  index: number;
}
const CardComponent: React.FC<Props> = ({ card, index, setCards }) => {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  function OnDialogSave({
    titleValue,
    descValue,
    imageValue,
  }: {
    titleValue: string;
    descValue: string;
    imageValue: string;
  }) {
    setCards((prevState) => {
      const updatedCards = prevState.map((item, i) => {
        if (i === index) {
          return {
            title: titleValue,
            desc: descValue,
            image: imageValue || "",
          };
        }
        return item;
      });
      return updatedCards;
    });
  }
  function DeleteCard() {
    setCards((prevState) => {
      const updatedCards = prevState.filter((item, i) => {
        return i != index;
      });
      return updatedCards;
    });
    setOpenDeleteDialog(false);
  }
  return (
    <>
      {/* Edit Dialog */}
      {openEditDialog && (
        <EditOrAddDialog
          open={openEditDialog}
          setOpen={setOpenEditDialog}
          onSaveClicked={OnDialogSave}
          initialTitleValue={card.title}
          initialDescValue={card.desc}
          initialImageValue={card.image}
        />
      )}
      {/* Delete Dialog */}
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        onDelete={DeleteCard}
      />
      {/*  */}
      <Card onClick={() => setOpenEditDialog(true)} sx={{ width: "17rem" }}>
        <CardMedia
          sx={{ height: 140 }}
          image={card.image || ""}
          title="Image"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {index}
            {card.title}
          </Typography>
          <Desc variant="body2" color="text.secondary">
            {card.desc}
          </Desc>
        </CardContent>
        <CardActions>
          <Button size="small" startIcon={<ModeEditIcon />}>
            Edit
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            color="error"
            onClick={(event) => {
              event.stopPropagation();
              setOpenDeleteDialog(true);
            }}
            size="small">
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default CardComponent;
const Desc = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

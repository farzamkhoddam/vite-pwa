import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";

import { useDrag } from "react-dnd";
import { ComponentTypes, ItemType } from "../../../Types";

const DraggableListItems = ({ text }: { text: ComponentTypes }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.listItem,
    item: { name: text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <ListItem
      sx={{ opacity: isDragging ? 0.5 : 1 }}
      ref={drag}
      key={text}
      disablePadding>
      <ListItemButton disableRipple>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};
export default DraggableListItems;

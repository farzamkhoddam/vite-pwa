import { Drawer, Toolbar, Box, List } from "@mui/material";
import DraggableListItems from "./DraggableListItems";
import { ComponentTypes } from "../../../Types";
const drawerWidth = 240;

const ListDrawer = () => {
  const listItems = [
    ComponentTypes.BUTTON,
    ComponentTypes.INPUT,
    ComponentTypes.RATING,
    ComponentTypes.SWITCH,
  ];
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: "flex",
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        height: 1,
      }}>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {listItems.map((text, index) => (
            <DraggableListItems text={text} key={index} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
export default ListDrawer;

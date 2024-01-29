import { Drawer, Toolbar, Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ComponentTypes } from "../../Types";
const drawerWidth = 240;

const ListDrawer = ({
  setSelectedComponent,
}: {
  setSelectedComponent: React.Dispatch<React.SetStateAction<ComponentTypes>>;
}) => {
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
          <ListItem
            onClick={() => setSelectedComponent(ComponentTypes.MENU)}
            disablePadding>
            <ListItemButton sx={{ px: 2 }}>
              <ListItemText>Menu</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => setSelectedComponent(ComponentTypes.NEWS)}
            disablePadding>
            <ListItemButton sx={{ px: 2 }}>
              <ListItemText>News</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => setSelectedComponent(ComponentTypes.SLIDER)}
            disablePadding>
            <ListItemButton sx={{ px: 2 }}>
              <ListItemText>Slider</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
export default ListDrawer;

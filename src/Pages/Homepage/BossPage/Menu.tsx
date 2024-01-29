import { AppBar, Box, List, Toolbar, Typography } from "@mui/material";
import { ComponentTypes } from "../../../Types";
import DraggableListItems from "../ClientPage/DraggableListItems";
import { Link } from "react-router-dom";

const Menu = () => {
  const listItems = [
    ComponentTypes.BUTTON,
    ComponentTypes.INPUT,
    ComponentTypes.RATING,
    ComponentTypes.SWITCH,
  ];
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          to={{
            pathname: "/settings",
            search: "?boss=true",
          }}>
          <Typography variant="h6">Settings</Typography>
        </Link>
        <Box>
          <List sx={{ display: "flex" }}>
            {listItems.map((text, index) => (
              <DraggableListItems text={text} key={index} />
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Menu;

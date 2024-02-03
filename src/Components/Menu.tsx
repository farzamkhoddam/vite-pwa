import { AppBar, Box, List, Toolbar, Typography } from "@mui/material";
import { ComponentTypes } from "../Types";
import DraggableListItems from "../Pages/Homepage/ClientPage/DraggableListItems";
import { Link, useSearchParams } from "react-router-dom";

const Menu = () => {
  const [searchParams] = useSearchParams();
  const isClientBoss = searchParams.get("boss") === "true";
  const listItems = [
    ComponentTypes.BUTTON,
    ComponentTypes.INPUT,
    ComponentTypes.RATING,
    ComponentTypes.SWITCH,
  ];
  return (
    <AppBar sx={{ zIndex: 999999 }} position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          to={{
            pathname: "/",
          }}>
          <Typography variant="h6">Homepage</Typography>
        </Link>
        <Box>
          {isClientBoss ? (
            <List sx={{ display: "flex" }}>
              {listItems.map((text, index) => (
                <DraggableListItems text={text} key={index} />
              ))}
            </List>
          ) : (
            <Link
              to={{
                pathname: "/",
                search: "?boss=true",
              }}>
              <Typography variant="h6">I'm the boss</Typography>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Menu;

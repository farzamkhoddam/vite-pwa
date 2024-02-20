import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { ComponentTypes } from "../Types";
import DraggableListItems from "./DraggableListItems";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { GridContext } from "../Pages/Homepage/Context/GridContext";

const Menu = () => {
  const [searchParams] = useSearchParams();
  const isClientBoss = searchParams.get("boss") === "true";
  const listItems = [
    ComponentTypes.BUTTON,
    ComponentTypes.INPUT,
    ComponentTypes.RATING,
    ComponentTypes.SWITCH,
  ];
  const { uIDs } = useContext(GridContext);
  const mutation = useMutation(
    async () => {
      const response = await axios.post(
        "https://localhost:7215/api/layout",
        uIDs
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("Layout saved successfully!");
      },
      onError: () => {
        toast.error("Something went wrong! Try again later");
      },
    }
  );

  return (
    <AppBar sx={{ zIndex: 999999 }} position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          to={{
            pathname: "/",
          }}>
          <Typography variant="h6">Homepage</Typography>
        </Link>
        <Button
          onClick={() => {
            mutation.mutate();
          }}
          disabled={mutation.isLoading}
          sx={{ height: "2.5rem" }}
          variant={"contained"}>
          {mutation.isLoading ? (
            <CircularProgress
              sx={{ width: "100% !important", height: "auto !important" }}
            />
          ) : (
            "Save"
          )}
        </Button>
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

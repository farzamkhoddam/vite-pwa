import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { ComponentTypes, CookiesTypes } from "../Types";
import DraggableListItems from "./DraggableListItems";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { GridContext } from "../Pages/Homepage/Context/GridContext";
import Cookies from "js-cookie";
import { IsClientBoss } from "@/utils";

const Menu = () => {
  const isClientBoss = IsClientBoss();
  const listItems = [
    ComponentTypes.BUTTON,
    ComponentTypes.INPUT,
    ComponentTypes.RATING,
    ComponentTypes.SLIDER,
    ComponentTypes.MENU,
  ];
  const { uIDs } = useContext(GridContext);
  const formattedUIDs = uIDs?.map((item) => {
    return {
      ...item,
      components: item.components?.map((component) => {
        return {
          ...component,
          componentDatas: JSON.stringify(component.componentData),
        };
      }),
    };
  });
  const headers = Cookies.get(CookiesTypes.USER_KEY)
    ? {
        headers: {
          Authorization: `Bearer ${Cookies.get(CookiesTypes.USER_KEY)}`,
        },
      }
    : {};
  const mutation = useMutation(
    async () => {
      const response = await axios.post(
        `https://localhost:7215/api/layout`,

        formattedUIDs,
        headers
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
  function handleLogout() {
    try {
      Cookies.remove(CookiesTypes.USER_KEY);
      Cookies.remove(CookiesTypes.USER_REFRESH_KEY);
      toast.success("Successfully logged out!");
      window.location.reload();
    } catch (err) {
      toast.error("something went wrong!");
    }
  }
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
        <Button
          variant="contained"
          color="error"
          sx={{
            transition: "0.3s",
            "&:hover": {
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)", // This creates the elevation effect on hover
              transform: "translateY(-2px)", // Optional: Move the button up slightly on hover
            },
          }}
          onClick={handleLogout}>
          Logout
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

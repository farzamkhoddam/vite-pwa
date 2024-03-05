import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import { Link,  ListItem } from "@mui/material";

import JavascriptIcon from "@mui/icons-material/Javascript";
import { List } from "@mui/material";
// import { useEffect, useState } from "react";
// import { Genre, LocalStorageTypes, MenuItems } from "../../Types";
// import GenreComponent from "./Genre";

export default function ClientMenu() {
  // const menuItemsPlaceholder: MenuItems[] = [
  //   { text: "Home", variant: "LINK", href: "/" },
  //   { text: "About", variant: "LINK", href: "/about" },
  //   {
  //     text: "News",
  //     variant: "GENRE",
  //     genres: [
  //       { text: "news1", variant: "LINK", href: "/news/1" },
  //       { text: "news2", variant: "LINK", href: "/news/2" },
  //       {
  //         text: "news3",
  //         variant: "GENRE",
  //         subGenres: [
  //           {
  //             text: "sub news1",
  //             href: "/news/3/subnews1",
  //           },
  //           {
  //             text: "sub news2",
  //             href: "/news/3/subnews2",
  //           },
  //           {
  //             text: "sub news3",
  //             href: "/news/3/subnews3",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];
  // const localStorageMenuItems = localStorage.getItem(
  //   LocalStorageTypes.MENU_ITEMS
  // );
  // const [menuItems, setMenuItems] = useState<MenuItems[]>(
  //   localStorageMenuItems
  //     ? (JSON.parse(localStorageMenuItems) as MenuItems[])
  //     : menuItemsPlaceholder
  // );
  // useEffect(() => {
  //   setMenuItems(
  //     localStorageMenuItems
  //       ? (JSON.parse(localStorageMenuItems) as MenuItems[])
  //       : menuItemsPlaceholder
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [localStorageMenuItems, setMenuItems]);
  return (
    <Box sx={{ flexGrow: 1, width: 1 }}>
      <AppBar position="absolute">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <JavascriptIcon sx={{ fontSize: "50px" }} />
          <List sx={{ display: "flex" }}>
            {/* {menuItems.map((item, i) =>
              item.variant === "LINK" ? (
                <ListItem key={i}>
                  <Link
                    href={item?.href}
                    sx={{ cursor: "pointer" }}
                    underline="none">
                    {item.text}{" "}
                  </Link>
                </ListItem>
              ) : (
                <GenreComponent
                  text={item.text}
                  subGenres={item?.genres || ([] as Genre[])}
                />
              )
            )} */}
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

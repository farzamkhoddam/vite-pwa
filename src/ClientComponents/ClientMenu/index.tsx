import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link, ListItem } from "@mui/material";

import JavascriptIcon from "@mui/icons-material/Javascript";
import { List } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  ComponentDataTypes,
  Genre,
  MenuItems,
  MenuVariantTypes,
} from "../../Types";
import GenreComponent from "./Genre";
import EditDialog from "./EditDialog";
import { GridContext } from "@/Pages/Homepage/Context/GridContext";
import { IsClientBoss } from "@/utils";

interface Props {
  componentId: string;
  uId: number;
  componentData?: ComponentDataTypes;
}
const ClientMenu: React.FC<Props> = ({ componentId, uId, componentData }) => {
  const menuItemsPlaceholder: MenuItems[] = [
    { text: "Home", variant: MenuVariantTypes.LINK, href: "/" },
    { text: "About", variant: MenuVariantTypes.LINK, href: "/about" },
    {
      text: "News",
      variant: MenuVariantTypes.GENRE,
      genres: [
        { text: "news1", variant: MenuVariantTypes.LINK, href: "/news/1" },
        { text: "news2", variant: MenuVariantTypes.LINK, href: "/news/2" },
        {
          text: "news3",
          variant: MenuVariantTypes.GENRE,
          subGenres: [
            {
              text: "sub news1",
              href: "/news/3/subnews1",
            },
            {
              text: "sub news2",
              href: "/news/3/subnews2",
            },
            {
              text: "sub news3",
              href: "/news/3/subnews3",
            },
          ],
        },
      ],
    },
  ];
  const { uIDs, setuIDs } = useContext(GridContext);
  const [menuItems, setMenuItems] = useState<MenuItems[]>(
    componentData !== undefined && componentData?.length > 0
      ? (componentData as MenuItems[])
      : menuItemsPlaceholder
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isClientBoss = IsClientBoss();
  useEffect(() => {
    if (uIDs && setuIDs && menuItems) {
      setuIDs((prevState) => {
        const updatedUIDs = prevState.map((item) => {
          if (item.uId === uId) {
            // Update componentData if the component matches componentId
            return {
              ...item, // Spread existing item properties
              components: item.components?.map((component) =>
                component.componentID === componentId
                  ? {
                      componentData: menuItems, // Assuming cards is a valid array
                      componentID: component.componentID,
                      name: component.name,
                    }
                  : component
              ),
            };
          } else {
            // No change, explicitly return the original item
            return item;
          }
        });

        // Update state with the modified array (assuming setUIDs handles it)
        return [...updatedUIDs];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItems]);

  // useEffect(() => {

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ setMenuItems]);
  return (
    <>
      <EditDialog
        menuItems={menuItems}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        setMenuItems={setMenuItems}
      />

      <Box
        onClick={() => isClientBoss && setIsDialogOpen(true)}
        sx={{ flexGrow: 1, width: 1 }}>
        <AppBar position="absolute" sx={{ zIndex: 10 }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <JavascriptIcon sx={{ fontSize: "50px" }} />
            <List sx={{ display: "flex" }}>
              {menuItems.map((item, i) =>
                item.variant === "LINK" ? (
                  <ListItem key={i}>
                    <Link
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      href={item?.href}
                      sx={{ cursor: "pointer" }}
                      underline="none">
                      {item.text}{" "}
                    </Link>
                  </ListItem>
                ) : (
                  <GenreComponent
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    text={item.text}
                    subGenres={item?.genres || ([] as Genre[])}
                  />
                )
              )}
            </List>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default ClientMenu;

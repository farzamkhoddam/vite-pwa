import Box from "@mui/material/Box";
import ListDrawer from "./ListDrawer";
import { useDrop } from "react-dnd";
import { ComponentTypes, ItemType, LocalStorageTypes } from "../../../Types";
import ComponentLauncher from "../../../Components/ComponentLauncher";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function ClientPage() {
  const savedDroppedItems =
    localStorage.getItem(LocalStorageTypes.DROPPEDITEMS) !== null &&
    JSON.parse(localStorage.getItem(LocalStorageTypes.DROPPEDITEMS) || "");
  const [droppedItems, setDroppedItems] = useState<ComponentTypes[]>(
    savedDroppedItems || []
  );
  // eslint-disable-next-line no-empty-pattern
  const [{}, drop] = useDrop(() => ({
    accept: ItemType.listItem,
    drop: (item: { name: ComponentTypes }) => {
      setDroppedItems((prevArray) => [...prevArray, item.name]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  useEffect(() => {
    localStorage.setItem(
      LocalStorageTypes.DROPPEDITEMS,
      JSON.stringify(droppedItems)
    );
  }, [droppedItems]);

  return (
    <Box sx={{ display: "flex", width: 1, height: 1 }}>
      <ListDrawer />

      <Box
        ref={drop}
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
          p: 3,
          width: 1,
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}>
        <Link
          to={{
            pathname: "/",
            search: "?boss=true",
          }}>
          I'm the boss
        </Link>
        {droppedItems.map((componentName, i) => {
          return <ComponentLauncher componentName={componentName} key={i} />;
        })}
        <IconButton
          onClick={() => {
            setDroppedItems([]);
            localStorage.removeItem(LocalStorageTypes.DROPPEDITEMS);
          }}
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

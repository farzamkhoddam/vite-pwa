import Box from "@mui/material/Box";
import ListDrawer from "./ListDrawer";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { ComponentTypes } from "../../Types";
import ComponentLauncher from "../../Component/ComponentLauncher";

export default function ClientPage() {
  const [searchParams] = useSearchParams();
  const [selectedComponent, setSelectedComponent] = useState<ComponentTypes>(
    ComponentTypes.EMPTY
  );
  if (searchParams.get("boss") === "true") {
    return (
      <Box sx={{ display: "flex", width: 1, height: 1 }}>
        <ListDrawer setSelectedComponent={setSelectedComponent} />

        <Box
          component="main"
          sx={{
            display: "flex",
            position: "relative",
            flexGrow: 1,
            p: 3,
            width: 1,
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
          }}>
          {" "}
          <ComponentLauncher componentName={selectedComponent} />
        </Box>
      </Box>
    );
  }
}

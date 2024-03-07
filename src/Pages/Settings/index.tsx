import Box from "@mui/material/Box";
import ListDrawer from "./ListDrawer";

import { useState } from "react";
import { ComponentTypes } from "../../Types";
import ComponentLauncher from "../../Component/ComponentLauncher";
import { IsClientBoss } from "@/utils";

export default function ClientPage() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentTypes>(
    ComponentTypes.EMPTY
  );
  const isClientBoss = IsClientBoss();
  if (isClientBoss) {
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

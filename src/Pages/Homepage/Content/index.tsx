import Row from "./Row";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { GridContext } from "../Context/GridContext";
import React from "react";
import Menu from "./Menu";
import { useSearchParams } from "react-router-dom";
export default function Content() {
  const { rowCount, setRowCount } = React.useContext(GridContext);
  const handleAddButtonClick = () => {
    setRowCount && setRowCount((prevRowCount) => prevRowCount + 1);
  };
  const [searchParams] = useSearchParams();
  const isClientBoss = searchParams.get("boss") === "true";
  return (
    <Box sx={{ pt: isClientBoss ? 8 : 0,isolation:"isolate" }}>
      {isClientBoss && <Menu />}
      {rowCount &&
        Array.from({ length: rowCount }, (_, i) => i + 1).map((num) => (
          <Row uId={num} key={num} />
        ))}
      {isClientBoss && (
        <IconButton onClick={handleAddButtonClick}>
          <AddIcon />
        </IconButton>
      )}
    </Box>
  );
}

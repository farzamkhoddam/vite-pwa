import Row from "./Row";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { GridContext } from "../Context/GridContext";
import React from "react";
export default function BossPage() {
  const { rowCount, setRowCount } = React.useContext(GridContext);
  const handleAddButtonClick = () => {
    setRowCount && setRowCount((prevRowCount) => prevRowCount + 1);
  };

  return (
    <Box>
      {rowCount &&
        Array.from({ length: rowCount }, (_, i) => i + 1).map((num) => (
          <Row uId={num} key={num} />
        ))}
      <IconButton onClick={handleAddButtonClick}>
        <AddIcon />
      </IconButton>
    </Box>
  );
}

import { useState } from "react";
import Row from "./Row";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export default function BossPage() {
  const [count, setCount] = useState(0);
const handleAddButtonClick = () => {
  setCount((prevCount) => prevCount + 1);
};
  return (
    <Box>
      {Array.from({ length: count }, (_, i) => i + 1).map((num) => (
        <Row rowId={num} key={num} />
      ))}
      <IconButton onClick={handleAddButtonClick}>
        <AddIcon />
      </IconButton>
    </Box>
  );
}

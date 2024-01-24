import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HTMLAttributes, useEffect, useState } from "react";
import Column from "./Column";
import AddIcon from "@mui/icons-material/Add";
interface Props extends HTMLAttributes<HTMLDivElement> {
  rowId: number;
}
const Row: React.FC<Props> = ({ rowId }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(1);
  const [totalColumns, setTotalColumns] = useState(1);
  const handleAddButtonClick = () => {
    setCount((prevCount) => prevCount + 1);
    setTotalColumns((prevCount) => prevCount + 1);
  };
  useEffect(() => {
    if (totalColumns === 0) {
      setIsVisible(false);
    }
  }, [totalColumns]);
  if (isVisible)
    return (
      <Box
        sx={{
          width: 1,
          height: "15rem",
          position: "relative",
          display: "flex",
          borderBottom:  "1px solid" ,
          borderColor: "gray",
        }}>
        <IconButton
          sx={{
            position: "absolute",
            top: "0.5rem",
            left: "0.5rem",
            zIndex: "1000",
          }}
          onClick={handleAddButtonClick}>
          <AddIcon />
        </IconButton>
        {Array.from({ length: count }, (_, i) => i + 1).map((num) => (
          <Column
            rowId={rowId}
            columnId={num}
            widthDivider={totalColumns}
            setTotalColumns={setTotalColumns}
            key={num}
          />
        ))}
      </Box>
    );
};
export default Row;

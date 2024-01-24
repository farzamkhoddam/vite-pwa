import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HTMLAttributes, useState } from "react";
interface Props extends HTMLAttributes<HTMLDivElement> {
  columnId: number;
  rowId: number;
  widthDivider: number;
  setTotalColumns: React.Dispatch<React.SetStateAction<number>>;
}
const Column: React.FC<Props> = ({
  columnId,
  setTotalColumns,
  widthDivider,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  if (isVisible)
    return (
      <Box
        sx={{
          width: 100 / widthDivider + "%",
          height: 1,
          position: "relative",
          borderRight: widthDivider > 1  ? "1px solid" : "0px",
          borderColor: "gray",
        }}>
        {columnId}
        <IconButton
          onClick={() => {
            setTotalColumns((prevNum) => prevNum - 1);
            setIsVisible(false);
          }}
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
          <CloseIcon />
        </IconButton>
      </Box>
    );
};
export default Column;

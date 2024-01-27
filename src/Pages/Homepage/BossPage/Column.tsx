import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HTMLAttributes, useEffect, useState } from "react";
import { GridContext } from "../Context/GridContext";
import React from "react";
import Row from "./Row";
import AddIcon from "@mui/icons-material/Add";
interface Props extends HTMLAttributes<HTMLDivElement> {
  widthDivider: number;
  setTotalColumns: React.Dispatch<React.SetStateAction<number>>;
  uId: number;
}
const Column: React.FC<Props> = ({ setTotalColumns, widthDivider, uId }) => {
  const { invisibleParts, setInvisibleParts, allColumns, setAllColumns } =
    React.useContext(GridContext);
  const uIdLength = uId.toString().length;
  const [isVisible, setIsVisible] = useState(true);
  // the number of rows under this column
  const [count, setCount] = useState(
    allColumns
      ?.filter((UID) => UID.toString().length === uIdLength + 1)
      .filter((UID) => UID.toString().startsWith(uId.toString())).length || 0
  );
  // the number the rows are divided by in order to find their height
  const [totalRows, setTotalRows] = useState(
    allColumns
      ?.filter((UID) => UID.toString().length === uIdLength + 1)
      .filter((UID) => UID.toString().startsWith(uId.toString()))
      .filter((UID) => !invisibleParts?.includes(UID)).length || 0
  );
  //
  const handleAddButtonClick = () => {
    setCount((prevCount) => prevCount + 1);
    setTotalRows((prevCount) => prevCount + 1);
  };
  //
  function CloseHandler() {
    setTotalColumns((prevNum) => prevNum - 1);
    setIsVisible(false);
    setInvisibleParts &&
      invisibleParts &&
      setInvisibleParts([...invisibleParts, uId]);
  }
  //
  useEffect(() => {
    if (allColumns && setAllColumns && !allColumns.includes(uId)) {
      setAllColumns([...allColumns, uId]);
    }
    if (invisibleParts?.includes(uId)) {
      setIsVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allColumns]);
  //
  if (isVisible)
    return (
      <Box
        sx={{
          width: 100 / widthDivider + "%",
          height: 1,
          position: "relative",
          borderRight: widthDivider > 1 ? "1px solid" : "0px",
          borderColor: "gray",
        }}>
        {count > 0 &&
          Array.from({ length: count }, (_, i) => i + 1).map((num) => (
            <Row
              setTotalRows={setTotalRows}
              variant="nested"
              totalRows={totalRows}
              uId={JSON.parse(`${uId}${num}`)}
              key={num}
            />
          ))}
        <IconButton onClick={handleAddButtonClick}>
          <AddIcon />
        </IconButton>
        <IconButton
          onClick={CloseHandler}
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
          <CloseIcon />
        </IconButton>
      </Box>
    );
};
export default Column;

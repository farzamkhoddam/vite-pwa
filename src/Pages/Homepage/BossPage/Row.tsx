import { Box, IconButton } from "@mui/material";
import { HTMLAttributes, useEffect, useState } from "react";
import Column from "./Column";
import AddIcon from "@mui/icons-material/Add";
import { GridContext } from "../Context/GridContext";
import React from "react";
interface Props extends HTMLAttributes<HTMLDivElement> {
  uId: number;
  variant?: "normal" | "nested";
  totalRows?: number;
  setTotalRows?: React.Dispatch<React.SetStateAction<number>>;
}
const Row: React.FC<Props> = ({
  uId,
  totalRows = 1,
  setTotalRows,
  variant = "normal",
}) => {
  const uIdLength = uId.toString().length;
  const { invisibleParts, setInvisibleParts, allColumns, setAllColumns } =
    React.useContext(GridContext);
  const [isVisible, setIsVisible] = useState(true);
  // the number of columns under this row
  const [count, setCount] = useState(
    allColumns
      ?.filter((UID) => UID.toString().length === uIdLength + 1)
      .filter((UID) => UID.toString().startsWith(uId.toString())).length || 1
  );
  // the number the columns are divided by in order to find their width
  const [totalColumns, setTotalColumns] = useState(
    allColumns
      ?.filter((UID) => UID.toString().length === uIdLength + 1)
      .filter((UID) => UID.toString().startsWith(uId.toString()))
      .filter((UID) => !invisibleParts?.includes(UID)).length || 1
  );
  const handleAddButtonClick = () => {
    setCount((prevCount) => prevCount + 1);
    setTotalColumns((prevCount) => prevCount + 1);
  };
  useEffect(() => {
    if (totalColumns === 0) {
      setIsVisible(false);
      setTotalRows && setTotalRows((prevNum) => prevNum - 1);
      setInvisibleParts &&
        invisibleParts &&
        setInvisibleParts([...invisibleParts, uId]);
    }
    if (invisibleParts?.includes(uId)) {
      setIsVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalColumns, uId]);
  useEffect(() => {
    if (allColumns && setAllColumns && !allColumns.includes(uId)) {
      setAllColumns([...allColumns, uId]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isVisible)
    return (
      <Box
        sx={{
          width: 1,
          height: variant === "normal" ? "15rem" : 100 / totalRows + "%",
          position: "relative",
          display: "flex",
          borderBottom: "1px solid",
          borderColor: variant === "normal" ? "gray" : "red",
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
            widthDivider={totalColumns}
            setTotalColumns={setTotalColumns}
            key={num}
            uId={JSON.parse(`${uId}${num}`)}
          />
        ))}
      </Box>
    );
};
export default Row;

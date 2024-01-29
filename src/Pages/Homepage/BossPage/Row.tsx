import { Box, Button } from "@mui/material";
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
  const { invisibleParts, setInvisibleParts, uIDs, setuIDs } =
    React.useContext(GridContext);
  const [isVisible, setIsVisible] = useState(true);
  // the number of columns under this row
  const [count, setCount] = useState(
    uIDs
      ?.filter((UID) => UID.toString().length === uIdLength + 1)
      .filter((UID) => UID.toString().startsWith(uId.toString())).length || 1
  );
  // the number the columns are divided by in order to find their width
  const [totalColumns, setTotalColumns] = useState(
    uIDs
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
    if (uIDs && setuIDs && !uIDs.includes(uId)) {
      setuIDs([...uIDs, uId]);
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
          borderColor: variant === "normal" ? "gray" : "primary.dark",
        }}>
        <Button
          sx={{
            position: "absolute",
            top: "0.5rem",
            left: "0.5rem",
            zIndex: 1000,
          }}
          onClick={handleAddButtonClick}>
          <AddIcon /> Add column
        </Button>
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

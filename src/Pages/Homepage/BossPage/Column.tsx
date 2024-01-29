import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HTMLAttributes, useEffect, useState } from "react";
import { GridContext } from "../Context/GridContext";
import React from "react";
import Row from "./Row";
import AddIcon from "@mui/icons-material/Add";
import { useDrop } from "react-dnd";
import { ComponentTypes, ItemType } from "../../../Types";
import ComponentLauncher from "../../../Components/ComponentLauncher";
interface Props extends HTMLAttributes<HTMLDivElement> {
  widthDivider: number;
  setTotalColumns: React.Dispatch<React.SetStateAction<number>>;
  uId: number;
}
const Column: React.FC<Props> = ({ setTotalColumns, widthDivider, uId }) => {
  const [droppedItem, setDroppedItem] = useState<ComponentTypes>(
    (localStorage.getItem(uId.toString()) as ComponentTypes) ||
      ComponentTypes.EMPTY
  );
  const { invisibleParts, setInvisibleParts, uIDs, setuIDs } =
    React.useContext(GridContext);
  const uIdLength = uId.toString().length;
  const uIdsChildren = uIDs
    ?.filter((UID) => UID.toString().length === uIdLength + 1)
    .filter((UID) => UID.toString().startsWith(uId.toString()));
  const [isVisible, setIsVisible] = useState(true);
  // the number of rows under this column
  const [count, setCount] = useState(uIdsChildren?.length || 0);
  // the number the rows are divided by in order to find their height
  const [totalRows, setTotalRows] = useState(
    uIdsChildren?.filter((UID) => !invisibleParts?.includes(UID)).length || 0
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
    if (uIDs && setuIDs && !uIDs.includes(uId)) {
      setuIDs([...uIDs, uId]);
    }
    if (invisibleParts?.includes(uId)) {
      setIsVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uIDs, invisibleParts]);
  //

  const [refProps, drop] = useDrop(
    () => ({
      accept: ItemType.listItem,
      drop: (item: { name: ComponentTypes }, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        setDroppedItem(item.name);
        localStorage.setItem(uId.toString(), item.name);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [uIDs, invisibleParts, count, uId]
  );
  if (isVisible)
    return (
      <Box
        ref={drop}
        {...refProps}
        sx={{
          width: 100 / widthDivider + "%",
          height: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          borderRight: widthDivider > 1 ? "1px solid" : "0px",
          borderColor: "gray",
        }}>
        <ComponentLauncher
          componentName={droppedItem || ComponentTypes.EMPTY}
        />
        {count > 0 &&
          droppedItem === ComponentTypes.EMPTY &&
          Array.from({ length: count }, (_, i) => i + 1).map((num) => (
            <Row
              setTotalRows={setTotalRows}
              variant="nested"
              totalRows={totalRows}
              uId={JSON.parse(`${uId}${num}`)}
              key={num}
            />
          ))}
        {droppedItem === ComponentTypes.EMPTY && (
          <Button
            sx={{
              position: "absolute",
              left: "0.5rem",
              top: "50%",
            }}
            onClick={handleAddButtonClick}>
            <AddIcon /> Add Row
          </Button>
        )}

        <IconButton
          onClick={CloseHandler}
          sx={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            zIndex: uId,
          }}>
          <CloseIcon />
        </IconButton>
      </Box>
    );
};
export default Column;

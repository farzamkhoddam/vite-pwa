import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { HTMLAttributes, useEffect, useState } from "react";
import { GridContext } from "../Context/GridContext";
import React from "react";
import Row from "./Row";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { useDrop } from "react-dnd";
import { ComponentTypes, ItemType, LocalStorageTypes } from "../../../Types";
import ComponentLauncher from "../../../Components/ComponentLauncher";
import { useSearchParams } from "react-router-dom";
import interact from "interactjs";
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
  const [searchParams] = useSearchParams();
  const isClientBoss = searchParams.get("boss") === "true";
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
  const hasChildren =
    uIdsChildren &&
    uIdsChildren?.filter((UID) => !invisibleParts?.includes(UID))?.length > 0;
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
// drpped handler
  const [refProps, drop] = useDrop(
    () => ({
      accept: hasChildren ? "": ItemType.listItem,
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
  // 

  // resize 
   const [initialWidth, setInitialWidth] = useState(
     localStorage.getItem(`${LocalStorageTypes.BOX_WIDTH}-${uId}`)
   );
  interact(`.column-${uId}`).resizable({
    edges: { right: true },
    listeners: {
      move: function (event) {
        const target = event.target;
        const rect = event.rect;
        const nextSibling = event.target.nextElementSibling;
        const prevSibling = event.target.prevElementSibling;
        if (nextSibling) {
          nextSibling.style.width =
            nextSibling.offsetWidth - event.deltaRect.width + "px";
        }
        if (prevSibling) {
          prevSibling.style.width =
            prevSibling.offsetWidth - event.deltaRect.width + "px";
        }
        target.style.width = rect.width + "px";
        localStorage.setItem(
          `${LocalStorageTypes.BOX_WIDTH}-${uId}`,
          rect.width
        );
        setInitialWidth(rect.width);
      },
    },
  });
 

  if (isVisible)
    return (
      <Box
        className={`column-${uId}`}
        ref={drop}
        {...refProps}
        sx={{
          width: initialWidth ? `${initialWidth}px` : 100 / widthDivider + "%",
          minWidth: "100px",
          height: 1,
          display: "flex",
          flexGrow: initialWidth ? 0 : 1,
          flexShrink: initialWidth ? 1 : 100,
          justifyContent: droppedItem !== ComponentTypes.EMPTY ? "center" : "unset",
          alignItems: droppedItem !== ComponentTypes.EMPTY ? "center" : "unset",
          flexWrap: droppedItem !== ComponentTypes.EMPTY ? "wrap" : "unset",
          flexDirection: "column",
          position: "relative",
          borderRight: isClientBoss ? "1px solid" : "0px",
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
        {droppedItem === ComponentTypes.EMPTY && isClientBoss && (
          <Button
            sx={{
              maxWidth: "fit-content",
              maxHeight: "fit-content",
              position: "absolute",
              left: "0.5rem",
              top: "50%",
            }}
            onClick={handleAddButtonClick}>
            <TableRowsIcon />
          </Button>
        )}
        {isClientBoss && (
          <IconButton
            onClick={CloseHandler}
            sx={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              zIndex: uId.toString().length,
            }}>
            <DeleteIcon color={"error"} />
          </IconButton>
        )}
      </Box>
    );
};
export default Column;

import { Box, IconButton, Paper, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { HTMLAttributes, useEffect, useState } from "react";
import { GridContext } from "../Context/GridContext";
import React from "react";
import Row from "./Row";
import { useDrop } from "react-dnd";
import { ComponentTypes, ItemType, LocalStorageTypes } from "../../../Types";
import ComponentLauncher from "../../../Components/ComponentLauncher";
import { useSearchParams } from "react-router-dom";
import interact from "interactjs";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import SortIcon from "@mui/icons-material/Sort";
import BackspaceIcon from "@mui/icons-material/Backspace";
interface Props extends HTMLAttributes<HTMLDivElement> {
  widthDivider: number;
  setTotalColumns: React.Dispatch<React.SetStateAction<number>>;
  uId: number;
  columns: number[];
}
const Column: React.FC<Props> = ({
  setTotalColumns,
  columns,
  widthDivider,
  uId,
}) => {
  // MUI related
  const theme = useTheme();
  //
  const [droppedItems, setDroppedItems] = useState<ComponentTypes[]>(
    JSON.parse(localStorage.getItem(uId.toString()) || `[]`) as ComponentTypes[]
  );
  const [searchParams] = useSearchParams();
  const isClientBoss = searchParams.get("boss") === "true";
  const { uIDs, setuIDs } = React.useContext(GridContext);
  const uIdLength = uId.toString().length;

  const [isVisible, setIsVisible] = useState(true);
  // the number of rows under this column
  const [rows, setRows] = useState(
    uIDs
      ?.filter((UID) => UID.toString().length === uIdLength + 1)
      .filter((UID) => UID.toString().startsWith(uId.toString())) || []
  );
  // the number the rows are divided by in order to find their height
  const [totalRows, setTotalRows] = useState(
    uIDs
      ?.filter((UID) => UID.toString().length === uIdLength + 1)
      .filter((UID) => UID.toString().startsWith(uId.toString()))?.length || 0
  );
  const hasChildren: boolean = !!uIDs
    ?.filter((UID) => UID.toString().length === uIdLength + 1)
    .filter((UID) => UID.toString().startsWith(uId.toString())).length;
  //
  const handleAddColumnButtonClick = () => {
    const index = uIDs?.findIndex((item) => item === uId) || 0;

    if (index !== -1) {
      setuIDs &&
        uIDs &&
        setuIDs([
          ...uIDs.slice(0, index + 1),
          JSON.parse(`${Math.max(...columns) + 1}`),
          ...uIDs.slice(index + 1),
        ]);
    }

    setTotalColumns((prevColumns) => prevColumns + 1);
  };
  const handleAddRowButtonClick = () => {
    setRows((prevrows) => [...prevrows, JSON.parse(`${uId}${totalRows + 1}`)]);
    setTotalRows((prevRows) => prevRows + 1);
  };
  //
  function CloseHandler() {
    setTotalColumns((prevNum) => prevNum - 1);
    setIsVisible(false);
    localStorage.removeItem(
      JSON.stringify(
        uIDs?.filter((UID) => UID.toString().startsWith(uId.toString()))[0] || 0
      )
    );

    setuIDs &&
      uIDs &&
      setuIDs(
        uIDs?.filter((UID) => !UID.toString().startsWith(uId.toString()))
      );
  }
  //
  useEffect(() => {
    if (uIDs && setuIDs && !uIDs.includes(uId) && isVisible) {
      setuIDs([...uIDs, uId]);
    }
    setRows(
      uIDs
        ?.filter((UID) => UID.toString().length === uIdLength + 1)
        .filter((UID) => UID.toString().startsWith(uId.toString())) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uIDs]);
  //
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const newItems = droppedItems;
    const dragItem = newItems[dragIndex];
    console.log("farzam dragIndex ===", dragIndex);
    console.log("farzam hoverIndex ===", hoverIndex);
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    console.log("farzam newItems ===", newItems);
    setDroppedItems([...newItems]);

  };
  // drpped handler

  const [refProps, drop] = useDrop(
    () => ({
      accept: hasChildren ? "" : ItemType.listItem,
      drop: (item: { name: ComponentTypes; index: number }, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }

        if (!item.index) {
          setDroppedItems((prevItems) => [...prevItems, item.name]);
        }
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [uIDs, rows, uId]
  );
  // clear column
  function handleClearComponentsClicked() {
    setDroppedItems([]);
    localStorage.removeItem(uId.toString());
  }
  useEffect(() => {
    localStorage.setItem(uId.toString(), JSON.stringify(droppedItems));
    console.log("farzam droppedItems ===",droppedItems)
  }, [droppedItems, uId]);
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
          p: 3,
          display: "flex",

          flexGrow: initialWidth ? 0 : 1,
          flexShrink: initialWidth ? 1 : 100,
          justifyContent: droppedItems.length !== 0 ? "center" : "unset",
          alignItems: droppedItems.length !== 0 ? "center" : "unset",
          flexWrap: droppedItems.length !== 0 ? "wrap" : "unset",
          flexDirection: "column",
          position: "relative",
          borderRight: isClientBoss ? "1px solid" : "0px",
          borderColor: "gray",
          "&:hover": {
            "& > .MuiPaper-root ": {
              opacity: 0.9,
              visibility: "visible",
            },
          },
        }}>
        {droppedItems.map((droppedItem, i) => (
          <ComponentLauncher
            key={i}
            moveItem={moveItem}
            index={i}
            componentName={droppedItem || ComponentTypes.EMPTY}
            canEdit={isClientBoss ?true:false}
          />
        ))}
        {rows.length > 0 &&
          droppedItems.length === 0 &&
          rows?.map((num) => (
            <Row
              rows={rows}
              setTotalRows={setTotalRows}
              variant="nested"
              totalRows={totalRows}
              uId={JSON.parse(`${num}`)}
              key={num}
            />
          ))}

        {isClientBoss && !hasChildren && (
          <Paper
            elevation={5}
            sx={{
              opacity: 0,
              backgroundColor: "#F6F6F6",
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease",
              visibility: "hidden",
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <IconButton
                onClick={CloseHandler}
                sx={{
                  zIndex: uId.toString().length,
                }}>
                <DeleteIcon color={"error"} />
              </IconButton>
              {droppedItems.length === 0 && (
                <IconButton onClick={handleAddRowButtonClick}>
                  <SortIcon
                    sx={{
                      color: theme.palette.grey[600],
                    }}
                  />
                </IconButton>
              )}
              {droppedItems.length !== 0 && (
                <IconButton onClick={handleClearComponentsClicked}>
                  <BackspaceIcon color={"error"} />
                </IconButton>
              )}
            </Box>
          </Paper>
        )}
        {isClientBoss && (
          <IconButton
            onClick={handleAddColumnButtonClick}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0",
              transform: "translate(50%, -50%)",
              zIndex: uId.toString().length,
            }}>
            <ControlPointOutlinedIcon fontSize="large" color={"primary"} />
          </IconButton>
        )}
      </Box>
    );
};
export default Column;

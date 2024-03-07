import { Box, IconButton, Paper, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { HTMLAttributes, useEffect, useState } from "react";
import { GridContext } from "../Context/GridContext";
import React from "react";
import Row from "./Row";
import { useDrop } from "react-dnd";
import { ComponentDataTypes, ComponentTypes, ItemType } from "../../../Types";
import ComponentLauncher from "../../../Component/ComponentLauncher";

import interact from "interactjs";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import SortIcon from "@mui/icons-material/Sort";
import BackspaceIcon from "@mui/icons-material/Backspace";
import shortid from "shortid";
import { IsClientBoss } from "@/utils";

interface ItemTypes {
  name: ComponentTypes;
  index: number;
  componentID: string;
  componentData?: ComponentDataTypes;
  currentParentUId: number;
  setOriginalColumnDroppedItems: React.Dispatch<
    React.SetStateAction<
      {
        name: ComponentTypes;
        componentID: string;
      }[]
    >
  >;
}
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
  const { uIDs, setuIDs } = React.useContext(GridContext);
  const uIdIndex = uIDs?.findIndex((item) => item.uId === uId) || 0;
  const [droppedItems, setDroppedItems] = useState<
    {
      name: ComponentTypes;
      componentID: string;
      componentData?: ComponentDataTypes;
    }[]
  >(
    uIDs?.[uIdIndex]?.components ||
      ([] as { name: ComponentTypes; componentID: string }[])
  );

  const isClientBoss = IsClientBoss();
  const uIdLength = uId?.toString().length;

  const [isVisible, setIsVisible] = useState(true);
  // the number of rows under this column
  const [rows, setRows] = useState(
    uIDs
      ?.filter((UID) => UID.uId?.toString().length === uIdLength + 1)
      .filter((UID) => UID.uId?.toString().startsWith(uId?.toString())) || []
  );
  // the number the rows are divided by in order to find their height
  const [totalRows, setTotalRows] = useState(
    uIDs
      ?.filter((UID) => UID.uId?.toString().length === uIdLength + 1)
      .filter((UID) => UID.uId?.toString().startsWith(uId?.toString()))
      ?.length || 0
  );
  const hasChildren: boolean = !!uIDs
    ?.filter((UID) => UID.uId?.toString().length === uIdLength + 1)
    .filter((UID) => UID.uId?.toString().startsWith(uId?.toString())).length;
  //
  const handleAddColumnButtonClick = () => {
    if (uIdIndex !== -1) {
      setuIDs &&
        uIDs &&
        setuIDs([
          ...uIDs.slice(0, uIdIndex + 1),
          { uId: JSON.parse(`${Math.max(...columns) + 1}`) },
          ...uIDs.slice(uIdIndex + 1),
        ]);
    }

    setTotalColumns((prevColumns) => prevColumns + 1);
  };
  const handleAddRowButtonClick = () => {
    setRows((prevrows) => [
      ...prevrows,
      { uId: JSON.parse(`${uId}${totalRows + 1}`) },
    ]);
    setTotalRows((prevRows) => prevRows + 1);
  };
  //
  function CloseHandler() {
    setTotalColumns((prevNum) => prevNum - 1);
    setIsVisible(false);

    setuIDs &&
      uIDs &&
      setuIDs(
        uIDs?.filter((UID) => !UID.uId?.toString().startsWith(uId?.toString()))
      );
  }
  //
  useEffect(() => {
    if (uIDs && setuIDs && !uIDs.some((id) => id.uId === uId) && isVisible) {
      setuIDs([...uIDs, { uId: uId }]);
    }
    setRows(
      uIDs
        ?.filter((UID) => UID.uId?.toString().length === uIdLength + 1)
        .filter((UID) => UID.uId?.toString().startsWith(uId?.toString())) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uIDs]);
  //
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const newItems = droppedItems;
    const dragItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    setDroppedItems([...newItems]);
  };
  // dropped handler

  const [refProps, drop] = useDrop(
    () => ({
      accept: hasChildren
        ? ""
        : [ItemType.listItem, ItemType.componentLauncherItem],

      drop: (item: ItemTypes) => {
        if (
          droppedItems.some(
            (droppedItem) => droppedItem.componentID === item.componentID
          )
        ) {
          return;
        }
        if (item.index === undefined) {
          setDroppedItems((prevItems) => [
            ...prevItems,
            {
              name: item.name,
              componentID: shortid.generate(),
              componentData: item?.componentData,
            },
          ]);
        }
        if (item.componentID) {
          setDroppedItems((prevItems) => [
            ...prevItems,
            {
              name: item.name,
              componentID: item.componentID,
              componentData: item.componentData,
            },
          ]);
          // we need to delete the component from the original column
          // we do not need duplicates

          item.setOriginalColumnDroppedItems((prevState) =>
            prevState.filter(
              (component) => component.componentID !== item.componentID
            )
          );
        }
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [uIDs, rows, uId, droppedItems, setDroppedItems]
  );
  // clear column
  function handleClearComponentsClicked() {
    setDroppedItems([]);
  }
  useEffect(() => {
    if (uIDs) {
      const uIdIndex = uIDs?.findIndex((item) => {
        return item.uId === uId;
      });
      if (uIdIndex !== -1) {
        // Clone the item to avoid direct mutation
        const updatedItem = {
          ...uIDs[uIdIndex],
          components: droppedItems,
        };
        // Update the state with the new item
        setuIDs &&
          setuIDs((prevState) => {
            // Create a shallow copy of the previous state
            const newState = [...prevState];
            // Replace the item at the found index with the updated item
            newState[uIdIndex] = updatedItem;
            // Return the new state
            return newState;
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [droppedItems, uId]);
  //
  const zIndex = uId?.toString().length;
  // resize
  const [initialWidth, setInitialWidth] = useState(uIDs?.[uIdIndex]?.width);
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
        const upDatedArray = uIDs?.map((item, i) => {
          if (i === uIdIndex) return { ...item, width: rect.width };
          return item;
        });
        if (uIDs?.[uIdIndex] && setuIDs) setuIDs(upDatedArray || []);
        target.style.width = rect.width + "px";
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
          width:
            initialWidth !== null
              ? `${initialWidth}px`
              : 100 / widthDivider + "%",
          minWidth: "100px",
          height: 1,
          p: 3,
          display: "flex",
          position: "relative",
          flexGrow: initialWidth ? 0 : 1,
          flexShrink: initialWidth ? 1 : 100,
          justifyContent: droppedItems.length !== 0 ? "center" : "unset",
          alignItems: droppedItems.length !== 0 ? "center" : "unset",
          flexWrap: droppedItems.length !== 0 ? "wrap" : "unset",
          flexDirection: "column",
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
            uId={uId}
            setDroppedItems={setDroppedItems}
            componentID={droppedItem.componentID}
            componentData={droppedItem.componentData}
            componentName={droppedItem.name || ComponentTypes.EMPTY}
            canEdit={isClientBoss ? true : false}
          />
        ))}
        {rows.length > 0 &&
          droppedItems.length === 0 &&
          rows?.map((num) => (
            <Row
              rows={rows.map((item) => {
                return item.uId;
              })}
              setTotalRows={setTotalRows}
              variant="nested"
              totalRows={totalRows}
              uId={num.uId}
              key={num.uId}
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
              zIndex: 1000,
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
                  zIndex: uId?.toString().length,
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
              zIndex: zIndex,
            }}>
            <ControlPointOutlinedIcon fontSize="large" color={"primary"} />
          </IconButton>
        )}
      </Box>
    );
};
export default Column;

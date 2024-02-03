import { Box, Button } from "@mui/material";
import { HTMLAttributes, useEffect, useState } from "react";
import Column from "./Column";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { GridContext } from "../Context/GridContext";
import React from "react";
import { useSearchParams } from "react-router-dom";
import interact from "interactjs";
import { LocalStorageTypes } from "../../../Types";

interface Props extends HTMLAttributes<HTMLDivElement> {
  uId: number;
  variant?: "normal" | "nested";
  totalRows?: number;
  setTotalRows?: React.Dispatch<React.SetStateAction<number>>;
  rows: number[];
}
const Row: React.FC<Props> = ({
  uId,
  totalRows = 1,
  setTotalRows,
  variant = "normal",
  rows,
}) => {
  const [searchParams] = useSearchParams();
  const isClientBoss = searchParams.get("boss") === "true";
  const {  uIDs, setuIDs } =
    React.useContext(GridContext);
  const uIdLength = uId.toString().length;
    
  const [isVisible, setIsVisible] = useState(true);
  // the number the columns are divided by in order to find their width
  const [totalColumns, setTotalColumns] = useState(
    uIDs
      ?.filter((UID) => UID.toString().length === uIdLength + 1)
      .filter((UID) => UID.toString().startsWith(uId.toString())).length || 1
  );

  // the number of columns under this row
  const [columns, setColumns] = useState(uIDs
      ?.filter((UID) => UID.toString().length === uIdLength + 1)
      .filter((UID) => UID.toString().startsWith(uId.toString())) || []);
  const handleAddButtonClick = () => {
    const index = uIDs?.findIndex((item) => item === uId) || 0;
setTotalRows && setTotalRows((prevNum) => prevNum + 1);
    if (index !== -1) {
      setuIDs &&
        uIDs &&
        setuIDs([
          ...uIDs.slice(0, index + 1),
          JSON.parse(`${Math.max(...rows) + 1}`),
          ...uIDs.slice(index + 1),
        ]);
    }
  };
  useEffect(() => {
    console.log("farzam rows ===",totalRows)
    if (totalColumns === 0 && isVisible) {
      setIsVisible(false);
      setTotalRows && setTotalRows((prevNum) => prevNum - 1);
       setuIDs &&
      uIDs &&
      setuIDs(
        uIDs?.filter((UID) => !UID.toString().startsWith(uId.toString()))
      );}
    if (columns?.length === 0) {
      setColumns([JSON.parse(`${uId}${totalColumns}`)]);
    } else {
      setColumns(uIDs
      ?.filter((UID) => UID.toString().length === uIdLength + 1)
      .filter((UID) => UID.toString().startsWith(uId.toString())) || []);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uId, uIDs]);
  useEffect(() => {
    if (uIDs && setuIDs && !uIDs.includes(uId)) {
      setuIDs([...uIDs, uId]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // resize
  const [initialHeight, setInitialHeight] = useState(
    localStorage.getItem(`${LocalStorageTypes.BOX_HEIGHT}-${uId}`)
      ? `${localStorage.getItem(`${LocalStorageTypes.BOX_HEIGHT}-${uId}`)}px`
      : "15rem"
  );
  interact(`.row-${uId}`).resizable({
    edges: {
      bottom: true,
    },
    listeners: {
      move: function (event) {
        const target = event.target;
        const rect = event.rect;
        const nextSibling = event.target.nextElementSibling;
        const prevSibling = event.target.prevElementSibling;
        if (nextSibling) {
          nextSibling.style.height =
            nextSibling.offsetHeight - event.deltaRect.height + "px";
        }
        if (prevSibling) {
          prevSibling.style.height =
            prevSibling.offsetHeight - event.deltaRect.height + "px";
        }
        target.style.height = rect.height + "px";
        localStorage.setItem(
          `${LocalStorageTypes.BOX_HEIGHT}-${uId}`,
          rect.height
        );
        setInitialHeight(rect.height);
      },
    },
  });

  if (isVisible)
    return (
      <Box
        className={`row-${uId}`}
        sx={{
          width: 1,
          minHeight: "50px",
          height: variant === "normal" ? initialHeight : 100 / totalRows + "%",
          flexGrow: initialHeight ? 0 : 1,
          flexShrink: initialHeight ? 1 : 100,
          position: "relative",
          display: "flex",
          border: variant === "nested" && isClientBoss ? "1px solid" : "0",
          borderBottom: isClientBoss ? "1px solid" : "0",
          borderTop: isClientBoss ? "1px solid" : "0",
          borderColor: variant === "normal" ? "gray" : "primary.dark",
        }}>
        {isClientBoss && (
          <Button
            sx={{
              maxWidth: "fit-content",
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translate(-50%,50%)",
              zIndex: 999999,
            }}
            onClick={handleAddButtonClick}>
            <ControlPointOutlinedIcon fontSize="large" />
          </Button>
        )}
        {columns?.map((num) => (
          <Column
            widthDivider={totalColumns}
            setTotalColumns={setTotalColumns}
            columns={columns}
            key={num}
            uId={JSON.parse(`${num}`)}
          />
        ))}
      </Box>
    );
};
export default Row;

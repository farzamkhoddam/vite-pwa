import { Box, Button } from "@mui/material";
import { HTMLAttributes, useEffect, useState } from "react";
import Column from "./Column";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
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
}
const Row: React.FC<Props> = ({
  uId,
  totalRows = 1,
  setTotalRows,
  variant = "normal",
}) => {
  const [searchParams] = useSearchParams();
  const isClientBoss = searchParams.get("boss") === "true";
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
          borderBottom: isClientBoss ? "1px solid" : "0",
          borderTop: isClientBoss ? "1px solid" : "0",
          borderColor: variant === "normal" ? "gray" : "primary.dark",
        }}>
        {isClientBoss && (
          <Button
            sx={{
              maxWidth: "fit-content",
              position: "absolute",
              top: "0.5rem",
              left: "0.5rem",
              zIndex: 999999,
            }}
            onClick={handleAddButtonClick}>
            <ViewColumnIcon />
          </Button>
        )}
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

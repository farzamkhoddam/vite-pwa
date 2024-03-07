import { Box, Button } from "@mui/material";
import { HTMLAttributes, useEffect, useState } from "react";
import Column from "./Column";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { GridContext } from "../Context/GridContext";
import React from "react";

import interact from "interactjs";
import { IsClientBoss } from "@/utils";

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
  const isClientBoss = IsClientBoss();
  const { uIDs, setuIDs } = React.useContext(GridContext);
  const uIdLength: number = uId?.toString().length;
  const [isVisible, setIsVisible] = useState<boolean>(true);
  // the number the columns are divided by in order to find their width
  const [totalColumns, setTotalColumns] = useState<number>(
    uIDs
      ?.filter((UID) => {
        UID.uId?.toString().length === uIdLength + 1;
      })
      .filter((UID) => UID.uId?.toString().startsWith(uId?.toString()))
      .length || 1
  );
  // the number of columns under this row
  const [columns, setColumns] = useState(
    uIDs
      ?.filter((UID) => UID.uId?.toString().length === uIdLength + 1)
      .filter((UID) => UID.uId?.toString().startsWith(uId?.toString())) || []
  );
  const uIdIndex = uIDs?.findIndex((item) => item.uId === uId) || 0;
  const handleAddButtonClick = () => {
    setTotalRows && setTotalRows((prevNum) => prevNum + 1);
    if (uIdIndex !== -1) {
      setuIDs &&
        uIDs &&
        setuIDs([
          ...uIDs.slice(0, uIdIndex + 1),
          { uId: JSON.parse(`${Math.max(...rows) + 1}`) },
          ...uIDs.slice(uIdIndex + 1),
        ]);
    }
  };

  useEffect(() => {
    if (totalColumns === 0 && isVisible) {
      setIsVisible(false);
      setTotalRows && setTotalRows((prevNum) => prevNum - 1);
      setuIDs &&
        uIDs &&
        setuIDs(
          uIDs?.filter(
            (UID) => !UID.uId?.toString().startsWith(uId?.toString())
          )
        );
    }
    if (columns?.length === 0) {
      setColumns([{ uId: JSON.parse(`${uId}${totalColumns}`) }]);
    } else {
      setColumns(
        uIDs
          ?.filter((UID) => UID.uId?.toString().length === uIdLength + 1)
          .filter((UID) => UID.uId?.toString().startsWith(uId?.toString())) ||
          []
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uId, uIDs]);
  useEffect(() => {
    setTotalColumns(
      uIDs
        ?.filter((UID) => {
          return UID.uId?.toString().length === uIdLength + 1;
        })
        .filter((UID) => UID.uId?.toString().startsWith(uId?.toString()))
        .length || 1
    );
    setInitialHeight(
      `${uIDs?.filter((item) => item.uId === uId)[0]?.height}px`
    );
  }, [uIDs, setTotalColumns, uId, uIdLength]);
  useEffect(() => {
    if (uIDs && setuIDs && !uIDs.some((item) => item.uId === uId)) {
      setuIDs([...uIDs, { uId }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // resize
  const [initialHeight, setInitialHeight] = useState(
    uIDs?.filter((item) => item.uId === uId)[0]?.height
      ? `${uIDs?.filter((item) => item.uId === uId)[0]?.height}px`
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

        const upDatedArray = uIDs?.map((item, i) => {
          if (i === uIdIndex) return { ...item, height: rect.height };
          return item;
        });
        if (uIDs?.[uIdIndex] && setuIDs) setuIDs(upDatedArray || []);
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
          flexGrow: initialHeight !== null ? 0 : 1,
          flexShrink: initialHeight !== null ? 1 : 100,
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
              zIndex: 90,
            }}
            onClick={handleAddButtonClick}>
            <ControlPointOutlinedIcon fontSize="large" />
          </Button>
        )}
        {columns?.map((num) => {
          return (
            <Column
              widthDivider={totalColumns}
              setTotalColumns={setTotalColumns}
              columns={columns.map((item) => {
                return item.uId;
              })}
              key={num.uId}
              uId={num.uId}
            />
          );
        })}
      </Box>
    );
};
export default Row;

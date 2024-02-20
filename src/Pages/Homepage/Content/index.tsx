import Row from "./Row";
import { Box, CircularProgress } from "@mui/material";

import { GridContext } from "../Context/GridContext";
import React, { useEffect, useState } from "react";
import Menu from "../../../Components/Menu";
export default function BossPage() {
  const { uIDs, isLoading } = React.useContext(GridContext);
  const [uIdRows, setUIdRows] = useState(
    uIDs?.filter((item) => item.uId?.toString().length === 1)
  );
  useEffect(() => {
    setUIdRows &&
      setUIdRows(uIDs?.filter((item) => item.uId?.toString().length === 1));
  }, [uIDs, setUIdRows]);
  if (isLoading) {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          translate: "-50% -50%",
        }}
        size={100}
      />
    );
  }
  return (
    <Box sx={{ py: 8, overflow: "hidden" }}>
      <Menu />
      {uIdRows &&
        uIdRows.map((num) => (
          <Row
            rows={uIdRows.map((item) => {
              return item.uId;
            })}
            uId={num.uId}
            key={num.uId}
          />
        ))}
    </Box>
  );
}

import Row from "./Row";
import { Box } from "@mui/material";

import { GridContext } from "../Context/GridContext";
import React, { useEffect, useState } from "react";
import Menu from "../../../Components/Menu";
export default function BossPage() {
  const { uIDs } = React.useContext(GridContext);
  const [uIdRows, setUIdRows] = useState(
    uIDs?.filter((item) => item.uId?.toString().length === 1)
  );
  useEffect(() => {
    setUIdRows &&
      setUIdRows(uIDs?.filter((item) => item.uId?.toString().length === 1));
  }, [uIDs, setUIdRows]);
  return (
    <Box sx={{ pt: 8, overflow: "hidden" }}>
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

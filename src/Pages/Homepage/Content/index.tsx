import Row from "./Row";
import { Box, CircularProgress } from "@mui/material";
import { GridContext } from "../Context/GridContext";
import React, { useEffect, useState } from "react";
import Menu from "../../../Component/Menu";
import toast from "react-hot-toast";
import { CookiesTypes } from "../../../Types";
import Cookies from "js-cookie";
import { IsClientBoss } from "@/utils";

export default function BossPage() {
  const { uIDs, isFetching, isError } = React.useContext(GridContext);
  const [uIdRows, setUIdRows] = useState(
    uIDs?.filter((item) => item.uId?.toString().length === 1)
  );

  const isUserVerified = Cookies.get(CookiesTypes.USER_KEY);
  const isClientBoss = IsClientBoss();

  useEffect(() => {
    if (!isUserVerified) {
      toast.error("You need to be signed in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isClientBoss) {
        event.preventDefault();

        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isClientBoss]);
  useEffect(() => {
    setUIdRows &&
      setUIdRows(uIDs?.filter((item) => item.uId?.toString().length === 1));
  }, [uIDs, setUIdRows]);
  if (isFetching) {
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
  if (isError) {
    toast.error("could not find your account");
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

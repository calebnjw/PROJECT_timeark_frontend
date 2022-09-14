import React, { useState } from "react";
import { Button } from "@mui/material";

interface Props {
  setTimePeriod: React.Dispatch<React.SetStateAction<string>>;
}

export default function DashboardButtons({ setTimePeriod }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginLeft: "23%",
        marginTop: "30px",
        width: "800px",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        style={{
          marginLeft: "10px",
        }}
        onClick={() => {
          setTimePeriod("week");
        }}
      >
        Week View
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{
          marginLeft: "10px",
        }}
        onClick={() => {
          setTimePeriod("month");
        }}
      >
        Month View
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{
          marginLeft: "10px",
        }}
        onClick={() => {
          setTimePeriod("all");
        }}
      >
        All Time
      </Button>
    </div>
  );
}

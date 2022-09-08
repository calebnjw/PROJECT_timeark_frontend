import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Spinner } from "../../components/spinner/spinner";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Dates } from "../../types/tasks";
import Button from "@mui/material/Button";

interface Props {
  dates: Dates[];
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

const DatesButtons = ({ dates, selectedDate, setSelectedDate }: Props) => {
  console.log("dates: ", dates);
  return (
    <>
      <Box
        style={{ width: "80%", marginLeft: "15%", marginTop: "80px" }}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "grey",
        }}
      >
        {dates.map((date, idx) => (
          <Button
            key={date.formatted}
            style={{
              marginRight: "5px",
            }}
            variant="contained"
            color="info"
            onClick={() => {
              setSelectedDate(date.formatted);
            }}
          >
            <Typography>{date.display}</Typography>
          </Button>
        ))}
      </Box>
      <Box
        style={{ width: "80%", marginLeft: "15%", marginTop: "5px" }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "grey",
        }}
      >
        <Typography>Selected Date: {selectedDate}</Typography>
      </Box>
    </>
  );
};

export default DatesButtons;

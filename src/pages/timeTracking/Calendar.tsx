import { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface Props {
  HandleShowSelectedDateTimeEntrys: (params: any) => void;
}

const Calendar = ({ HandleShowSelectedDateTimeEntrys }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonthHandle = (btnType: any) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType: any) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day: Date, dayStr: string) => {
    setSelectedDate(day);
    HandleShowSelectedDateTimeEntrys(dayStr);
  };
  // Navigate Month
  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <Box className="header row flex-middle">
        <Box className="col col-start">
          <Box
            className="icon"
            onClick={() => changeMonthHandle("prev")}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
            }}
          >
            <KeyboardDoubleArrowLeftIcon />
            <Box>month</Box>
          </Box>
        </Box>
        <Box className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </Box>
        <Box className="col col-end">
          <Box
            className="icon"
            onClick={() => changeMonthHandle("next")}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "right",
            }}
          >
            <Box>Month</Box>
            <KeyboardDoubleArrowRightIcon />
          </Box>
        </Box>
      </Box>
    );
  };

  // Show weekdays
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <Box className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </Box>
      );
    }
    return <Box className="days row">{days}</Box>;
  };

  // Show days cubes
  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <Box
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={String(day)}
            onClick={() => {
              const dayStr: string = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </Box>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <Box className="row" key={String(day)} style={{}}>
          {days}
        </Box>
      );
      days = [];
    }
    return <Box className="body">{rows}</Box>;
  };

  const renderFooter = () => {
    return (
      <Box className="header row flex-middle">
        <Box className="col col-start">
          <Box
            className="icon"
            onClick={() => changeWeekHandle("prev")}
            style={{
              color: "black",
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
            }}
          >
            <NavigateBeforeIcon />
            <Box>week</Box>
          </Box>
        </Box>
        <Box>Current week: {currentWeek}</Box>
        <Box className="col col-end" onClick={() => changeWeekHandle("next")}>
          <Box
            className="icon"
            style={{
              color: "black",
              display: "flex",
              flexDirection: "row",
              justifyContent: "right",
            }}
          >
            <Box>week</Box>
            <NavigateNextIcon />
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderFooter()}
    </Box>
  );
};

export default Calendar;

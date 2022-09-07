import React from "react";
import { useCountUp } from "use-count-up";

const ShowTimer = () => {
  const { value } = useCountUp({
    isCounting: true,
    start: 0,
    duration: 5,
  });

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  const formatTime = (time: any) => {
    let seconds = time;
    let minutes = 0;
    let hours = 0;
    if (seconds > 60) {
      seconds = 0;
      minutes += 1;
    }
    if (minutes > 60) {
      minutes = 0;
      hours += 1;
    }
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds
    )}`;
  };

  return <>{formatTime(value)}</>;
};

export default ShowTimer;

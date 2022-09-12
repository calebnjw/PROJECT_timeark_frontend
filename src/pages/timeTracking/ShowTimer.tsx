import React from "react";
import { useCountUp } from "use-count-up";

interface Props {
  startDate: Date;
}

const ShowTimer = ({ startDate }: Props) => {
  const startTime = Math.floor(
    (new Date().getTime() - new Date(startDate).getTime()) / 1000
  );
  const { value } = useCountUp({
    isCounting: true,
    start: 0,
    duration: 3.5,
    easing: "linear",
  });

  const formatTime = (secs: any) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  return <>{formatTime(startTime)}</>;
};

export default ShowTimer;

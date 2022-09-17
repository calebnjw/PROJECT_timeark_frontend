import { useCountUp } from "use-count-up";
import Typography from "@mui/material/Typography";

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

  return (
    <Typography
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "5px",
        }}
      >
        <iframe
          src="https://giphy.com/embed/kaUIoIsHxbUAkiieAv"
          style={{
            position: "relative",
            width: "70px",
            height: "70px",
            zIndex: "1",
          }}
          frameBorder="0"
        ></iframe>
      </span>
      <span
        style={{
          border: "solid 1px gray",
          padding: "4px 10px",
          borderRadius: "4px",
          color: "white",
          backgroundColor: "black",
        }}
      >
        <b>{formatTime(startTime)}</b>
      </span>
    </Typography>
  );
};

export default ShowTimer;

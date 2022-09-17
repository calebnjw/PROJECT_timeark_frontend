import { useState } from "react";
import ReactEcharts from "echarts-for-react";
import { Typography, Box, Paper } from "@mui/material";
import { Spinner } from "../../components/spinner/spinner";

const TimeAndEarningsChart = () => {
  const [getData, setGetData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const option = {
    legend: {
      top: "bottom",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [25, 125],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 40, name: "rose 1" },
          { value: 38, name: "rose 2" },
          { value: 32, name: "rose 3" },
          { value: 30, name: "rose 4" },
          { value: 28, name: "rose 5" },
          { value: 26, name: "rose 6" },
          { value: 22, name: "rose 7" },
          { value: 18, name: "rose 8" },
        ],
      },
    ],
  };

  return (
    <>
      <ReactEcharts
        option={option}
        style={{ border: "solid 1px gray", width: "50%" }}
      />
    </>
  );
};

export default TimeAndEarningsChart;

import { useState } from "react";
import ReactEcharts from "echarts-for-react";
import { Typography, Box, Paper } from "@mui/material";
import { Spinner } from "../../components/spinner/spinner";

interface Props {
  chartData: {
    value: number;
    name: string;
  };
}

const TimeAndEarningsChart = ({ chartData }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const option = {
    legend: {
      top: "bottom",
    },
    tooltip: {
      trigger: "item",
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
        name: "Tasks and Earnings",
        type: "pie",
        radius: [20, 90],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: chartData,
      },
    ],
  };

  return <ReactEcharts option={option} style={{ width: "50%" }} />;
};

export default TimeAndEarningsChart;

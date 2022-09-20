import ReactEcharts from "echarts-for-react";

interface Props {
  chartData: {
    value: number;
    name: string;
  };
}

const TimeAndEarningsChart = ({ chartData }: Props) => {
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

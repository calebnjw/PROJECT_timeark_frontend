import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { useUserContext } from "../../context/userContext";
import { Typography, Box } from "@mui/material";
import { Spinner } from "../../components/spinner/spinner";

import axios from "axios";
axios.defaults.withCredentials = true;

function AmtEarnedChart() {
  const { userProfile } = useUserContext();
  const [getData, setGetData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const barChartData = async () => {
      if (userProfile) {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/invoices/barchart`,
          {
            params: {
              user_id: userProfile._id,
            },
          }
        );
        console.log("barchartdata", result.data);
        setGetData(result.data);
        setIsLoaded(true);
      }
    };
    barChartData();
  }, [userProfile]);

  const option = {
    legend: {},
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        var value = "<b>" + params.value[0] + " " + "</b>";
        var percentage = ((params.value[1] / params.value[2]) * 100).toFixed(2);
        return (
          value +
          "</b>" +
          "<br/>" +
          "$" +
          params.value[1] +
          " Earned" +
          "<br/>" +
          "$" +
          params.value[2] +
          " Total" +
          "<br/>" +
          percentage +
          "% Earned"
        );
      },
    },
    dataset: {
      source: getData,
      // [
      //   ["project name", "Amt Earned", "Total Budget"],
      //   ["Project 1", 43.3, 85.8],
      //   ["Project 2", 63.1, 83.4],
      //   ["Project 3", 26.4, 89.2],
      // ],
    },
    xAxis: { type: "category" },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: "bar" }, { type: "bar" }],
  };

  return (
    <div>
      {!isLoaded ? (
        <Box>
          <Typography>Loading the BarChart</Typography>
          <Spinner />
        </Box>
      ) : (
        <>
          <ReactEcharts option={option} />
        </>
      )}
    </div>
  );
}
export default AmtEarnedChart;
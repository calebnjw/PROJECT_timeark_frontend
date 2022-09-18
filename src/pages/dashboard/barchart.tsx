import { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { useUserContext } from "../../context/userContext";
import { Typography, Box, Paper } from "@mui/material";
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
        var value = "<b>" + params.value[0] + " </b>";
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
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: [
      {
        type: "bar",
        barGap: "20%",
        barCategoryGap: "40%",
      },
      { type: "bar", barGap: "20%", barCategoryGap: "20%" },
    ],
  };

  return (
    <div>
      {!isLoaded ? (
        <Box>
          <Typography>Loading the BarChart</Typography>
          <Spinner />
        </Box>
      ) : (
        <Paper
          elevation={7}
          style={{
            marginTop: "30px",
            paddingTop: "30px",
            backgroundColor: "#FFFFFF",
            flexGrow: "1",
            borderRadius: "20px",
          }}
        >
          <ReactEcharts option={option} />
        </Paper>
      )}
    </div>
  );
}
export default AmtEarnedChart;

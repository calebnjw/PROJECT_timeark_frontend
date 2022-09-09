import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { useUserContext } from "../../context/userContext";
import { Typography, Box } from "@mui/material";
import { Spinner } from "../../components/spinner/spinner";

import axios from "axios";
axios.defaults.withCredentials = true;

interface Props {
  timeperiod: string;
}

function TimeSpentChart({ timeperiod }: Props) {
  const { userProfile } = useUserContext();
  const [getData, setGetData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    console.log(userProfile);
    console.log(timeperiod);
    const pieChartData = async () => {
      if (userProfile) {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/tasks/time`,
          { params: { user_id: userProfile._id, time_period: { timeperiod } } }
        );
        console.log(result.data);
        setGetData(result.data);
        setIsLoaded(true);
      }
    };
    pieChartData();
  }, [userProfile, timeperiod]);

  const option = {
    title: {
      text: "Time Spent Per Project",
      subtext: "In Hours",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        var value = params.value + "";
        return params.seriesName + "<br/>" + value + " Hours";
      },
    },

    series: [
      {
        name: "Time Spent",
        type: "pie",
        radius: "50%",
        data: getData.nameTimeArray,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div>
      {!isLoaded ? (
        <Box>
          <Typography>Loading the piechart</Typography>
          <Spinner />
        </Box>
      ) : (
        <>
          {timeperiod} view
          <ReactEcharts option={option} />
        </>
      )}
    </div>
  );
}
export default TimeSpentChart;

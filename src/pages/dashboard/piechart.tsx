import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { Project } from "../../types/project";
import { useGlobalContext } from "../../context/clientContext";

import axios from "axios";
axios.defaults.withCredentials = true;

function TimeSpentChart() {
  // const [projectList, setProjectList] = useState<Project[]>([]);
  const { clientList, setClientList } = useGlobalContext();

  useEffect(() => {
    // 1. get user id
    // 2. get all the clients by the user -> client list done
    // 3. get all the projects from the client -> from client list

    const projectsArray: string[] = [];

    clientList.forEach((client, idx) => {
      projectsArray.push(...client.project_ids);
      return projectsArray;
    });
    console.log("projectsArray", projectsArray);
    // 4. get all the tasks from all the respective projects
    // 4. Get all the hours spent from all projects
  }, []);

  const option = {
    title: {
      text: "Time Spent Per Project",
      subtext: "In Hours",
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
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 700.5, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
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
  return <ReactEcharts option={option} />;
}

export default TimeSpentChart;

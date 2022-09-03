import { createContext, useContext } from "react";
import { Client } from "../types/client";
import { Project } from "../types/project";
import { Dates } from "../types/tasks";
export interface GlobalContent {
  clientList: Client[];
  setClientList: (c: []) => void;
  dates: Dates[];
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  // projectList: Client[];
  // setProjectList: (p: []) => void;
}
export const ClientGlobalContext = createContext<GlobalContent>({
  clientList: [], // set a default value
  setClientList: () => {},
  dates: [],
  selectedDate: "",
  setSelectedDate: () => {},
  // projectList: [],
  // setProjectList: () => {},
});

export const useGlobalContext = () => useContext(ClientGlobalContext);

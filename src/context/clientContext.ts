import { createContext, useContext } from "react";
import { Client } from "../types/client";
import { Dates } from "../types/tasks";
export interface GlobalContent {
  clientList: Client[];
  setClientList: (c: []) => void;
  dates: Dates[];
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}
export const ClientGlobalContext = createContext<GlobalContent>({
  clientList: [], // set a default value
  setClientList: () => {},
  dates: [],
  selectedDate: "",
  setSelectedDate: () => {},
});

export const useGlobalContext = () => useContext(ClientGlobalContext);

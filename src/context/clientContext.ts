import { createContext, useContext } from "react";
import { Client } from "../types/client";
export interface GlobalContent {
  clientList: Client[];
  setClientList: (c: []) => void;
}
export const ClientGlobalContext = createContext<GlobalContent>({
  clientList: [], // set a default value
  setClientList: () => {},
});

export const useGlobalContext = () => useContext(ClientGlobalContext);

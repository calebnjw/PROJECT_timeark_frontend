import React, { createContext, useContext } from "react";
import { User } from "../types/user";

export interface UserContextInterface {
  userProfile: User | undefined;
  setUserProfile: (value: User) => void;
  newUser: boolean;
  userId: string;
}

// create context that stores userState.
export const UserContext = createContext<UserContextInterface>({
  userProfile: undefined,
  setUserProfile: () => {},
  newUser: true,
  userId: "",
});

export const useUserContext = () => useContext(UserContext);

import React, { createContext, useContext } from "react";
import { User } from "../types/user";

export interface UserContextInterface {
  userProfile: User | undefined;
  setUserProfile: (value: User) => void;
  newUser: boolean;
}

// create context that stores userState.
export const UserContext = createContext<UserContextInterface>({
  userProfile: undefined,
  setUserProfile: () => {},
  newUser: true,
});

export const useUserContext = () => useContext(UserContext);

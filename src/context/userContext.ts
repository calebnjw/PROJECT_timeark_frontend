import React from "react";
import { User } from "../types/user";

export interface UserContextInterface {
  user: User;
  setUser: (user: {}) => void;
}

// create context that stores userState.
export const UserContext = React.createContext<UserContextInterface | null>({
  user: {
    _id: "",
    provider: "",
    externalId: "",
    displayName: "",
    name: {
      familyName: "",
      givenName: "",
    },
    emails: [],
  },
  setUser: () => {},
});

export function useUserContext() {
  React.useContext(UserContext);
}

import React, { createContext, useContext } from "react";
import { User } from "../types/user";

export interface UserContextInterface {
  userProfile?: User;
  setUserProfile: (value: User) => void;
  newUser: boolean;
  setNewUser: (value: boolean) => void;
  userId: string;
}

// create context that stores userState.
export const UserContext = createContext<UserContextInterface>({
  userProfile: {
    _id: "",
    provider: "",
    externalId: "",
    displayName: "",
    name: {
      familyName: "",
      givenName: "",
    },
    emails: [
      {
        value: "",
      },
    ],
    photos: [
      {
        value: "",
      },
    ],
    billingDetails: {
      companyName: "",
      buildingName: "",
      unitNumber: "",
      streetName: "",
      city: "",
      country: "",
      postalCode: "",
      contactNumber: "",
      companyRegistration: "",
    },
    clientIds: [],
  },
  setUserProfile: () => {},
  newUser: true,
  setNewUser: () => {},
  userId: "",
});

export const useUserContext = () => useContext(UserContext);

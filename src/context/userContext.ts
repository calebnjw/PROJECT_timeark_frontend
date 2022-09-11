import React, { createContext, useContext } from "react";
import { User } from "../types/user";

export interface UserContextInterface {
  userProfile?: User;
  setUserProfile: (value: User) => void;
  newUser: boolean;
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
});

export const useUserContext = () => useContext(UserContext);

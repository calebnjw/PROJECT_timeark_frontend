import axios from "axios";
import { User } from "../../types/user";

// TODO: CAN'T IMPORT FROM USERACTIONS.TS BECAUSE IT NEEDS SEPARATE TYPE DECLARATIONS.
const SETFIRSTNAME: string = "SETFIRSTNAME";
const SETMIDDLENAME: string = "SETMIDDLENAME";
const SETLASTNAME: string = "SETLASTNAME";

const SETCOMPANY: string = "SETCOMPANY";
const SETREGISNUM: string = "SETREGNUM";
const SETBUILDNAME: string = "SETBUILDNAME";
const SETSTREETNAME: string = "SETSTREETNAME";
const SETUNITNUM: string = "SETUNITNUM";
const SETPOSTALCODE: string = "SETPOSTALCODE";
const SETCITY: string = "SETCITY";
const SETCOUNTRY: string = "SETCOUNTRY";
const SETPHONENUM: string = "SETPHONENUM";

const GET: string = "GET";
const NEW: string = "NEW";
const SET: string = "SET";
const DEL: string = "DEL";

// import {
//   SETFIRSTNAME,
//   SETMIDDLENAME,
//   SETLASTNAME,
//   SETCOMPANY,
//   SETREGISNUM,
//   SETBUILDNAME,
//   SETSTREETNAME,
//   SETUNITNUM,
//   SETPOSTALCODE,
//   SETCITY,
//   SETCOUNTRY,
//   SETPHONENUM,
//   GET,
//   NEW,
//   SET,
//   DEL,
// } from "../../assets/userActions";

type Action = {
  type: string;
  payload: {
    firstName?: string;
    middleName?: string;
    familyName?: string;
    companyName?: string;
    buildingName?: string;
    unitNumber?: string;
    streetName?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    contactNumber?: string;
    companyRegistration?: string;
  };
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function userReducer(state: User, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case GET:
      return {
        ...state,
      };
    // case SETSTARTDATE:
    //   return {
    //     ...state,
    //     startDate: payload.startDate,
    //   };
    // case SETENDDATE:
    //   return {
    //     ...state,
    //     endDate: payload.endDate,
    //   };
    // case SETFIRSTNAME:
    //   return {
    //     ...state,
    //     firstName: payload.firstName,
    //   };
    // case SETLASTNAME:
    //   return {
    //     ...state,
    //     lastName: payload.lastName,
    //   };
    // case SETEMAIL:
    //   return {
    //     ...state,
    //     email: payload.email,
    //   };
    // case SET:
    //   return {
    //     ...state,
    //     bookingId: payload.bookingId,
    //   };
    // case NEW:
    //   return {
    //     ...state,
    //     startDate: state.startDate,
    //     endDate: state.endDate,
    //     firstName: state.firstName,
    //     lastName: state.lastName,
    //     email: state.email,
    //   };
    // case DEL:
    //   return {
    //     ...state,
    //     bookingId: 0,
    //   };
    default:
      return state;
  }
}

// export const getBookings = async (email) => {
//   const { data } = await axios.post(`${BACKEND_URL}/bookings/get`, { email });
//   return { type: GET, payload: { bookings: data.bookings } };
// };

// export const setBookingId = (id) => ({ type: SET, id });

// export const setStartDate = (startDate) => ({ type: SETSTARTDATE, payload: { startDate } });

// export const setEndDate = (endDate) => ({ type: SETENDDATE, payload: { endDate } });

// export const setFirstName = (firstName) => ({ type: SETFIRSTNAME, payload: { firstName } });

// export const setLastName = (lastName) => ({ type: SETLASTNAME, payload: { lastName } });

// export const setEmail = (email) => ({ type: SETEMAIL, payload: { email } });

// export const newBooking = async (input) => {
//   const { carId, startDate, endDate, email, firstName, lastName } = input;
//   const { data } = await axios.post(`${BACKEND_URL}/bookings/new`, {
//     carId,
//     startDate,
//     endDate,
//     email,
//     firstName,
//     lastName,
//   });
//   return { type: SET, payload: { bookingId: data.id } };
// };

export const deleteAccount = async () => {
  await axios.delete(`${BACKEND_URL}/users/delete`);
  return { type: DEL };
};

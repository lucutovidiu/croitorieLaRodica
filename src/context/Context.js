import { createContext } from "react";
const initState = window.sessionStorage.getItem("state")
  ? JSON.parse(window.sessionStorage.getItem("state"))
  : {
      loggedInUser: "",
      user_password: "",
      HomeCarosel: { loading: true, requestedData: false },
      Posts: {
        loading: true,
        requestedData: false,
        postsRequestedCount: -1
      },
      selectedActiveModalPost: { _id: null }
    };
export const Context = createContext(initState);
export const DispatchContext = createContext();

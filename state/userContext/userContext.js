import { createContext, useContext } from "react";

const UserContext = createContext();

export const useGlobalUserContext = () => {
  return useContext(UserContext);
};

export default UserContext;

import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

import UserContext from "./userContext";

const ChatProvider = ({ children }) => {
  const [session] = useSession();

  const [sessionUser, setSessionUser] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : {}
      : {}
  );

  useEffect(() => {
    setSessionUser(localStorage.setItem("user", JSON.stringify(sessionUser)));
  }, [sessionUser]);

  console.log("user", sessionUser);

  return (
    <UserContext.Provider value={{ sessionUser, setSessionUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default ChatProvider;

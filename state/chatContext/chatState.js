import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { useCollection } from "react-firebase-hooks/firestore";

import ChatContext from "./chatContext";
import { db } from "../../firebase";

const ChatProvider = ({ children }) => {
  const [session] = useSession();
  const user = session ? session.user.name : "";

  //To help the messages scroll back down
  const [scrollDown, setScrollDown] = useState(true);

  //To bring up the messages components
  const [loadMessages, setLoadMessages] = useState(false);

  //To store all chats
  const [chats, setChats] = useState();

  const [snapshot, error] = useCollection(
    db.collection("chats").where("user", "array-contains", user)
  );

  useEffect(() => {
    if (snapshot) {
      setChats(snapshot);
    }
  }, [snapshot]);

  return (
    <ChatContext.Provider
      value={{
        loadMessages,
        setLoadMessages,
        chats,
        error,
        scrollDown,
        setScrollDown,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

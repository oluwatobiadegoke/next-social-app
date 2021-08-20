import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { useCollection } from "react-firebase-hooks/firestore";

import ChatContext from "./chatContext";
import { db } from "../../firebase";

const ChatProvider = ({ children }) => {
  const [session] = useSession();

  //To bring up the messages components
  const [loadMessages, setLoadMessages] = useState(false);

  //To store all chats
  const [chats, setChats] = useState();

  const [snapshot, error] = useCollection(
    db.collection("chats").where("user", "array-contains", session.user.name)
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

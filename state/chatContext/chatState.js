import { useState } from "react";
import ChatContext from "./chatContext";

const ChatProvider = ({ children }) => {
  //To bring up the messages components
  const [loadMessages, setLoadMessages] = useState(false);
  const [isChatting, setIsChatting] = useState(false);

  return (
    <ChatContext.Provider
      value={(isChatting, setIsChatting, loadMessages, setLoadMessages)}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

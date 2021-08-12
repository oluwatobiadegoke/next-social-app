import { createContext, useContext } from "react";

const ChatContext = createContext();

export const useGlobalChatContext = () => {
  return useContext(ChatContext);
};

export default ChatContext;

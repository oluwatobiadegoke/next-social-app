import ChatContext from "./chatContext";

const ChatProvider = ({ children }) => {
  return <ChatContext.Provider>{children}</ChatContext.Provider>;
};

export default ChatProvider;

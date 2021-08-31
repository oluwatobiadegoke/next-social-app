import { useRef, useEffect } from "react";

import MessageInfo from "./MessageInfo";
import TheMessages from "./TheMessages";
import MessageInput from "./MessageInput";

const Messages = ({ chatWith, messages }) => {
  return (
    <div
      className="flex flex-col bg-indigo-900 rounded-lg mx-4 mt-5"
      style={{ height: "calc(100vh - 110px)" }}
    >
      <MessageInfo chatWith={chatWith} />
      <TheMessages messages={messages} />
      <MessageInput />
    </div>
  );
};

export default Messages;

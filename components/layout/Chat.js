import { MdMessage } from "react-icons/md";

import { useGlobalChatContext } from "../../state/chatContext/chatContext";
import Messages from "../chat/indMessages/Messages";
import Chats from "../chat/indMessages/Chats";

const Chat = () => {
  const { isChatting, loadMessages, setLoadMessages } = useGlobalChatContext();
  return (
    <div
      className={`absolute top-10 bottom-0 right-6 z-50 bg-indigo-900 w-1/4 text-black-100 py-2 px-3 rounded-t-lg transition-all ${
        !loadMessages ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className="absolute -top-10 h-10 w-12 bg-indigo-900 flex items-center justify-center rounded-t-lg cursor-pointer"
        style={{ left: "calc(50% - 24px)" }}
        onClick={() => setLoadMessages(!loadMessages)}
      >
        <MdMessage className="text-2xl" />
      </div>
      {isChatting ? <Messages /> : <Chats />}
    </div>
  );
};

export default Chat;
